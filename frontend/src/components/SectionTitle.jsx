function SectionTitle({
  badge,
  title,
  description,
  center = true
}) {
  return (
    <div
      className={`section-title ${
        center ? "center" : ""
      }`}
    >

      {badge && (
        <span className="section-badge">
          {badge}
        </span>
      )}

      <h2>{title}</h2>

      {description && (
        <p>{description}</p>
      )}

    </div>
  );
}

export default SectionTitle;
