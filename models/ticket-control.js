import * as db from '../db/data.json' assert { type: 'json' };

import fs from 'fs';
import { __dirname, path } from '../helpers/dirname.js';

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        // number of the last created ticket
        this.last = 0;

        let now = new Date();
        this.today = [
            `${now.getFullYear()}`,
            `${(now.getMonth() < 10)
                ? '0' + (now.getMonth() + 1)
                : now.getMonth() + 1}`,
            `${(now.getDay() < 10)
                ? '0' + now.getDay()
                : now.getDay()}`
        ].join(''); // 20220804

        this.tickets = [];

        this.lastFourTicketsServed = [];

        this.init();
    }

    get toJson() {
        return {
            'last': this.last,
            'today': this.today,
            'tickets': this.tickets,
            'lastFourTicketsServed': this.lastFourTicketsServed
        }
    }

    init() {
        console.log(db);
        const { last, today, tickets, lastFourTicketsServed } = db.default;

        // console.log('today: ', today);
        // console.log('this.today: ', this.today);

        if (today === this.today) {
            this.tickets = tickets;
            this.last = last;
            this.lastFourTicketsServed = lastFourTicketsServed;
        } else {
            // if its a new day, we reset the data
            this.saveDb();
        }
    }

    saveDb() {
        const dbPath = path.join(__dirname, '../db/data.json');

        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    next() {
        this.last += 1;
        const ticket = new Ticket(this.last, null);

        this.tickets.push(ticket);

        this.saveDb();

        return 'Ticket ' + ticket.number;
    }

    answerTicket(desktop) {
        // There are no tickets
        if (this.tickets.length === 0) {
            return null;
        }

        // Remove the first ticket
        const ticket = this.tickets.shift(); // this.tickets[0];

        ticket.desktop = desktop;

        // We add the ticket at the beginning
        this.lastFourTicketsServed.unshift(ticket);

        // Remove the last elements if there are 4 o more
        if (this.lastFourTicketsServed.length > 4) {
            this.lastFourTicketsServed.splice(4);
        }

        console.log(this.lastFourTicketsServed);

        this.saveDb();

        return ticket;
    }
}

export default TicketControl;