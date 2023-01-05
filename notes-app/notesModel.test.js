const NotesModel = require("./notesModel");

describe("NotesModel", () => {
  it("returns an empty array", () => {
    const model = new NotesModel();

    expect(model.getNotes()).toEqual([]);
  });

  it("returns the correct list", () => {
    const model = new NotesModel();

    model.addNote("Buy milk");
    model.addNote("Go to the gym");

    expect(model.getNotes()).toEqual(["Buy milk", "Go to the gym"]);
  });

  it("resets the array", () => {
    const model = new NotesModel();

    model.addNote("Buy milk");
    model.addNote("Go to the gym");
    model.reset();
    expect(model.getNotes()).toEqual([]);
  });
  it("setNotes replaces notes to the array", () => {
    const model = new NotesModel();

    model.addNote("Buy milk");
    model.setNotes(["Buy milk", "Go to the gym"]);

    expect(model.getNotes()).toEqual(["Buy milk", "Go to the gym"]);
  });
});
