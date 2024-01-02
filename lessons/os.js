const os = require('os');
const cluster = require('cluster');

const cpus = os.cpus();

if (cluster.isMaster) {
    console.log(`Мастер ${process.pid} запущен`);
    for (let i = 0; i < cpus.length - 2; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
        cluster.fork();
    });
} else {
    console.log(`Процесс ${process.pid} запущен`);

    setInterval(() => console.log(`Процесс ${process.pid} еще жив`), 3000);
}
