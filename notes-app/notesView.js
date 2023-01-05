class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    this.mainContainerEl = document.querySelector("#main-container");
    this.buttonEl = document.querySelector("#add-note-button");

    this.buttonEl.addEventListener("click", () => {
      const newNote = document.querySelector("#note-input").value;
      this.addNewNote(newNote);
      document.querySelector("#note-input").value = "";
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
      console.log(callback);
      this.model.setNotes(callback);
      this.displayNotes();
    });
  }
}

module.exports = NotesView;
