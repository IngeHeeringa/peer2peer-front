import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  storeToken(token: string) {
    localStorage.setItem("token", token);
  }

  fetchToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  getTokenBearer() {
    const token = this.fetchToken();

    return `Bearer ${token!}`;
  }
}
