import { CreateSessionBody } from './types';

export async function createSession(data: CreateSessionBody) {
  return fetch('http://localhost:3000/sessions', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}
