const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface LoginRequest {
  email: string;
  password: string;
}

export type Staff = {
  id?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string | null;
  email?: string;
  phone?: string;
  schoolId?: string;
  status: boolean;
  avatar?: string | null;
  state?: string | null;
  city?: string | null;
  address?: string | null;
  alternatePhone?: string | null;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
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
  action: string | null;
  pickupPerson?: string | null;
  pickupPhone?: string | null;
  pickupRelationship?: string | null;
  parentId?: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export interface LoginResponse {
  staff: Staff;
  error?: string;
  token?: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/staff/login`, {
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

export async function getStaff(staffId: string, token?: string) {
  const response = await fetch(`${API_URL}/staff/${staffId}`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch staff");
  }

  return (await response.json()) as Staff;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export async function changePassword(
  staffId: string,
  payload: ChangePasswordPayload,
  token?: string,
) {
  const response = await fetch(`${API_URL}/staff/${staffId}/password`, {
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

  return (await response.json()) as Staff;
}

export async function verifyCode(code: string, token?: string) {
  const response = await fetch(`${API_URL}/school/code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ code }),
  });

  const text = await response.text();
  const json = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(json?.error || "Failed to verify code");
  }

  return json;
}

export async function getCodes(token?: string, payload?: string[]) {
  const response = await fetch(`${API_URL}/students/code`, {
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
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const getCheckInRecords = async (schoolUid: string, token?: string) => {
  const response = await fetch(
    `${API_URL}/checkin?schoolUid=${encodeURIComponent(schoolUid)}`,
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
export const createRecord = async (payload: { studentIds: string[]; pickupPerson: string; pickupPhone: string; pickupRelationship: string; parentId: string, schoolUid: string, staffId: string }, token?: string) => {
  const response = await fetch(
    `${API_URL}/checkin`,
    {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || "Failed to create check-in record");
  }

  return await response.json();
};
