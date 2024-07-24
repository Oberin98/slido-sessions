import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SessionObj } from '~entities/session';
import { CreateSessionForm } from '~features/create-session';

function CreateSessionPage() {
  const navigate = useNavigate();

  const handleCreate = (session: SessionObj) => {
    navigate(`/session/${session.id}`);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return <CreateSessionForm onCreate={handleCreate} onCancel={handleCancel} />;
}

export default CreateSessionPage;
