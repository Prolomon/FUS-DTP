const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type School = {
  id: string;
  uid: string;
  schoolName: string;
  schoolEmail: string;
  registrationNumber: string;
  schoolPhone: string;
  schoolType: string;
  studentMix: string;
  boardingOption: string;
  yearEstablished: number | null;
  studentCount: number;
  capacity: number | null;
  schoolAddress: string;
  country: string;
  state: string;
  lga: string;
  schoolLogo: string | null;
  contactName: string;
  contactRole: string;
  contactPhone: string;
  alternatePhone: string | null;
  contactEmail: string;
  contactGender: string;
  nationality: string;
  contactState: string;
  contactLga: string;
  contactAddress: string;
  createdAt: string;
  updatedAt: string;
};

type SchoolError = {
  error?: string;
  missing?: string[];
};

export async function getSchool(
  uid: string,
  token?: string,
) {
  const response = await fetch(`${API_URL}/school/${uid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    let data: SchoolError | null = null;

    try {
      data = (await response.json()) as SchoolError;
    } catch {
      data = null;
    }

    throw new Error(data?.error || "Failed to fetch school");
  }

  const school = (await response.json()) as School;

  return school;
}
