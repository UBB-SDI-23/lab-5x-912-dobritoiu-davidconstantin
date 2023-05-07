import axios from 'axios';

const TOKEN_KEY = 'auth_token';

class AuthService {
  register(signUpRequest) {
    return axios.post("/api/register", signUpRequest);
  }

  confirm(jwtToken) {
    return axios.post(`/api/register/confirm/${jwtToken}`);
  }

  login(loginRequest) {
    return axios.post("/api/signin", loginRequest)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem(TOKEN_KEY, response.data.accessToken);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    return axios.post("/api/signout");
  }

  getCurrentUser() {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    }

    return null;
  }
}

const authService = new AuthService();

export default authService;
