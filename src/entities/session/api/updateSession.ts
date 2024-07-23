import { UpdateSessionInput } from './types';

export async function updateSession({ id, ...data }: UpdateSessionInput) {
  return fetch(`http://localhost:3000/sessions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}
