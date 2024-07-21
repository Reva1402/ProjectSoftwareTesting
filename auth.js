// auth.js
export const login = (email, password) => {
    // Mock user data
    const mockUser = {
      email: 'user@example.com',
      password: 'password123'
    };
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === mockUser.email && password === mockUser.password) {
          resolve('Login successful');
        } else {
          reject('Invalid email or password');
        }
      }, 1000);
    });
  };
  