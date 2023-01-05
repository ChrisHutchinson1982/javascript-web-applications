class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    this.mainContainerEl = document.querySelector("#main-container");
    this.buttonEl = document.querySelector("#add-note-button");
    this.deleteButtonEl = document.querySelector("#delete-all-notes-button");

    const newNote = document.querySelector("#note-input");

    this.buttonEl.addEventListener("click", () => {
      this.addNewNote(newNote.value);
      this.client.createNote(newNote.value, () => {
        this.displayError();
      });
      newNote.value = "";
    });

    this.deleteButtonEl.addEventListener("click", () => {
      this.client.deleteNotes(() => {
        this.displayError();
      });
      this.model.reset();
      this.displayNotes();
    });
  }

  addNewNote(newNote) {
    this.model.addNote(newNote);
    this.displayNotes();
  }

  displayNotes() {
    // 1. Remove all previous notes
    document.querySelectorAll(".note").forEach((note) => {
      note.remove();
    });

    const notes = this.model.getNotes();

    // For each note, create and append a new element on the main container
    notes.forEach((note) => {
      const newNote = document.createElement("div");
      newNote.className = "note";
      newNote.textContent = note;
      this.mainContainerEl.append(newNote);
    });
  }

  displayNotesFromApi() {
    this.client.loadNotes((callback) => {
      this.model.setNotes(callback);
      this.displayNotes();
    });
  }

  displayError() {
    const errorMessage = document.createElement("div");
    errorMessage.id = "error";
    errorMessage.textContent = "Oops, something went wrong!";
    this.mainContainerEl.append(errorMessage);
  }
}

module.exports = NotesView;
