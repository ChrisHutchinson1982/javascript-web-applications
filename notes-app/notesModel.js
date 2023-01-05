class NotesModel {
  constructor() {
    this.list = [];
  }

  getNotes() {
    return this.list;
  }

  addNote(note) {
    this.list.push(note);
  }

  reset() {
    this.list = [];
  }

  setNotes(notes) {
    this.reset();
    notes.forEach((note) => {
      this.addNote(note);
    });
  }
}

module.exports = NotesModel;
