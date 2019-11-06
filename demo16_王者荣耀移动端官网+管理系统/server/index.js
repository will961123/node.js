const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(__dirname + '/uploads'));

require('./plugins/db.js')(app);

require('./routers/admin')(app);

app.listen(8888);
console.log('htpp://localhost:8888');
