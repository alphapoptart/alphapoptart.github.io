export type UiIconName = 'up-right' | 'down' | 'left' | 'north' | 'plus' | 'menu' | 'close';

type UiIconProps = { name: UiIconName };

export default function UiIcon({ name }: UiIconProps) {
  return <span className={`ui-icon ui-icon-${name}`} aria-hidden="true" />;
}
