// Html references
const lblDesktop = document.querySelector('h1');
const btnAnswer = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPending');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
    window.location = '/';
    throw new Error('The desktop is obligatory');
}

const desktop = searchParams.get('desktop');

lblDesktop.textContent = desktop;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Connected');
    btnAnswer.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Disconnect');
    btnAnswer.disabled = true;
});

socket.on('pending-ticket', payload => {
    console.log('payload: ', payload);
    if (payload === 0) {
        lblTicket.textContent = 'No more tickets';
        divAlert.style.display = '';
    } else {
        divAlert.style.display = 'none';
    }

    lblPending.textContent = payload;
});

btnAnswer.addEventListener('click', () => {
    // Send a message to the server, the third parameter is a callback that is executed in the server

    socket.emit('answer-ticket', { desktop }, ({ ok, ticket, msg }) => {
        // console.log(payload);
        if (!ok) {
            lblTicket.textContent = 'No more tickets';
            divAlert.style.display = '';
            return;
        }

        lblTicket.textContent = `Ticket ${ticket.number}`;
    });
    // socket.emit('next-ticket', {}, (ticket) => {
    //     console.log(ticket);
    //     lblNewTicket.textContent = ticket;
    // });
});