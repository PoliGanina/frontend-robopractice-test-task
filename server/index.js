const express = require('express')
const app = express()
const port = 8080

app.get('/api/users', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //* можно обращаться к api откуда угодно, CORS
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  res.send(
      require('./data.json')
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
