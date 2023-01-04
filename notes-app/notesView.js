class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector("#main-container");
  }

  displayNotes() {
    const notes = this.model.getNotes();

    notes.forEach((note) => {
      const newNote = document.createElement("div");
      newNote.className = "note";
      newNote.textContent = note;
      this.mainContainerEl.append(newNote);
    });
  }
}

module.exports = NotesView;
