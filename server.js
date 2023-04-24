require('dotenv').config()
const app = require('./app.js')


const host = process.env.HOST;
const port = process.env.PORT;



app.get('', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})