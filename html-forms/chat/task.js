const textMessageFirst = [
    'Добрый день, мы ещё не проснулись. Позвоните через 10 лет.',
    'Вы ничего не купили! Убирайтесь пока я полицию не вызвал!',
    'Тихо я сказал!!! Или я тихо сказал?',
    'Абонент временно не доступен. Оплатите счет.',
    'На Вашем счете не достаточно средств. Приходите позже.',
    'С Вашего счета списано 2500 рублей. Подтвердите перевод нажав на Enter.',
    'У меня голова болит. Приходите завтра или никогда.',
    'Вам сегодня несказанно повезло!!!',
    'Ничего не понимаю.',
    'Повторите, Вас не слышно.',
    'Закройте дверь с другой стороны.',
];

const textMessageSecond = [
    'Чего стоим? Кого ждем?',
    'Время деньги! У нас оплата посекундная.',
    'Вы можете и помолчать. Счет Вам на почту прислать?',
    'И долго Вы будете соображать?',
];

let array = textMessageFirst.slice();
let arraySecond = textMessageSecond.slice();
let count;
const messages = document.querySelector( '.chat-widget__messages' );
const div = document.querySelector('.chat-widget');
const header = document.querySelector('header');
const input = document.getElementById('chat-widget__input');

div.addEventListener('click', () => {
    div.classList.add('chat-widget_active');
    if (count == undefined) {
        sendMessage('Чем могу помочь?');
    } else {
        timer();
    }
});

header.addEventListener('click', () => {
    div.classList.remove('chat-widget_active');
    clearTimeout(count);
});

input.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        if (input.value.trim()) {
            let index = Math.floor(Math.random() * array.length);
            sendMessage(input.value, true);
            input.value = '';
            sendMessage(array[index]);
            array.splice(index, 1);
            if (!array.length) {
                array = textMessageFirst.slice();
            }
        }
    }
});

input.addEventListener('input', () => {
    timer();
});

function sendMessage(text, client=false) {
    let nameClass = 'message';
    const time = new Date();
    if (client) {
        nameClass = 'message message_client';
    } 
    messages.innerHTML += `
        <div class="${nameClass}">
            <div class="message__time">
                ${time.getHours()}:${time.getMinutes()}
            </div>
            <div class="message__text">
                ${text}
            </div>
        </div>
    `;
    moveScroll();
    timer();
}

function moveScroll() {
    const conteiner = document.querySelector('.chat-widget__messages-container');
    conteiner.scrollTo({
        top: conteiner.scrollHeight,
        behavior: 'smooth',
    });
}

function timer() {
    clearTimeout(count);
    count = setTimeout(() => {
        index = Math.floor(Math.random() * arraySecond.length);
        sendMessage(arraySecond[index]);
        arraySecond.splice(index, 1);
        if (!arraySecond.length) {
            arraySecond = textMessageSecond.slice();
        }
    }, 30000);
}