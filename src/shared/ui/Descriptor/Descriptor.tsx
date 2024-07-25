import cn from 'classnames';
import { HTMLAttributes } from 'react';

import * as styles from './Descriptor.module.css';

interface DescriptorProps extends HTMLAttributes<HTMLDivElement> {
  error?: boolean;
  className?: string;
}

function Descriptor({ children, error, className, ...props }: DescriptorProps) {
  return (
    <div className={cn(styles.root, error && styles.error, className)} {...props}>
      {children}
    </div>
  );
}

export default Descriptor;
