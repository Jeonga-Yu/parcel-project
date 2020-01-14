const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

app.use(cors())
app.use(express.json())

const navdir = path.join(__dirname, 'Views')

app.get('/', (req, res) => {
  res.send('express test')
})

app.post('/navigation/update', (req, res) => {
  try {
    const data = req.body
    const phase = data.phase
    const group = data.group

    // console.log(group)

    group.forEach(g => {
      const gpath = path.join(navdir, phase, g.name)
      fs.access(gpath, function(error) {
        if (error) { fs.mkdir(gpath, err => { if(err) throw err }); }

      })
      g.elements.forEach(el => {
        const elpath = path.join(navdir, phase, g.name, el.name)
        fs.access(elpath, function(error) {
          if (error) {
            // console.log("Directory does not exist.")
            fs.mkdir(elpath, err => { if(err) throw err });
          } else {
            // console.log("Directory exists.")
          }
        })
      })

    })

    // read /Views
    fs.readdir(path.join(navdir, phase), (err, glocal) => {
      if (err) throw err;

      //req group의 elements는 비어있고 local 폴더 아래폴더는 안비어있을 때 아래폴더들 삭제
      glocal.forEach(el => {
        group.forEach(g => {
          // console.log(g)
          // console.log(el.elements)
          if (g.name === el) {
            // console.log(el)
            let minidir
            
            g.elements.forEach(e => {
              console.log(e.name)
              //req dir
              minidir = path.join(navdir, g.name, e.name)
              console.log(minidir)
            })
          }
        })
      })
      

    })


    res.status(200).send('OK')

  } catch (error) {
    console.log(error)
    throw error
  }
})

app.post('/delete', function (req, res) {
  try {
    const dir = req.body.dir
    console.log(dir)
    fs.access(dir, function(error) {
      if (error) false
      else fs.rmdir(path.join(navdir, dir), err => { if (err) throw err })
    })
    fs.rmdir(path.join(navdir, dir), err => { if (err) throw err })
    res.status(200).send('Got a DELETE request at /delete'); 
  } catch (error) {
    console.log(error)
    throw error
  }
})

app.post('/create', function (req, res) {
  try {
    const dir = req.body.dir
    console.log(dir)
    fs.access(dir, function(error) {
      if (error) fs.mkdir(path.join(navdir, dir), err => { if(err) throw err })
    })
    res.status(200).send('Got a CREATE request at /create'); 
  } catch (error) {
    console.log(error)
    throw error
  }
})

app.listen(5000, () => {
  console.log('listen 5000...')
})