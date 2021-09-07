const express = require('express')
const app = express()

module.exports = () => {
    app.get('/', (req, res) => {
        res.send('https://youtube.com/c/NotTCA :)')
    })

    app.listen(3000)
}