export default function GoodFellaButton({ children, onClick, href, light = false }) {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      className={`gf-btn ${light ? 'gf-btn-light' : ''}`}
      onClick={onClick}
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <span className="gf-btn-text">{children}</span>
      <span className="gf-btn-icon">+</span>
    </Tag>
  );
}
