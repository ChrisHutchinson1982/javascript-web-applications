/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

describe("Notes view", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("displays 2 notes", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote("Buy milk");
    model.addNote("Go to the gym");

    view.displayNotes();

    expect(document.querySelectorAll(".note").length).toBe(2);
  });
  it("clicks the button to show the note", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Some text in there";

    const buttonEl = document.querySelector("#add-note-button");
    buttonEl.click();

    expect(document.querySelectorAll(".note").length).toBe(1);
    expect(document.querySelectorAll(".note")[0].textContent).toEqual(
      "Some text in there"
    );
  });
  it("clicks the button twice display two notes", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Some text in there";

    const buttonEl = document.querySelector("#add-note-button");
    buttonEl.click();
    buttonEl.click();

    expect(document.querySelectorAll(".note").length).toBe(2);
  });
  it("after button click reset text input to empty value", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Some text in there";

    const buttonEl = document.querySelector("#add-note-button");
    buttonEl.click();

    expect(document.querySelector("#note-input").value).toBe("");
  });
});
