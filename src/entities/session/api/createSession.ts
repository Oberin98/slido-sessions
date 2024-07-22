import { CreateSessionInput, SessionObj } from './types';

export async function createSession(data: CreateSessionInput): Promise<SessionObj | null> {
  try {
    const response = await fetch('http://localhost:3000/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return response.json();
  } catch {
    return null;
  }
}
