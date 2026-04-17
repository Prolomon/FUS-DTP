const API_URL = process.env.EXPO_PUBLIC_API_URL;

export  type Pickup = {
  id: string;
    parentId: string;
    code?: string;
    name: string;
    phone: string;
    relationship: string;
    createdAt?: string;
    updatedAt?: string;
    children?: object;
};

export async function getPickups(parentId: string, token?: string): Promise<{ pickup: Pickup | null }> {
  const res = await fetch(`${API_URL}/pickup?parentId=${encodeURIComponent(parentId)}`, {
    method: 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return res.json();
}

export async function create(payload: Partial<Pickup>, token?: string): Promise<{ pickup: Pickup | null, success: boolean, error?: string | null , message?: string}> {

  const res = await fetch(`${API_URL}/pickup`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deletePickups(id: string, token?: string): Promise<{ success: boolean, message?: string, error?: string }> {
  const res = await fetch(`${API_URL}/pickup?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return res.json();
}