// Переключение экранов по кнопкам сайдбара
const navButtons = document.querySelectorAll('.sidebar .nav-btn');
const screens = document.querySelectorAll('.screen');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Убираем активный класс у кнопок
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Получаем ID нужного экрана
        const screenId = btn.getAttribute('data-screen');

        // Переключаем экраны
        screens.forEach(screen => {
            if (screen.id === screenId) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });
    });
});

// Логика смены темы через настройки
const themeSelect = document.getElementById('theme-select');
if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
        document.body.className = e.target.value;
    });
}

// Логика кликов по списку чатов (Telegram-стиль)
const chatItems = document.querySelectorAll('.chat-item');
chatItems.forEach(item => {
    item.addEventListener('click', () => {
        chatItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        
        const chatId = item.getAttribute('data-chat');
        console.log('Переключено на чат:', chatId);
    });
});

// Отправка сообщений в чате
const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');

if (sendBtn && messageInput && chatBox) {
    function sendMessage() {
        const text = messageInput.value.trim();
        if (text === '') return;

        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.innerHTML = `<b>Вы:</b> ${text}`;
        chatBox.appendChild(msgDiv);

        messageInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}