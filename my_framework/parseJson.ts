import { IncomingMessage } from 'http';
import { OutgoingMessage } from './Router';

export function parseJson(req: IncomingMessage, res: OutgoingMessage) {
    res.send = (data) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    };
}
