document.getElementById('registerForm').addEventListener('submit', function(event) {
   event.preventDefault();
   const registerEmail = document.getElementById('registerEmail').value;
   const registerPassword = document.getElementById('registerPassword').value;
   const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

   // proverka na dublicate email
   if (registeredUsers.some(user => user.email === registerEmail)) {
       alert('Пользователь с таким email уже зарегистрирован.');
   } else {
       registeredUsers.push({ email: registerEmail, password: registerPassword });
       localStorage.setItem('users', JSON.stringify(registeredUsers));
       alert('Регистрация успешна. Теперь вы можете войти.');
       //perechod na page avtorization
       window.location.href = 'login.html';
   }
});
