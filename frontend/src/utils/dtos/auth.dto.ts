export interface User {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN"; 
  status: "ACTIVE" | "SUSPENDED";
  is_seller: boolean;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: Omit<User, "status" | "is_seller">; 
}