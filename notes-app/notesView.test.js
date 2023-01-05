/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesClient = require("./notesClient");
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

jest.mock("./notesClient");

describe("Notes view", () => {
  let client, model, view;
  beforeEach(() => {
    NotesClient.mockClear();
    document.body.innerHTML = fs.readFileSync("./index.html");
    client = new NotesClient();
    model = new NotesModel();
    view = new NotesView(model, client);
  });

  it("displays 2 notes", () => {
    model.addNote("Buy milk");
    model.addNote("Go to the gym");

    view.displayNotes();

    expect(document.querySelectorAll(".note").length).toBe(2);
  });
  it("clicks the button to show the note", () => {
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
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Some text in there";

    const buttonEl = document.querySelector("#add-note-button");
    buttonEl.click();
    buttonEl.click();

    expect(document.querySelectorAll(".note").length).toBe(2);
  });
  it("after button click reset text input to empty value", () => {
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Some text in there";

    const buttonEl = document.querySelector("#add-note-button");
    buttonEl.click();

    expect(document.querySelector("#note-input").value).toBe("");
  });
  it("displays notes from server", () => {
    client.loadNotes.mockImplementation((callback) => {
      callback(["This note is coming from the server"]);
    });

    view.displayNotesFromApi();

    expect(client.loadNotes).toHaveBeenCalled();
    expect(model.getNotes()).toEqual(["This note is coming from the server"]);
  });

  it("clicks the button to save the note to server", () => {
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Some text in there";

    const buttonEl = document.querySelector("#add-note-button");
    buttonEl.click();

    expect(client.createNote).toHaveBeenCalledTimes(1);
  });

  it("displays error message on page", () => {
    view.displayError();
    expect(document.querySelector("#error").textContent).toBe(
      "Oops, something went wrong!"
    );
  });

  it("displays error message on page", () => {
    const buttonEl = document.querySelector("#delete-all-notes-button");
    buttonEl.click();

    expect(client.deleteNotes).toHaveBeenCalled();

    expect(model.getNotes().length).toBe(0);
    expect(document.querySelectorAll(".note").length).toBe(0);
  });
});
