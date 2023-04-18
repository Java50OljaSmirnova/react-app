import AuthService from "../service/AuthService";
import AuthServiceFireBase from "../service/AuthServiceFirebase";

export const authService: AuthService = new AuthServiceFireBase();
export const AUTH_USER_ITEM = "auth-user";