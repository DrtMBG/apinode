const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')
app.use(cors())
app.use(express.json())
app.use(logger)


//lst notes
let notes = [
    {
        id:3,
        content:"bebe hermonsa",
        date:"2022-01-28T13:30:35",
        important:true
    },
    {
        id:4,
        content:"mama",
        date:"2022-01-28T13:30:35",
        important:false
    },
    {
        id:5,
        content:"papa",
        date:"2022-01-28T13:30:35",
        important:true
    }
]

// const app = http.createServer((request,response) => {
//     response.writeHead(200,{'Content-Type':'application/json'})
//     // response.end('princesas las amo mucho')
//     //response.end(JSON.stringify(notes))
// })

//message init
app.get('/',(request,response)=>{
    response.send('<h1>mi familia<br> mama, bebe, papa, venus</h1>')
})

//get lst notes
app.get('/api/notes',(request,response)=>{
    response.json(notes)
})

//get note
app.get('/api/mensaje/:id',(request,response)=>{
    const id =  Number(request.params.id)
    const data = notes.find(notes => notes.id === id)

    if (data){
        response.json(data)
    }else{
        response.status(404).end()
    }
})

//delete note
app.delete('/api/mensaje/:id',(request,response)=>{
    const id =  Number(request.params.id)
    const data = notes.filter(notes => notes.id !== id)
    response.status(204).end()
})

//create note
app.post('/api/create',(request, response) => {
    const data = request.body

    if (!data || !data.content){
        return response.status(400).json({
           error: 'data.content is missing' 
        })
    }
    
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newClient = {
        id: maxId + 1,
        content: data.content,
        date: new Date().toISOString(),
        important: typeof data.important !== 'undefined' ? data.important : false
    }

    notes = notes.concat(newClient)
    console.log(data)
    response.status(201).json(newClient)
})

app.use((request,response)=>{
    response.status(404).json({
        error:'no found'
    })
})

const PORT = process.env.PORT || 3001

//const PORT = 3001
//app.listen(PORT)

app.listen(PORT, () => {
    console.log('server arriba las adoro ${PORT}')  
})
//console.log('las adoro ${PORT}')

