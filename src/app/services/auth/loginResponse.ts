export interface LoginResponse {
  token: string;
  user:  UserLoginResponse;
}

export interface UserLoginResponse {
  id:                    number;
  username:              string;
  password:              string;
  name:                  string;
  paternalSurname:       string;
  maternalSurname:       string;
  role:                  string;
  authorities:           Authority[];
  accountNonExpired:     boolean;
  accountNonLocked:      boolean;
  credentialsNonExpired: boolean;
  enabled:               boolean;
}

export interface Authority {
  authority: string;
}
