import { SessionObj, UpdateSessionInput } from './types';

export async function updateSession(id: string | number, data: UpdateSessionInput): Promise<SessionObj | null> {
  try {
    const response = await fetch(`http://localhost:3000/sessions/${id}`, {
      method: 'PUT',
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
