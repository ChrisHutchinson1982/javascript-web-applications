const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

console.log("The notes app is running");

const model = new NotesModel();
// model.addNote("This is an example note");

const view = new NotesView(model);

// view.displayNotes();

// using fetch to make a call on http://localhost:3000/notes
// and console.log the result data

const getRepoInfo = (callback) => {
  fetch("http://localhost:3000/notes")
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    });
};

getRepoInfo((repoData) => {
  console.log(repoData);
});
