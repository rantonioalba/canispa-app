import { LoginResponse } from "src/app/services/auth/loginResponse";
import Login from "../login";
import { Profile } from "../interfaces/profile.interface";


export class LoginMapper {
  static toProfile(response: LoginResponse): Profile {
    return {
      id: response.user.id,
      username: response.user.username,
      name: response.user.name,
      paternalSurname: response.user.paternalSurname,
      maternalSurname: response.user.maternalSurname,
      role: response.user.role,
    };
  }

}
