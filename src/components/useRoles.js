import { useState, useEffect } from 'react';
import axios from 'axios';

const useRoles = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState(null);
  const [id, setId] = useState(0);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const jwtToken = user.jwtToken;
      if (jwtToken) {
        axios
          .get(`/api/user/${user.username}`)
          .then((response) => {
            const id = response.data.id;
            setId(id);
            const roles = response.data.roles;
            if (roles.length > 0) {
              console.log(roles);
              setRoles(roles.map((role) => role.name));
            } else {
              setRoles(['ROLE_ANONYMOUS']);
            }
            setIsAuthenticated(true);
          })
          .catch((error) => {
            console.log(error);
            setRoles(['ROLE_ANONYMOUS']);
            setIsAuthenticated(true);
          });
      }
    } else {
      setRoles(['ROLE_ANONYMOUS']);
    }
  }, []);

  return { isAuthenticated, roles, id };
};

export default useRoles;
