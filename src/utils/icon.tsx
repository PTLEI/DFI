const Icon = ({
  icon,
  onClick,
  className,
  style,
}: {
  icon?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <span
      className={`inline-flex items-center justify-center ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={style}
      aria-hidden="true"
      onClick={onClick}
    >
      <svg
        aria-hidden="true"
        style={{ width: "1em", height: "1em", fill: "currentcolor", verticalAlign: "-0.15em", overflow: "hidden" }}
      >
        <use xlinkHref={`#icon-${icon}`} />
      </svg>
    </span>
  );
};

export default Icon;
