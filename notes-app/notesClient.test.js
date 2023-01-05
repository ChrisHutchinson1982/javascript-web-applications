const NotesClient = require("./notesClient");

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require("jest-fetch-mock").enableMocks();

describe("NoteClient class", () => {
  it("calls fetch and loads data", (done) => {
    const client = new NotesClient();

    fetch.mockResponseOnce(
      JSON.stringify(["This note is coming from the server"])
    );

    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi[0]).toBe(
        "This note is coming from the server"
      );
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/notes");

      done();
    });
  });
});
