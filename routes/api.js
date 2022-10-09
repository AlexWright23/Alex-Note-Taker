const apiRouter = require('express') .Router()
const util = require('util')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const readFile = util.promisify(fs.readFile)


function getNotes() {
  return readFile('db/db.json', 'utf-8').then(origNotes => {
    let parsedNotes = [].concat(JSON.parse(origNotes))
    return parsedNotes;
  })
}
apiRouter.get('/api/notes', (req, res) => {
  getNotes().then(data => res.json(data))
})
apiRouter.post('/api/notes', (req, res) => {
  console.info(`Received ${req.method} request`)
  const { title, text } = req.body;
  const addNote = {
    title,
    text,
    id: uuidv4(),
  };

  getNotes().then(oldNotes => {
    let newNotes = [...oldNotes, addNote]
    fs.writeFile('./db/db.json', JSON.stringify(newNotes, null, 4), (err) => {
      res.json({msg:"Pog"});
      console.log(`Added note`)
    })
  })
});

apiRouter.delete('/api/notes/:id', (req, res) => {
  getNotes().then(oldNotes => {
      let sortedNotes = oldNotes.filter(note => note.id !== req.params.id)
      console.log(sortedNotes)
      fs.writeFile('./db/db.json', JSON.stringify(sortedNotes, null, 4), (err) => {
          res.json({msg:"Pog"});
        })
  })
});

module.exports = apiRouter
