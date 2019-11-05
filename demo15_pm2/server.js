const fastify = require('fastify')();

fastify.get('/', async function() {
    return {
        status: 'OK'
    };
});

fastify.listen(8888);
console.log('http://localhost:8888');
