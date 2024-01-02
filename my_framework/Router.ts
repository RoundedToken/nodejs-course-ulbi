import { IncomingMessage, ServerResponse } from 'http';

export type IncomingMessageMod = IncomingMessage & {
    body: string;
    pathname: string;
    params: URLSearchParams;
};

export type OutgoingMessage = ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
} & { send: (data: any) => void };

export type EndpointHandler = (req: IncomingMessageMod, res: OutgoingMessage) => void;
export type EndpointMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type RouterMethod = (path: string, handler: EndpointHandler) => void;
export type Endpoint = Record<EndpointMethod, EndpointHandler>;
export type Middleware = (req: IncomingMessageMod, res: OutgoingMessage) => void;

export class Router {
    public endpoints: Record<string, Endpoint>;
    public get: RouterMethod;
    public post: RouterMethod;
    public put: RouterMethod;
    public delete: RouterMethod;

    constructor() {
        this.endpoints = {};

        this.get = (path, handler) => {
            this.request('GET', path, handler);
        };
        this.post = (path, handler) => {
            this.request('POST', path, handler);
        };
        this.put = (path, handler) => {
            this.request('PUT', path, handler);
        };
        this.delete = (path, handler) => {
            this.request('DELETE', path, handler);
        };
    }

    private request(method: EndpointMethod, path: string, handler: EndpointHandler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {} as Endpoint;
        }

        const endpoint = this.endpoints[path];

        if (!endpoint[method]) {
            endpoint[method] = handler;
        } else {
            throw new Error('Endpoint method already used!');
        }
    }
}
