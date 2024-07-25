import { memo } from 'react';
import { Control, Controller } from 'react-hook-form';

import DateTimeInput from '~shared/ui/DateTimeInput';
import Descriptor from '~shared/ui/Descriptor';
import Input from '~shared/ui/Input';
import Label from '~shared/ui/Label';
import Select from '~shared/ui/Select';
import Textarea from '~shared/ui/Textarea';

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
              <Label required htmlFor="title-input">
                Title
              </Label>
              <Input id="title-input" type="text" required {...field} />
              {error?.message && <Descriptor error>{error.message}</Descriptor>}
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
              <Label required htmlFor="session-type-select">
                Type
              </Label>

              <Select id="session-type-select" required {...field}>
                <option value="meeting">Meeting</option>
                <option value="event">Event</option>
              </Select>

              {error?.message && <Descriptor error>{error.message}</Descriptor>}
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
              <Label required htmlFor="body-input">
                Body
              </Label>

              <Textarea id="body-input" required {...field} />

              {error?.message && <Descriptor error>{error.message}</Descriptor>}
            </div>
          );
        }}
      />

      <Controller
        name="startDateTime"
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <div>
              <Label required htmlFor="start-date-input">
                Start Date
              </Label>

              <DateTimeInput id="start-date-input" required {...field} />

              {error?.message && <Descriptor error>{error.message}</Descriptor>}
            </div>
          );
        }}
      />

      <Controller
        name="endDateTime"
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <div>
              <Label required htmlFor="end-date-input">
                End Date:
              </Label>

              <DateTimeInput id="end-date-input" required {...field} />

              {error?.message && <Descriptor error>{error.message}</Descriptor>}
            </div>
          );
        }}
      />

      {controls}
    </form>
  );
}

export default memo(SessionForm);
