/* eslint-disable no-undef */

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res.data); // Access response data
  } catch (err) {
    // Improved error handling
    if (err.response) {
      // Server responded with error status (4xx/5xx)
      console.log('Server Error:', err.response.data);
    } else if (err.request) {
      // Request was made but no response received
      console.log('Network Error:', err.message);
    } else {
      // Something else went wrong
      console.log('Error:', err.message);
    }
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
