import { IncomingMessageMod, OutgoingMessage } from './Router';

export function parseUrl(baseUrl: string) {
    return (req: IncomingMessageMod, res: OutgoingMessage) => {
        const parsedUrl = new URL(req.url || '', baseUrl);

        req.pathname = parsedUrl.pathname;
        req.params = parsedUrl.searchParams;
    };
}
