export async function deleteSession(id: string | number): Promise<boolean> {
  try {
    await fetch(`http://localhost:3000/sessions/${id}`, {
      method: 'DELETE',
    });

    return true;
  } catch {
    return false;
  }
}
