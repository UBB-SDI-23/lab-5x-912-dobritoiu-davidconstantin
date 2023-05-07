import axios from 'axios';

class AuthService {
  register(signUpRequest) {
    return axios.post("/api/register", signUpRequest);
  }

  confirm(jwtToken) {
    return axios.post(`/api/register/confirm/${jwtToken}`);
  }

  login(loginRequest) {
    return axios.post("/api/signin", loginRequest);
  }

  logout() {
    return axios.post("/api/signout");
  }
}

const authService = new AuthService();

export default authService;
