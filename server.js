const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const path = require('path')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('express test')
})

app.post('/navigation/update', (req, res) => {
  try {
    const navItem = req.body
    const dir = path.join(__dirname, 'Views')
    
    // make directory
    // for(let i = 0; i<=navItem.length -1 ; i++) {
    //   console.log(path.join(dir, navItem[i].phase))
    //   fs.mkdir(path.join(dir, navItem[i].phase), err => { if(err) throw err })
    // }

    fs.readdir(dir, (err, files) => {
      if(err) throw err
      const result = { "files": files}
      console.log(result)
      res.status(200).json(result)
    })
    
  } catch (error) {
    console.log(error)
    throw error
  }
})

app.listen(5000, () => {
  console.log('listen 5000...')
})