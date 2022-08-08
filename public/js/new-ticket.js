// Html references
lblNewTicket = document.querySelector('#lblNewTicket');
btnNewTicket = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    // console.log('Connected');
    btnNewTicket.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Disconnect');
    btnNewTicket.disabled = true;
});

socket.on('last-ticket', payload => {
    lblNewTicket.textContent = 'Ticket ' + payload;
});

btnNewTicket.addEventListener('click', () => {
    // Send a message to the server, the third parameter is a callback that is executed in the server
    socket.emit('next-ticket', {}, (ticket) => {
        console.log(ticket);
        lblNewTicket.textContent = ticket;
    });
});