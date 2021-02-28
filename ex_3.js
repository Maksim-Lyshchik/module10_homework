/*Реализовать чат на основе эхо-сервера wss://echo.websocket.org/
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
Эхо-сервер будет отвечать вам тем же сообщением.
Добавить в чат механизм отправки гео-локации. */

let inpMassage = document.querySelector('.inp_massage');
let send = document.querySelector('.send');
let geoloc = document.querySelector('.geolocation');
let windowMassage = document.querySelector('.window_chat');
let element = document.querySelector('.window_chat');
const echo = 'wss://echo.websocket.org/'

//function add massage 
function htmlGeneration(message, classLocation) {
    let newMessage = document.createElement('p');
    newMessage.classList.add('window__massage');
    newMessage.classList.add(classLocation);
    newMessage.textContent = message;
    return newMessage;
}

//Connect server
let echoWeb = new WebSocket(echo);

echoWeb.onopen = () => {
    alert('Соединение установлено!')
};

echoWeb.onclose = () => {
    alert('Произошло разъединение с сервером!');
};

echoWeb.onmessage = function (evt) {
    console.log(evt.data);
    if (evt.data.indexOf('www.openstreetmap.org') < 1) {
        windowMassage.appendChild(htmlGeneration(evt.data, 'window__massage-echo'));
    };

    element.scrollTop = element.scrollHeight;
};

echoWeb.onerror = function (evt) {
    alert('Ошибка соединения!');
};

// Send button
send.addEventListener('click', () => {
    echoWeb.send(inpMassage.value);
    windowMassage.appendChild(htmlGeneration(inpMassage.value, 'window__massage-send'));

    element.scrollTop = element.scrollHeight;
    inpMassage.value = '';
});

// Geolocation button
geoloc.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        console.log('геолокация поддерживается');
        
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;

            const mapLink = document.createElement('a');
            mapLink.href = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
            mapLink.textContent = 'Гео-локация';
            mapLink.classList.add('window__massage');
            mapLink.classList.add('window__massage-send');
            echoWeb.send(mapLink);
            windowMassage.appendChild(mapLink);
        });
    } else {
        console.log('доступа нет');
    }
});