document.getElementById('loginForm').addEventListener('submit', function(event) {
   event.preventDefault();
   const loginEmail = document.getElementById('email').value;
   const loginPassword = document.getElementById('password').value;
   const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

   const user = registeredUsers.find(function(u) {
       return u.email === loginEmail && u.password === loginPassword;
   });

   if (user) {
       alert('Успешный вход!');
      // stranica zakaza
      window.location.href = 'index.html';
   } else {
       alert('Не удалось войти. Пожалуйста, проверьте введенные данные.');
   }
});