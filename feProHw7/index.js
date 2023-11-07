const modal = document.getElementById('myModal');
const modalBtns = document.querySelectorAll('#openModalBtn');
const closeBtn = document.querySelector('.close');
const buttonsContainer = document.getElementById('buttons');
const exitButton = document.getElementById('exitButton');

let orderCreated = false;

modalBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault();
    const address = document.getElementById('address').value;
    const price = document.getElementById('price').value;
    const cost = document.getElementById('cost').value;

    const data = {
        address: address,
        price: price,
        cost: cost
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
  .then(function(response) {
        if (response.status === 201) {
            orderCreated = true;
            showButtons();
            
            modal.style.display = 'none';
            document.getElementById('notification').innerText = 'Заказ создан!';


document.getElementById('notification').style.color = 'red'; // Nastaví barvu textu na 
document.getElementById('notification').style.fontSize = '54px';
            document.getElementById('notification').style.display = 'block';
        } else {
            document.getElementById('notification').innerText = 'Произошла ошибка. Пожалуйста, попробуйте еще раз.';
            document.getElementById('notification').style.display = 'block';
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
        document.getElementById('notification').innerText = 'Произошла ошибка. Пожалуйста, попробуйте еще раз.';
        document.getElementById('notification').style.display = 'block';
    });

    orderCreated = true;
    showButtons();
});

exitButton.addEventListener('click', function() {
    hideInterface();
});

function showButtons() {
    buttonsContainer.style.display = 'block';
exitButton.style.display = 'block' ;  document.getElementById('payButton').addEventListener('click', function() {
        fetchAndUpdateStatus('Оплачен');
    });
    document.getElementById('sendButton').addEventListener('click', function() {
        fetchAndUpdateStatus('Отправлен');
    });
    document.getElementById('acceptButton').addEventListener('click', function() {
        fetchAndUpdateStatus('Принят');
    });
    document.getElementById('completeButton').addEventListener('click', function() {
        fetchAndUpdateStatus('Завершен');
    });
}

function hideInterface() {
    modal.style.display = 'none';
    buttonsContainer.style.display = 'none';
    exitButton.style.display = 'none';
    document.getElementById('notification').innerText = '';

}

function fetchAndUpdateStatus(status) {
    document.getElementById('notification').innerText = 'Loading...'; //
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
       //obnovlenie
        document.getElementById('notification').innerText = `Статус: ${status}, Данные с сервера: ${JSON.stringify(data)}`;
    })
    .catch(function(error) {
        console.error('Error:', error);
        document.getElementById('notification').innerText = 'Произошла ошибка при обработке запроса.';
    });
}
