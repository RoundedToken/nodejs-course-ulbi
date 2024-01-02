const path = require('path');
const fsP = require('fs/promises');

console.log('START');

(async function () {
    await fsP.mkdir(path.resolve(__dirname, 'dir2', 'dir3'), { recursive: true });
    console.log('OKEY');
})();

const p = Promise.resolve().then(console.log('!!'));
p.then(console.log('HERE!'));

const pro = new Promise((resolve) => resolve('____'));
pro.then((v) => console.log(v));

console.log('END');
