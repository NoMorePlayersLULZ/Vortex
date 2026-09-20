// Переключение экранов по кнопкам сайдбара
const navButtons = document.querySelectorAll('.sidebar .nav-btn');
const screens = document.querySelectorAll('.screen');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const screenId = btn.getAttribute('data-screen');

        screens.forEach(screen => {
            if (screen.id === screenId) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });
    });
});

// Смена темы
const themeSelect = document.getElementById('theme-select');
if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
        document.body.className = e.target.value;
    });
}

// Логика переключения чатов (и адаптив для мобилок)
const chatItems = document.querySelectorAll('.chat-item');
const messengerLayout = document.querySelector('.messenger-layout');
const backToChatsBtn = document.getElementById('back-to-chats-btn');
const currentChatTitle = document.getElementById('current-chat-title');

chatItems.forEach(item => {
    item.addEventListener('click', () => {
        chatItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        
        const chatName = item.querySelector('.chat-name').textContent;
        if (currentChatTitle) {
            currentChatTitle.textContent = chatName;
        }

        // На мобилках активируем класс, чтобы скрыть список и показать чат
        if (messengerLayout) {
            messengerLayout.classList.add('chat-active');
        }
    });
});

// Кнопка «Назад» на мобилках
if (backToChatsBtn && messengerLayout) {
    backToChatsBtn.addEventListener('click', () => {
        messengerLayout.classList.remove('chat-active');
    });
}

// Отправка сообщений
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