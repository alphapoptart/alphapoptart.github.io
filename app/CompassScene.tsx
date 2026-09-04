'use client';

import { useEffect, useRef, useState } from 'react';
import UiIcon from './UiIcon';

const bearings = [
  { id: 'home', heading: 300, label: '300° HOME', caption: 'Devices, Wi-Fi, backups, and home technology.', action: 'Explore home support', href: '#service-home' },
  { id: 'confidence', heading: 60, label: '060° CONFIDENCE', caption: 'Patient guidance that builds digital confidence.', action: 'Explore guided help', href: '#service-confidence' },
  { id: 'business', heading: 140, label: '140° BUSINESS', caption: 'Clearer systems for independent work and small teams.', action: 'Explore business support', href: '#service-business' },
] as const;

type Selection = 'north' | 'free' | (typeof bearings)[number]['id'];
type Bearing = (typeof bearings)[number];

const selectionCopy: Record<Selection, { label: string; caption: string; action?: string; href?: string }> = {
  north: { label: 'FIND YOUR ROUTE', caption: 'Spin the needle and release it to match your need.' },
  free: { label: 'CHOOSING A ROUTE', caption: 'Release the needle to lock onto the nearest service.' },
  home: { label: 'HOME TECHNOLOGY', caption: bearings[0].caption, action: bearings[0].action, href: bearings[0].href },
  confidence: { label: 'DIGITAL CONFIDENCE', caption: bearings[1].caption, action: bearings[1].action, href: bearings[1].href },
  business: { label: 'SMALL BUSINESS', caption: bearings[2].caption, action: bearings[2].action, href: bearings[2].href },
};

function normalizeHeading(value: number) {
  return ((value % 360) + 360) % 360;
}

function formatHeading(value: number) {
  return `${Math.round(normalizeHeading(value)).toString().padStart(3, '0')}°`;
}

function resetCompassParallax(stage: HTMLDivElement | null, stageRectRef: React.RefObject<DOMRect | null>, frameRef?: React.MutableRefObject<number | null>) {
  if (frameRef?.current !== null && frameRef?.current !== undefined) cancelAnimationFrame(frameRef.current);
  if (frameRef) frameRef.current = null;
  if (!stage) return;
  stage.style.setProperty('--rx', '-2deg');
  stage.style.setProperty('--ry', '4deg');
  stage.style.setProperty('--px', '0px');
  stage.style.setProperty('--py', '0px');
  stage.style.setProperty('--light-x', '50%');
  stage.style.setProperty('--light-y', '35%');
  stageRectRef.current = null;
}

