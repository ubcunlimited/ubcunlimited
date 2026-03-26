import FirearmIcon from "./FirearmIcon";

/**
 * Renders an industry icon.
 * - If icon === "__firearm__", renders the SVG FirearmIcon component.
 * - Otherwise renders the emoji/string directly.
 */
export default function IndustryIcon({
  icon,
  className,
  size = 32,
}: {
  icon: string;
  className?: string;
  size?: number;
}) {
  if (icon === "__firearm__") {
    return (
      <FirearmIcon
        width={size}
        height={size}
        className={className ?? "text-current"}
        aria-label="Firearms & Shooting Sports"
      />
    );
  }
  return <span className={className}>{icon}</span>;
}
