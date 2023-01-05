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
  it("createNote adds a note to the database", () => {
    const client = new NotesClient();

    fetch.mockResponseOnce(JSON.stringify("New Note"));

    client.createNote("New Note");

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/notes",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "New Note" }),
      })
    );
  });
  it("loadNotes catched fetch error", (done) => {
    const client = new NotesClient();

    fetch.mockRejectedValue("Oops, something went wrong!");

    client.loadNotes(
      () => {},
      (error) => {
        expect(error).toBe("Oops, something went wrong!");
        done();
      }
    );
  });

  it("deletes all notes on the database", () => {
    const client = new NotesClient();

    client.deleteNotes();

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/notes",
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });

  it("throws an error for deleteNotes", (done) => {
    const client = new NotesClient();

    fetch.mockRejectedValue("Oops, something went wrong!");

    client.deleteNotes((error) => {
      expect(error).toBe("Oops, something went wrong!");
      done();
    });
  });

  // it("calls fetch and returns emoify data", (done) => {
  //   const client = new NotesClient();

  //   fetch.mockResponseOnce({
  //     status: "OK",
  //     text: "Hello, :earth_africa:",
  //     emojified_text: "Hello, :earth_africa:"
  //     })
  //   );

  //   client.emoifyNote("Hello, :earth_africa:");

  //   expect(fetch).toHaveBeenCalledWith(
  //     "https://makers-emojify.herokuapp.com/",
  //     expect.objectContaining({
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ text: "Hello, :earth_africa:"}),
  //     })
  //   );
});