export default function CompassScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLOutputElement>(null);
  const stageRectRef = useRef<DOMRect | null>(null);
  const controlRectRef = useRef<DOMRect | null>(null);
  const headingRef = useRef(0);
  const dragStartHeadingRef = useRef(0);
  const draggingRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const transformFrameRef = useRef<number | null>(null);
  const headingFrameRef = useRef<number | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingTiltRef = useRef({ x: 0, y: 0 });
  const pendingHeadingRef = useRef(0);
  const [heading, setHeading] = useState(0);
  const [selection, setSelection] = useState<Selection>('north');

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => {
      reducedMotionRef.current = media.matches;
      if (media.matches) resetCompassParallax(stageRef.current, stageRectRef, transformFrameRef);
    };

    updateMotionPreference();
    media.addEventListener('change', updateMotionPreference);

    return () => {
      media.removeEventListener('change', updateMotionPreference);
      if (transformFrameRef.current !== null) cancelAnimationFrame(transformFrameRef.current);
      transformFrameRef.current = null;
      if (headingFrameRef.current !== null) cancelAnimationFrame(headingFrameRef.current);
      if (snapTimerRef.current !== null) clearTimeout(snapTimerRef.current);
    };
  }, []);

  function scheduleHeading(rawHeading: number) {
    pendingHeadingRef.current = rawHeading;
    if (headingFrameRef.current !== null) return;

    headingFrameRef.current = requestAnimationFrame(() => {
      const stage = stageRef.current;
      const nextHeading = pendingHeadingRef.current;
      if (stage) {
        stage.style.setProperty('--needle-angle', `${nextHeading}deg`);
        stage.style.setProperty('--dial-angle', `${nextHeading * -0.12}deg`);
      }
      if (outputRef.current) outputRef.current.textContent = formatHeading(nextHeading);
      if (controlRef.current && draggingRef.current) {
        controlRef.current.setAttribute('aria-valuenow', String(Math.round(normalizeHeading(nextHeading))));
        controlRef.current.setAttribute('aria-valuetext', `${formatHeading(nextHeading)}. YOUR HEADING`);
      }
      headingFrameRef.current = null;
    });
  }

  function moveToHeading(targetHeading: number, nextSelection: Selection) {
    const current = headingRef.current;
    const currentNormalized = normalizeHeading(current);
    let delta = normalizeHeading(targetHeading) - currentNormalized;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const nextRawHeading = current + delta;

    headingRef.current = nextRawHeading;
    scheduleHeading(nextRawHeading);
    setHeading(normalizeHeading(nextRawHeading));
    setSelection(nextSelection);
  }

  function circularDistance(first: number, second: number) {
    const difference = Math.abs(normalizeHeading(first) - normalizeHeading(second));
    return Math.min(difference, 360 - difference);
  }

  function findNearestBearing(value: number) {
    return bearings.reduce((nearest, candidate) => (
      circularDistance(value, candidate.heading) < circularDistance(value, nearest.heading)
        ? candidate
        : nearest
    ));
  }

  function markRouteLock(bearing: Bearing) {
    const stage = stageRef.current;
    if (!stage) return;
    if (snapTimerRef.current !== null) clearTimeout(snapTimerRef.current);
    stage.setAttribute('data-snapping', bearing.id);
    snapTimerRef.current = setTimeout(() => {
      stage.removeAttribute('data-snapping');
      snapTimerRef.current = null;
    }, 950);
  }

  function moveToBearing(bearing: Bearing, extraTurns = 0) {
    const current = headingRef.current;
    const currentNormalized = normalizeHeading(current);
    let delta = bearing.heading - currentNormalized;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const nextRawHeading = current + delta + extraTurns * 360;

    headingRef.current = nextRawHeading;
    scheduleHeading(nextRawHeading);
    setHeading(bearing.heading);
    setSelection(bearing.id);
    markRouteLock(bearing);
  }

  function snapToNearest(playful = false) {
    const nearest = findNearestBearing(headingRef.current);
    const travel = headingRef.current - dragStartHeadingRef.current;
    const extraTurns = playful && !reducedMotionRef.current && Math.abs(travel) >= 25
      ? Math.sign(travel) || 1
      : 0;
    moveToBearing(nearest, extraTurns);
  }

  function handleStagePointerEnter() {
    if (stageRef.current) stageRectRef.current = stageRef.current.getBoundingClientRect();
  }

  function handleStagePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || reducedMotionRef.current || draggingRef.current) return;
    const stage = stageRef.current;
    const rect = stageRectRef.current;
    if (!stage || !rect) return;

    pendingTiltRef.current = {
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    };

    if (transformFrameRef.current !== null) return;
    transformFrameRef.current = requestAnimationFrame(() => {
      const { x, y } = pendingTiltRef.current;
      stage.style.setProperty('--rx', `${-y * 10}deg`);
      stage.style.setProperty('--ry', `${x * 13}deg`);
      stage.style.setProperty('--px', `${x * 14}px`);
      stage.style.setProperty('--py', `${y * 14}px`);
      stage.style.setProperty('--light-x', `${(x + 0.5) * 100}%`);
      stage.style.setProperty('--light-y', `${(y + 0.5) * 100}%`);
      transformFrameRef.current = null;
    });
  }

  function resetParallax() {
    resetCompassParallax(stageRef.current, stageRectRef, transformFrameRef);
  }

  function steerFromPointer(event: React.PointerEvent<HTMLDivElement>) {
    const rect = controlRectRef.current;
    if (!rect) return;

    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    const target = normalizeHeading((Math.atan2(y, x) * 180) / Math.PI + 90);
    const current = headingRef.current;
    const currentNormalized = normalizeHeading(current);
    let delta = target - currentNormalized;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    headingRef.current = current + delta;
    scheduleHeading(headingRef.current);
  }

  function handleCompassPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    dragStartHeadingRef.current = headingRef.current;
    draggingRef.current = true;
    controlRectRef.current = event.currentTarget.getBoundingClientRect();
    event.currentTarget.setPointerCapture(event.pointerId);
    stageRef.current?.setAttribute('data-dragging', 'true');
    setSelection('free');
    steerFromPointer(event);
  }

  function handleCompassPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    steerFromPointer(event);
  }

  function finishCompassDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    steerFromPointer(event);
    draggingRef.current = false;
    controlRectRef.current = null;
    stageRef.current?.removeAttribute('data-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    snapToNearest(true);
  }

  function handleLostPointerCapture() {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    controlRectRef.current = null;
    stageRef.current?.removeAttribute('data-dragging');
    snapToNearest(true);
  }

  function handleCompassKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const key = event.key.toLowerCase();
    if (key === 'home' || key === 'n') {
      event.preventDefault();
      moveToHeading(0, 'north');
      return;
    }

    if (key === 'enter' || key === ' ') {
      event.preventDefault();
      snapToNearest(false);
      return;
    }

    const step = event.shiftKey ? 15 : 5;
    if (key === 'arrowleft' || key === 'arrowdown') {
      event.preventDefault();
      moveToHeading(headingRef.current - step, 'free');
    }
    if (key === 'arrowright' || key === 'arrowup') {
      event.preventDefault();
      moveToHeading(headingRef.current + step, 'free');
    }
  }

  const activeCopy = selectionCopy[selection];

  return (
    <div
      className="compass-stage"
      ref={stageRef}
      onPointerEnter={handleStagePointerEnter}
      onPointerMove={handleStagePointerMove}
      onPointerLeave={resetParallax}
    >
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="scene-floor" aria-hidden="true" />
      <div className="scene-ring scene-ring-back" aria-hidden="true" />
      <div className="scene-ring scene-ring-front" aria-hidden="true" />
      <i className="orbit-node orbit-node-a" aria-hidden="true" />
      <i className="orbit-node orbit-node-b" aria-hidden="true" />
      <i className="orbit-node orbit-node-c" aria-hidden="true" />
      <span className="scene-star star-one" aria-hidden="true">✦</span>
      <span className="scene-star star-two" aria-hidden="true">✦</span>

      {bearings.map((bearing) => (
        <button
          className={`coordinate coordinate-${bearing.id}`}
          data-active={selection === bearing.id}
          key={bearing.id}
          type="button"
          onClick={() => moveToBearing(bearing)}
          aria-pressed={selection === bearing.id}
        >
          <span aria-hidden="true" /> {bearing.label}
        </button>
      ))}

      <button className="recenter-control" type="button" onClick={() => moveToHeading(0, 'north')}>
        <UiIcon name="north" /> Reset route
      </button>

      <div className="bearing-output" aria-hidden="true">
        <span>Route bearing</span>
        <output ref={outputRef}>000°</output>
      </div>

      <div className="compass-object" aria-hidden="true">
        <div className="compass-shadow" />
        <div className="compass-case">
          <div className="crown"><span /><span /><span /></div>
          <div className="compass-face">
            <div className="dial-marks" />
            <span className="direction north">N</span>
            <span className="direction east">E</span>
            <span className="direction south">S</span>
            <span className="direction west">W</span>
            <div className="needle"><span className="needle-north" /><span className="needle-south" /><i /></div>
            <div className="glass-glint" />
          </div>
        </div>
      </div>

      <div
        className="compass-control"
        ref={controlRef}
        role="slider"
        tabIndex={0}
        aria-label="Service route compass"
        aria-describedby="compass-help"
        aria-controls={activeCopy.href ? activeCopy.href.slice(1) : undefined}
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={Math.round(heading)}
        aria-valuetext={`${formatHeading(heading)}. ${activeCopy.label}`}
        onPointerDown={handleCompassPointerDown}
        onPointerMove={handleCompassPointerMove}
        onPointerUp={finishCompassDrag}
        onPointerCancel={finishCompassDrag}
        onLostPointerCapture={handleLostPointerCapture}
        onKeyDown={handleCompassKeyDown}
      />

      <p className="drag-hint" id="compass-help"><span aria-hidden="true" /> Drag + release to find your route · Enter locks</p>

      <div className="scene-caption" aria-live="polite">
        <span>01 / {activeCopy.label}</span>
        <div className="scene-route">
          <strong>{activeCopy.caption}</strong>
          {activeCopy.href && activeCopy.action ? (
            <a href={activeCopy.href}>{activeCopy.action} <UiIcon name="up-right" /></a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
