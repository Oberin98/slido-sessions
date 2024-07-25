import { UpdateSessionBody } from './types';

export async function updateSession({ id, ...data }: UpdateSessionBody) {
  return fetch(`http://localhost:3000/sessions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}
