const { addNewNote, getNote, updateNote, updateNewNoteItem, deleteNewNoteItem } = require("../controllers/NoteController");

const Router = require("express").Router()

Router.post("/delete_note_text", deleteNewNoteItem)
Router.post("/newNoteItem", updateNewNoteItem)
Router.post("/", addNewNote)
Router.put("/", updateNote)
Router.get("/", getNote)


module.exports = Router;