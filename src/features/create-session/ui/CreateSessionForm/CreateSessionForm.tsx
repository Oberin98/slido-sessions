import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  useSessionsStore,
  getCreateSessionSelector,
  SessionDTO,
  sessionFormSchema,
  SessionForm,
  SessionFormState,
} from '~entities/session';

interface CreateSessionFormProps {
  onCreate?: (session: SessionDTO) => void;
  onCancel?: () => void;
}

function CreateSessionForm({ onCreate, onCancel }: CreateSessionFormProps) {
  const createSession = useSessionsStore(getCreateSessionSelector());

  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const { handleSubmit, control, formState } = useForm<SessionFormState>({
    resolver: yupResolver(sessionFormSchema),
    defaultValues: {
      title: '',
      body: '',
      sessionType: 'event',
      startDateTime: undefined,
      endDateTime: undefined,
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

    // TODO - handle error case when session is not created

    setIsCreateLoading(false);
  });

  return (
    <SessionForm
      onSubmit={handleOnSubmit}
      control={control}
      controls={
        <>
          <button type="submit" disabled={!formState.isDirty || isCreateLoading}>
            {isCreateLoading ? 'Loading...' : 'Create Session'}
          </button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </>
      }
    />
  );
}

export default CreateSessionForm;
