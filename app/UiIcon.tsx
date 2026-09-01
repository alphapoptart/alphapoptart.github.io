type UiIconProps = {
  name: 'up-right' | 'down' | 'left' | 'north' | 'plus';
};

export default function UiIcon({ name }: UiIconProps) {
  return <span className={`ui-icon ui-icon-${name}`} aria-hidden="true" />;
}
