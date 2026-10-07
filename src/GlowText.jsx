// Phosphor heading. children must be a string: the red/blue fringes copy it via attr(data-text).
export default function GlowText({ as = 'h2', className = '', children, ...rest }) {
  const Tag = as
  return (
    <Tag className={`glow ${className}`.trim()} data-text={children} {...rest}>
      {children}
    </Tag>
  )
}
