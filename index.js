require("dotenv").config();

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let cb = () => {
    console.log("Interval");
}

setInterval(cb, 30000);

console.log("Hello twitter!");