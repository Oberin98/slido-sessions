import cn from 'classnames';

import * as styles from './Input.module.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({ className, ...props }: InputProps) {
  return <input className={cn(styles.root, className)} {...props} />;
}

export default Input;
