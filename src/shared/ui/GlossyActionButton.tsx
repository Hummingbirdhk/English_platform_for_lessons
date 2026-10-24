import type { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type ActionSize = 'xs' | 'sm' | 'md';

type SharedProps = {
  label: string;
  size?: ActionSize;
  className?: string;
};

type GlossyActionLinkProps = SharedProps & {
  to: string;
};

type GlossyActionButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'className'>;

function ActionIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M7 22.5L18.5 11H13V6.5H26V19.5H21.5V14L10 25.5L7 22.5Z" />
    </svg>
  );
}

function actionClassName(size: ActionSize, className?: string) {
  return ['glossy-action-button', `glossy-action-button--${size}`, className]
    .filter(Boolean)
    .join(' ');
}

export function GlossyActionLink({
  to,
  label,
  size = 'md',
  className,
}: GlossyActionLinkProps) {
  return (
    <Link to={to} aria-label={label} className={actionClassName(size, className)}>
      <span className="glossy-action-button__icon">
        <ActionIcon />
      </span>
    </Link>
  );
}

export function GlossyActionButton({
  label,
  size = 'md',
  className,
  type = 'button',
  ...props
}: GlossyActionButtonProps) {
  return (
    <button
      {...props}
      type={type}
      aria-label={label}
      className={actionClassName(size, className)}
    >
      <span className="glossy-action-button__icon">
        <ActionIcon />
      </span>
    </button>
  );
}
