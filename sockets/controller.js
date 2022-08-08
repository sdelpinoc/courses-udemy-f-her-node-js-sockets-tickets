import TicketControl from '../models/ticket-control.js';

const ticketControl = new TicketControl();

const socketController = socket => {
    socket.on('disconnect', () => { });

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('actual-status', ticketControl.lastFourTicketsServed);
    socket.emit('pending-ticket', ticketControl.tickets.length);

    // When a new ticket is created
    socket.on('next-ticket', (payload, callback = () => { }) => {
        const next = ticketControl.next();

        callback(next);

        // TODO: Notify that there is a new ticket pendding assignment
        socket.broadcast.emit('pending-ticket', ticketControl.tickets.length);
    });

    socket.on('answer-ticket', ({ desktop }, callback) => {
        // console.log(payload);
        if (!desktop) {
            return callback({
                ok: false,
                msg: 'The desktop is obligatory'
            });
        }

        const ticket = ticketControl.answerTicket(desktop);

        // TODO: Notify change en the last four tickets
        socket.broadcast.emit('actual-status', ticketControl.lastFourTicketsServed);

        socket.emit('pending-ticket', ticketControl.tickets.length);
        socket.broadcast.emit('pending-ticket', ticketControl.tickets.length);

        if (!ticket) {
            return callback({
                ok: false,
                msg: 'There is no pending tickets'
            });
        } else {
            return callback({
                ok: true,
                ticket
            });
        }
    });
};

export {
    socketController
};