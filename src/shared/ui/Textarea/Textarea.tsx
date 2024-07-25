import cn from 'classnames';

import * as styles from './Textarea.module.css';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={cn(styles.root, className)} {...props} />;
}

export default Textarea;
