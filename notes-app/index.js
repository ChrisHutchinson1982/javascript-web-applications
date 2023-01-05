const NotesClient = require("./notesClient");
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

console.log("The notes app is running");

const client = new NotesClient();
const model = new NotesModel();
// model.addNote("This is an example note");

const view = new NotesView(model, client);

// view.displayNotesFromApi();

// view.displayNotes();

// using fetch to make a call on http://localhost:3000/notes
// and console.log the result data

client.loadNotes(
  (notes) => {
    // This will be executed if notes are loaded correctly from the server
    model.setNotes(notes);
    view.displayNotes();
  },
  () => {
    // This will be executed if there's an error
    view.displayError();
  }
);
