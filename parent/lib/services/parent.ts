const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface ParentLoginRequest {
  parentEmail: string;
  password: string;
}

export type Parent = {
  id: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentAlternatePhone?: string | null;
  parentState?: string | null;
  parentLga?: string | null;
  address: string;
  password: string;
  role: string;
  schoolUid: string;
  createdAt: string;
  updatedAt: string;
  children?: Student[];
};

export type Student = {
  id: string;
  studentId: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  dateOfBirth: string;
  section: string;
  grade: string;
  gender: string;
  nationality: string;
  stateOfOrigin: string;
  lga: string;
  avatar?: string | null;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  code?: string;
};

export type CheckInRecord = {
  id: string;
  studentId: string;
  student: Student;
  action?: string | null;
  pickupPerson?: string | null;
  pickupPhone?: string | null;
  pickupRelationship?: string | null;
  parentId?: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export interface ParentLoginResponse {
  parent: Parent;
  error?: string;
  token?: string;
}

export async function loginParent(
  data: ParentLoginRequest,
): Promise<ParentLoginResponse> {
  const res = await fetch(`${API_URL}/parent/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Login failed");
  }
  return json;
}

export async function getParent(parentId: string, token?: string) {
  const response = await fetch(`${API_URL}/parent/${parentId}`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch parent");
  }

  return (await response.json()) as Parent & { children: Student[] };
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export async function changePassword(
  parentId: string,
  payload: ChangePasswordPayload,
  token?: string,
) {
  const response = await fetch(`${API_URL}/parent/${parentId}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || "Failed to update password");
  }

  return (await response.json()) as Parent;
}

export async function getCodes(token?: string, payload?: string[]) {
  const response = await fetch(`${API_URL}/students/code?parent=true`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ ids: payload }),
  });

  const text = await response.json();
  if (!response.ok) {
    let error;
    try {
      error = JSON.parse(text);
    } catch {
      error = { error: text || "Failed to get student code text" };
    }
    throw new Error(error?.error || "Failed to get student code error");
  }
  console.log(text);
  if (!text) return null;
  try {
    return text;
  } catch {
    return null;
  }
}

export const getCheckinRecords = async (parentId: string, token?: string) => {
  const response = await fetch(
    `${API_URL}/checkin?parentId=${encodeURIComponent(parentId)}`,
    {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || "Failed to get checkin records");
  }

  return await response.json();
};
