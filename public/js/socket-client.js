// html references
const statusOnline = document.querySelector('#status-online');
const statusOffline = document.querySelector('#status-offline');
const txtMsg = document.querySelector('#txtMsg');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
    // console.log('Connected');

    statusOnline.style.display = '';
    statusOffline.style.display = 'none';
});

socket.on('disconnect', () => {
    // console.log('Disconnect');
    
    statusOnline.style.display = 'none';
    statusOffline.style.display = '';
});

socket.on('send-message', (payload) => {
    console.log(payload);
});

btnSend.addEventListener('click', () => {
    const msg = txtMsg.value;
    const payload = {
        msg,
        id: 'foo-123',
        date: new Date().getTime()
    };

    // Send a message to the server, the third parameter is a callback that is executed in the server
    socket.emit('send-message', payload, (id) => {
        console.log('From server(client): ', id);
    });

    // socket.emit('send-message', payload);
});