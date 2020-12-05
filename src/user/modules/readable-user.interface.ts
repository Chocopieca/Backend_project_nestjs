export interface ReadableUserI {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  nickname: string;
  description: string;
  position: string;
  role: string;
  status: string;
  accessToken?: string
}