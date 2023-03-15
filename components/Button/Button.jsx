import { forwardRef } from 'react';

const Button = forwardRef(
  (
    {
      type,
      title,
      disabled,
      className,
      style = {},
      children,
      loading,
      onClick,
      ...props
    },
    ref,
  ) => (
    <button
      style={style}
      ref={ref}
      disabled={disabled || loading}
      type={type}
      className={className}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <i className="fa-solid fa-spinner-third h-max w-max animate-spin bg-transparent" />
      ) : (
        children
      )}
    </button>
  ),
);

Button.displayName = 'Button';
export default Button;
