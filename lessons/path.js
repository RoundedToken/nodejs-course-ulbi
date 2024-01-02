const url = 'http://localhost:5000/users?id=123';

const urlObj = new URL(url);
console.log(urlObj.searchParams.entries());
