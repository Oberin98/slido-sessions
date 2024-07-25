import cn from 'classnames';
import { useEffect, useState } from 'react';

import { dateToDateTimeInputValue } from '~shared/lib';

import * as styles from './DateTimeInput.module.css';

type ElementProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'>;
type DateTimeInputValue = Date | string | number;

interface DateTimeInputProps extends ElementProps {
  value?: DateTimeInputValue;
  defaultValue?: DateTimeInputValue;
  onChange?: (value: Date, ev: React.ChangeEvent<HTMLInputElement>) => void;
}

function DateTimeInput({ value, defaultValue, onChange, className, ...props }: DateTimeInputProps) {
  const [valueState, setValueState] = useState(() => {
    const dateValue = value || defaultValue;

    if (dateValue) {
      return dateToDateTimeInputValue(dateValue);
    }

    return undefined;
  });

  // Listen prop value change and update local state
  useEffect(() => {
    if (value !== undefined) {
      setValueState(dateToDateTimeInputValue(value));
    }
  }, [value]);

  const handleOnChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = new Date(ev.currentTarget.value);

    // If prop value is absent update local state manually
    if (value === undefined) {
      setValueState(dateToDateTimeInputValue(nextValue));
    }

    onChange?.(nextValue, ev);
  };

  return (
    <input
      type="datetime-local"
      value={valueState}
      onChange={handleOnChange}
      className={cn(styles.root, className)}
      {...props}
    />
  );
}

export default DateTimeInput;
