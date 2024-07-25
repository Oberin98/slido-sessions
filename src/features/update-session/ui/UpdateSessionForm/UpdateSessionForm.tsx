import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  useSessionsStore,
  getUpdateSessionSelector,
  SessionDTO,
  sessionFormSchema,
  SessionForm,
  SessionFormState,
} from '~entities/session';
import Button from '~shared/ui/Button';

interface UpdateSessionFormProps {
  session: SessionDTO;
  onUpdate?: (session: SessionDTO) => void;
  onCancel?: () => void;
}

function UpdateSessionForm({ session, onUpdate, onCancel }: UpdateSessionFormProps) {
  const updateSession = useSessionsStore(getUpdateSessionSelector());

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const { handleSubmit, control, formState } = useForm<SessionFormState>({
    resolver: yupResolver(sessionFormSchema),
    defaultValues: {
      title: session.title,
      body: session.body,
      sessionType: session.type,
      startDateTime: session.startDateTime,
      endDateTime: session.endDateTime,
    },
  });

  const handleOnSubmit = handleSubmit(async (data) => {
    setIsUpdateLoading(true);

    const updatedSession = await updateSession({
      id: session.id,
      title: data.title,
      body: data.body,
      type: data.sessionType,
      startDateTime: new Date(data.startDateTime),
      endDateTime: new Date(data.endDateTime),
    });

    if (updatedSession) {
      onUpdate?.(updatedSession);
    }

    // TODO - handle error case when session is not updated

    setIsUpdateLoading(false);
  });

  return (
    <SessionForm
      onSubmit={handleOnSubmit}
      control={control}
      controls={
        <>
          <Button type="submit" loading={isUpdateLoading} disabled={!formState.isDirty}>
            Save Changes
          </Button>

          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        </>
      }
    />
  );
}

export default UpdateSessionForm;
