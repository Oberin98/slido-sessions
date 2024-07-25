import cn from 'classnames';

import * as styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

function Button({ children, loading, disabled, className, ...props }: ButtonProps) {
  return (
    <button className={cn(styles.root, className)} disabled={loading || disabled} {...props}>
      {loading ? 'Loading...' : children}
    </button>
  );
}

export default Button;
