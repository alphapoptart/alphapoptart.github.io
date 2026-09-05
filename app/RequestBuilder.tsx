'use client';

import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { businessProfile } from './siteContent';

export type ProblemKind = 'wifi' | 'new-device' | 'learning' | 'business' | 'unsure';
type ContactPreference = 'text' | 'call';
type SessionPreference = 'remote' | 'in-person' | 'unsure';
type RequestDraft = {
  problem: ProblemKind | '';
  device: string;
  details: string;
  contactPreference: ContactPreference | '';
  sessionPreference: SessionPreference | '';
};

const problems: { value: ProblemKind; label: string }[] = [
  { value: 'wifi', label: 'Wi-Fi or connections' },
  { value: 'new-device', label: 'A new device' },
  { value: 'learning', label: 'Learn how to do something' },
  { value: 'business', label: 'A business workflow' },
  { value: 'unsure', label: 'I’m not sure yet' },
];
const initial: RequestDraft = { problem: '', device: '', details: '', contactPreference: '', sessionPreference: '' };
const clean = (value: string) => value.trim().replace(/\s+/g, ' ');
const cleanDetails = (value: string) => value.trim().replace(/\r\n?/g, '\n').split('\n').map((line) => clean(line)).join('\n');
const subscribeHydration = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;
const copyFallback = 'Copy was unavailable. Select the request text and copy it manually.';

export default function RequestBuilder(): React.ReactNode {
  const hydrated = useSyncExternalStore(subscribeHydration, getHydrated, getServerHydrated);
  const [draft, setDraft] = useState<RequestDraft>(initial);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');
  const generation = useRef(0);
  const previewRef = useRef<HTMLTextAreaElement>(null);

  // Query parsing is client-only; static HTML stays independent of URL parameters.
  useEffect(() => {
    const values = new URLSearchParams(window.location.search).getAll('help');
    const value = values.length === 1 ? values[0] : '';
    if (problems.some((problem) => problem.value === value)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraft((current) => ({ ...current, problem: value as ProblemKind }));
    }
    return () => { generation.current += 1; };
  }, []);

  useEffect(() => {
    if (result) previewRef.current?.focus();
  }, [result]);

  function update(field: keyof RequestDraft, value: string) {
    generation.current += 1;
    setDraft((current) => ({ ...current, [field]: value }));
    setResult('');
    setCopied('');
    setError('');
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    generation.current += 1;
    const device = clean(draft.device);
    const details = cleanDetails(draft.details);
    setCopied('');
    if (!hydrated || !draft.problem || !device || !details || !draft.contactPreference || !draft.sessionPreference) {
      setError('Choose each option and add a device or setup plus what is happening.');
      setResult('');
      return;
    }
    const problem = problems.find((item) => item.value === draft.problem)?.label ?? '';
    const contact = draft.contactPreference === 'text' ? 'Text' : 'Phone call';
    const session = draft.sessionPreference === 'remote' ? 'Remote'
      : draft.sessionPreference === 'in-person' ? 'In person (location and availability to be confirmed)' : 'Not sure';
    setResult(`Hi Sean — I'd like help with ${businessProfile.businessName}.\n\nHelp with: ${problem}\nDevice or setup: ${device}\nWhat is happening: ${details}\nPreferred contact: ${contact}\nSession preference: ${session}`);
    setError('');
  }

  async function copyRequest() {
    const currentGeneration = generation.current;
    if (!result) return;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(result);
      if (generation.current === currentGeneration) setCopied('Request copied.');
    } catch {
      if (generation.current === currentGeneration) setCopied(copyFallback);
    }
  }

  return (
    <>
      <noscript><p>You can <a href="sms:+13528750467">text Sean</a> or <a href="tel:+13528750467">call (352) 875-0467</a> directly. The request builder needs JavaScript.</p></noscript>
      <form className="request-builder" onSubmit={submit} noValidate>
        <fieldset disabled={!hydrated}>
          <legend><span>01</span> Choose the need</legend>
          <div className="radio-cards">
            {problems.map((problem) => (
              <label key={problem.value}>
                <input type="radio" name="problem" value={problem.value} checked={draft.problem === problem.value} onChange={(event) => update('problem', event.target.value)} required />
                <span>{problem.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset disabled={!hydrated}>
          <legend><span>02</span> Describe the device or setup</legend>
          <label htmlFor="device">Device or setup</label>
          <input type="text" id="device" maxLength={80} value={draft.device} onChange={(event) => update('device', event.target.value)} aria-invalid={!!error && !clean(draft.device)} required />
          <label htmlFor="details">What is happening?</label>
          <small className="safety-hint" id="details-safety">Please leave out passwords, one-time codes, full financial numbers, medical records, and identity or legal documents.</small>
          <textarea id="details" maxLength={500} rows={6} value={draft.details} onChange={(event) => update('details', event.target.value)} aria-describedby="details-safety" aria-invalid={!!error && !clean(draft.details)} required />
        </fieldset>
        <fieldset disabled={!hydrated}>
          <legend><span>03</span> Choose contact and session preferences</legend>
          <p className="field-label" id="contact-label">Preferred contact</p>
          <div className="radio-cards compact" role="radiogroup" aria-labelledby="contact-label">
            <label><input type="radio" name="contact" value="text" checked={draft.contactPreference === 'text'} onChange={(event) => update('contactPreference', event.target.value)} required /><span>Text</span></label>
            <label><input type="radio" name="contact" value="call" checked={draft.contactPreference === 'call'} onChange={(event) => update('contactPreference', event.target.value)} required /><span>Phone call</span></label>
          </div>
          <p className="field-label" id="session-label">Session preference</p>
          <div className="radio-cards compact" role="radiogroup" aria-labelledby="session-label">
            <label><input type="radio" name="session" value="remote" checked={draft.sessionPreference === 'remote'} onChange={(event) => update('sessionPreference', event.target.value)} required /><span>Remote</span></label>
            <label><input type="radio" name="session" value="in-person" checked={draft.sessionPreference === 'in-person'} onChange={(event) => update('sessionPreference', event.target.value)} required /><span>In person <small>Location and availability are confirmed before booking.</small></span></label>
            <label><input type="radio" name="session" value="unsure" checked={draft.sessionPreference === 'unsure'} onChange={(event) => update('sessionPreference', event.target.value)} required /><span>Not sure</span></label>
          </div>
        </fieldset>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-dark request-submit" type="submit" disabled={!hydrated}>Prepare my request</button>
        {result && (
          <section className="request-result" aria-labelledby="request-preview">
            <h2 id="request-preview">Your request is ready. Nothing has been sent yet.</h2>
            <textarea ref={previewRef} aria-label="Prepared request" aria-describedby="request-preview" readOnly value={result} />
            <div className="request-actions">
              <a className="button button-dark" href={`sms:${businessProfile.phoneE164}?body=${encodeURIComponent(result).replace(/'/g, '%27')}`}>Open in Messages</a>
              <button className="button button-light" type="button" onClick={copyRequest}>Copy request</button>
            </div>
            <p className="copy-status" role="status">{copied}</p>
          </section>
        )}
      </form>
    </>
  );
}
