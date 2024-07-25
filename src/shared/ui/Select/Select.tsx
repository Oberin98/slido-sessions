import cn from 'classnames';

import * as styles from './Select.module.css';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

function Select({ children, className, ...props }: SelectProps) {
  return (
    <select className={cn(styles.root, className)} {...props}>
      {children}
    </select>
  );
}

export default Select;
