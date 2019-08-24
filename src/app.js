const express = require('express')
const app = express()

const data = require('./../data/api')

app.get('/', (req, res) => {
    res.send('<h2>King of the Hill Quote API</h2>')
})

app.get('/koth-quote', (req, res) => {
    //Sending all quotes
    if(req.query.all){
        res.send(data)
    }
    
    //Optional number quotes
    if(req.query.count > 0){
        const count = req.query.count
        const slicedQuotes = data.slice(0, count)

        res.send(slicedQuotes)
    }

    //Specific character quotes
    if(req.query.character){
        const character = req.query.character.toLowerCase()

        const characterQuotes = data.filter((item) => {
            let trimmedCharacter = item.character.replace(/\s+/g, '').toLowerCase()
            if(trimmedCharacter === character){
                return item
            }
        })

        res.send(characterQuotes)

    }

    //Else just send random quote
    const quote = data[Math.floor(Math.random()*data.length)]
    res.send(quote)

})


const PORT = 3000 || process.env
app.listen(3000, () => {
    console.log('server is up!')
})