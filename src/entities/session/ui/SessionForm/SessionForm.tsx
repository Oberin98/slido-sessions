import { memo } from 'react';
import { Control, Controller } from 'react-hook-form';

import { dateToDateTimeInputValue } from '~shared/lib';

import { SessionFormState } from '../../lib';

interface SessionFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  control: Control<SessionFormState>;
  controls: React.ReactNode;
}

function SessionForm({ control, controls, ...props }: SessionFormProps) {
  return (
    <form {...props}>
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <div>
              <label htmlFor="title-input">Title:</label>
              <input id="title-input" type="text" required {...field} />
              {error?.message && <div>{error.message}</div>}
            </div>
          );
        }}
      />

      <Controller
        name="sessionType"
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <div>
              <label htmlFor="session-type-select">Type:</label>
              <select id="session-type-select" required {...field}>
                <option value="meeting">Meeting</option>
                <option value="event">Event</option>
              </select>
              {error?.message && <div>{error.message}</div>}
            </div>
          );
        }}
      />

      <Controller
        name="body"
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <div>
              <label htmlFor="body-input">Body:</label>
              <textarea id="body-input" required {...field} />
              {error?.message && <div>{error.message}</div>}
            </div>
          );
        }}
      />

      <Controller
        name="startDateTime"
        control={control}
        render={({ field: { value, onChange, ...field }, fieldState: { error } }) => {
          return (
            <div>
              <label htmlFor="start-date-input">Start Date:</label>
              <input
                id="start-date-input"
                type="datetime-local"
                required
                value={dateToDateTimeInputValue(value)}
                onChange={(ev) => onChange(new Date(ev.currentTarget.value))}
                {...field}
              />
              {error?.message && <div>{error.message}</div>}
            </div>
          );
        }}
      />

      <Controller
        name="endDateTime"
        control={control}
        render={({ field: { value, onChange, ...field }, fieldState: { error } }) => {
          return (
            <div>
              <label htmlFor="end-date-input">End Date:</label>
              <input
                id="end-date-input"
                type="datetime-local"
                required
                value={dateToDateTimeInputValue(value)}
                onChange={(ev) => onChange(new Date(ev.currentTarget.value))}
                {...field}
              />
              {error?.message && <div>{error.message}</div>}
            </div>
          );
        }}
      />

      {controls}
    </form>
  );
}

export default memo(SessionForm);
