import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useSessionsStore, getCreateSessionSelector, SessionDTO } from '~entities/session';

import { CreateSessionFormState, schema } from '../../lib';

interface CreateSessionFormProps {
  onCreate?: (session: SessionDTO) => void;
  onCancel?: () => void;
}

function CreateSessionForm({ onCreate, onCancel }: CreateSessionFormProps) {
  const createSession = useSessionsStore(getCreateSessionSelector());

  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const { handleSubmit, control, formState } = useForm<CreateSessionFormState>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      body: '',
      sessionType: 'event',
      startDateTime: '',
      endDateTime: '',
    },
  });

  const handleOnSubmit = handleSubmit(async (data) => {
    setIsCreateLoading(true);

    const session = await createSession({
      title: data.title,
      body: data.body,
      type: data.sessionType,
      startDateTime: new Date(data.startDateTime),
      endDateTime: new Date(data.endDateTime),
    });

    if (session) {
      onCreate?.(session);
    }

    setIsCreateLoading(false);
  });

  return (
    <form onSubmit={handleOnSubmit}>
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
        render={({ field, fieldState: { error } }) => {
          return (
            <div>
              <label htmlFor="start-date-input">Start Date:</label>
              <input id="start-date-input" type="datetime-local" required {...field} />
              {error?.message && <div>{error.message}</div>}
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
              <label htmlFor="end-date-input">End Date:</label>
              <input id="end-date-input" type="datetime-local" required {...field} />
              {error?.message && <div>{error.message}</div>}
            </div>
          );
        }}
      />

      <button type="submit" disabled={!formState.isDirty || isCreateLoading}>
        {isCreateLoading ? 'Loading...' : 'Create Session'}
      </button>

      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default CreateSessionForm;
