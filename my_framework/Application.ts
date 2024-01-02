import EventEmitter from 'events';
import http from 'http';
import { EndpointMethod, Middleware, Router } from './Router';

export class Application {
    private emitter = new EventEmitter();
    private server = this.createServer();
    private middlewares: Middleware[] = [];

    use(middleware: Middleware) {
        this.middlewares.push(middleware);
    }

    listen(port: number, callback?: () => void) {
        this.server.listen(port, callback);
    }

    addRouter(router: InstanceType<typeof Router>) {
        const endpoints = router.endpoints;

        Object.keys(endpoints).forEach((path) => {
            const endpoint = endpoints[path];

            const methods = Object.keys(endpoint) as EndpointMethod[];
            methods.forEach((method) => {
                const handler = endpoint[method];

                this.emitter.on(this.getRouteMask(path, method), (req, res) => {
                    handler(req, res);
                });
            });
        });
    }

    private createServer() {
        return http.createServer((req, res) => {
            let body = '';

            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
                //@ts-ignore
                req.body = JSON.parse(body || '{}');
                //@ts-ignore
                this.middlewares.forEach((middleware) => middleware(req, res));

                const emitted = this.emitter.emit(
                    //@ts-ignore
                    this.getRouteMask(req.pathname, req.method as EndpointMethod),
                    req,
                    res
                );

                if (!emitted) {
                    res.writeHead(500, 'text/html');
                    res.end('<h1>Endpoint not found!</h1>');
                }
            });
        });
    }

    private getRouteMask(path?: string, method?: EndpointMethod) {
        return `[${path}][${method}]`;
    }
}
