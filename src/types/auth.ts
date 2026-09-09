export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  accessToken: string;
}