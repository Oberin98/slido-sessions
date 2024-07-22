import { SessionObj } from './types';

export async function getSessions(): Promise<SessionObj[] | null> {
  try {
    const response = await fetch('http://localhost:3000/sessions');
    return response.json();
  } catch {
    return null;
  }
}
