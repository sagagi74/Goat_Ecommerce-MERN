// const signupFormHandler = async (event) => {
//   event.preventDefault();

//   const first_name = document.querySelector('.first-name-signup').value.trim();
//   const last_name = document.querySelector('.last-name-signup').value.trim();
//   const email = document.querySelector('.email-signup').value.trim();
//   const password = document.querySelector('.password-signup').value.trim();
//   console.log(first_name, last_name, email, password);

//   if (first_name && last_name && email && password) {
//     const response = await fetch('/api/customer', {
//       method: 'POST',
//       body: JSON.stringify({ 
//         first_name: first_name, 
//         last_name: last_name, 
//         email: email, 
//         password: password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/login');
//     } else {
//       alert('Failed to sign up.');
//     }
//   }
// };

// document
//   .querySelector('.signup-form')
//   .addEventListener('click', signupFormHandler);