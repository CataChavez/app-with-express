const express = require ('express')
const path = require('path')
const app = express()

app.listen(3000, () => {
    console.log('Servidor en puerto 3000')
})

const users = ['fanny', 'hector', 'catty']

app.use(express.static('assets'))

app.get('/abracadabra/usuarios', (req, res) => {
	res.send(users)
})

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const name = users.includes(req.params.usuario)
    if (name){
       next()
   }else{
       res.sendFile(path.join(__dirname + '/assets/who.jpeg'))
   }    
})

app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use('/abracadabra/conejo/:n', (req, res, next) => {
    const num = Math.floor(Math.random() * 4) + 1
    const numparam = Number(req.params.n)
    if (num === numparam){
        res.sendFile(path.join(__dirname + '/assets/conejito.jpg'))
    }else{
        res.sendFile(path.join(__dirname + '/assets/voldemort.jpg'))
    } 
})

app.get('*', (req, res) => {
	res.send('<center><h1>Esta página no existe</h1></center>')
})
