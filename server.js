require('dotenv').config();
const app = require('./app.js');
const cors = require('cors');

const host = process.env.HOST;
const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}));


app.get('', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})