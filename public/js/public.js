// Html references
const lblTicket1 = document.querySelector('#lblTicket1');
const lblDesktop1 = document.querySelector('#lblDesktop1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblDesktop2 = document.querySelector('#lblDesktop2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblDesktop3 = document.querySelector('#lblDesktop3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblDesktop4 = document.querySelector('#lblDesktop4');

const socket = io();

socket.on('connect', () => {
    // console.log('Connected');
});

socket.on('disconnect', () => {
    // console.log('Disconnect');
});

socket.on('actual-status', payload => {
    console.log(payload);

    const audio = new Audio('../audio/new-ticket.mp3');
    audio.play();

    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;
    if (ticket1) {
        lblTicket1.textContent = 'Ticket ' + ticket1.number;
        lblDesktop1.textContent = ticket1.desktop;
    }
    if (ticket2) {
        lblTicket2.textContent = 'Ticket ' + ticket2.number;
        lblDesktop2.textContent = ticket2.desktop;
    }
    if (ticket3) {
        lblTicket3.textContent = 'Ticket ' + ticket3.number;
        lblDesktop3.textContent = ticket3.desktop;
    }
    if (ticket4) {
        lblTicket4.textContent = 'Ticket ' + ticket4.number;
        lblDesktop4.textContent = ticket4.desktop;
    }
});