import { type JwtPayload } from "jwt-decode";

export interface CustomTokenPayloadEmail extends JwtPayload {
  email: string;
}

export interface CustomTokenPayloadUsername extends JwtPayload {
  username: string;
}

export interface UserRegisterData {
  username: string;
  password: string;
  email: string;
}

export interface UserRegisterResponse {
  message: string;
}

export interface CreatePostResponse {
  message: string;
}
