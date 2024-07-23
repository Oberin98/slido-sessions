export async function getSessions() {
  return fetch('http://localhost:3000/sessions');
}
