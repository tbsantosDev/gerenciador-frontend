export interface LoginRequest {
    email: string;
    password: string;
  }
  export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
  }
  export interface RequestPassword {
    email: string
  }
  export interface ResetPassword {
    email: string
    token: string
    newPassword: string
  }
  