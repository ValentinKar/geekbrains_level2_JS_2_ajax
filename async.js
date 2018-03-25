// адрес запрашиваемого файла посредством AJAX-запроса
var jsonRequest = './answer-error.json';
// var jsonRequest = './answer-success.json';

/**
 * Функция делает асинхронный AJAX запрос к json (серверу).
 * @param {string} address - Имя запрашиваемого json-файла.
 */
function asyncAjaxRequest(address) {
    this.address = address;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.address, true); //true - Асинхронный запрос

    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        //0 - запрос не инициализирован
        //1 - загрузка
        //2 - запрос принят сервером
        //3 - обмен данными
        //4 - запрос выполнен
        if(xhr.readyState !== 4){
            return; //Выходим, если запрос еще выполняется
        }

        if(xhr.status !== 200)
        {
            console.log('Error', xhr.status, xhr.statusText);
        } else {
            var data = xhr.responseText;
            console.log('ok', data);
            var serverAnswer = JSON.parse(data);
            checkServerAnswer(serverAnswer.result);
        }
    };
    xhr.send(); //Отправка самого запроса
}

/**
 * Функция проверяет валидность ответа json(сервера).
 * @param {string} answer - заданное число.
 */
function checkServerAnswer(answer) {
    answer === 'success' ? answerSuccess() : answerError();
}

/**
 * Функция вызывает окно с сообщением об успехе.
 */
function answerSuccess() {
    alert('success!');
}

/**
 * Функция вызывает окно с сообщением об ошибке.
 */
function answerError() {
    alert('error!');
}

/**
 * Функция вызываемая при событии click по кнопке с id idButton.
 * @param {string} idButton - Идентификатор кнопки button, чье 
 * событие обрабатывается.
 */
function clickButton(idButton) {
    var btn1 = document.getElementById(idButton);
    btn1.addEventListener('click', function () {
        asyncAjaxRequest(jsonRequest);
    });
}

window.onload = function () {
    clickButton('btn1');
}