const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const dirTree = require('directory-tree')
const util = require('util');

app.use(cors())
app.use(express.json())

const nav_path = path.join(__dirname, 'Views')
// const nav_tree = getDirTree(nav_path).children

// const tree = dirTree(nav_path)

app.get('/directory', (req, res) => {
  try {
    if (module.parent == undefined) {
        // node dirTree.js ~/foo/bar
        // const result = util.inspect(getDirTree(nav_path), false, null)
        writeDirTree(getDirTree(nav_path).children)
        res.status(200).json(getDirTree(nav_path).children)
    }
    
  } catch (error) {
    console.log(error)
    throw error
  }
})

app.post('/navigation/update', (req, res) => {
  try {
    const data = req.body
    const phase = data.phase
    const group = data.group

    fs.access(path.join(nav_path, phase), function(error) {
      if (error) { fs.mkdir(path.join(nav_path, phase), err => { if(err) throw err }); }
    })

    group.forEach(g => {
      const gpath = path.join(nav_path, phase, g.name)
      fs.access(gpath, function(error) {
        if (error) { fs.mkdir(gpath, err => { if(err) throw err }); }
      })
      g.elements.forEach(el => {
        const elpath = path.join(nav_path, phase, g.name, el.name)
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

    res.status(200).send('OK')

  } catch (error) {
    console.log(error)
    throw error
  }
})

app.post('/delete', function (req, res) {
  try {
    const path_ = req.body.path
    fs.access(path_, function(error) {
      if (error) false
      else fs.rmdir(path_, err => {
        if (err) throw err
        writeDirTree(getDirTree(nav_path).children)
        res.status(200).json(getDirTree(nav_path).children)
      })
    })
  } catch (error) {
    console.log(error)
    throw error
  }
})

app.post('/create', function (req, res) {
  try {
    const type = req.body.type
    const set = req.body.path || nav_path
    const text = req.body.text || 'NewFolder'
    const path_ = path.join(set, text)

    fs.access(path_, function(error) {
      if (error) fs.mkdir(path.join(path_), err => {
        if(err) throw err
        writeDirTree(getDirTree(nav_path).children)
        res.status(200).json(getDirTree(nav_path).children)
      })
    })

  } catch (error) {
    console.log(error)
    throw error
  }
})


function getDirTree(filename) {
  const stats = fs.lstatSync(filename)
  const info = {
          path: filename,
          text: (path.basename(filename)).replace(/(\s*)/g, ''),
          cdate: new Date()
      }
  if (stats.isDirectory()) {
      info.type = "folder"
      info.children = fs.readdirSync(filename).map(function(child) {
          return getDirTree(filename + '/' + child)
      })
  } else {
      // Assuming it's a file. In real life it could be a symlink or
      // something else!
      info.type = "file"
  }
  return info
}

function writeDirTree(content) {
  fs.writeFile(path.join(nav_path, 'navigation.json'), JSON.stringify(content), (err) => {
    if (err) throw err
  })
}


app.listen(5000, () => {
  console.log('listen 5000...')
})