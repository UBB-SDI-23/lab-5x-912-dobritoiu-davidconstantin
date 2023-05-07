import axios from 'axios';

class AuthService {
  register(signUpRequest) {
    return axios.post("/api/auth/register", signUpRequest);
  }

  confirm(jwtToken) {
    return axios.post(`/api/auth/register/confirm/${jwtToken}`);
  }

  login(loginRequest) {
    return axios.post("/api/auth/signin", loginRequest);
  }

  logout() {
    return axios.post("/api/auth/signout");
  }
}

const authService = new AuthService();

export default authService;
