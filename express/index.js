const express = require('express')

const app = express()
const port = 3000

const jsonplaceholderdomain = 'https://jsonplaceholder.typicode.com'
const jsonplaceholdertodos = jsonplaceholderdomain + '/todos'

app.use(express.json())

app.post('/todos', (req, res) => {
    res.sendStatus(501)
})

app.get('/todos', (req, res) => {
    fetch(jsonplaceholdertodos)
        .then(result => result.json())
        .then(data => res.json(data))
        .catch(err => res.sendStatus(503))
})

app.get('/todos/:id', (req, res) => {
    fetch(`${jsonplaceholdertodos}/${req.params.id}`)
        .then(result => result.json())
        .then(data => res.json(data))
        .catch(err => res.sendStatus(503))
})

app.put('/todos/:id', (req, res) => {
    res.sendStatus(501)
})

app.patch('/todos/:id', (req, res) => {
    res.sendStatus(501)
})

app.delete('/todos/:id', (req, res) => {
    res.sendStatus(501)
})

app.all('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(port, () => {
    console.log(`Express running on port: ${port}`)
})
