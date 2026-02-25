const http = require('http');
const req = http.request({
    method: 'OPTIONS',
    hostname: 'localhost',
    port: 8000,
    path: '/api/v1/users/register',
    headers: {
        'Origin': 'http://localhost:5175',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type'
    }
}, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);
});
req.on('error', (e) => {
    console.error(e);
});
req.end();
