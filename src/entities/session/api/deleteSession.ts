export async function deleteSession(id: string | number) {
  return fetch(`http://localhost:3000/sessions/${id}`, {
    method: 'DELETE',
  });
}
