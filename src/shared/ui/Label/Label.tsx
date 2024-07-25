import cn from 'classnames';
import { LabelHTMLAttributes } from 'react';

import * as styles from './Label.module.css';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <label className={cn(styles.root, className)} {...props}>
      {children} {required && <span className={styles.requiredSign}>*</span>}
    </label>
  );
}

export default Label;
