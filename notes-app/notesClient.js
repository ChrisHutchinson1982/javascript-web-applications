class NotesClient {
  loadNotes(callback, errorCallback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((responseData) => {
        callback(responseData);
      })
      .catch((error) => {
        errorCallback(error);
      });
  }

  createNote(note, errorCallback) {
    const data = { content: note };
    fetch("http://localhost:3000/notes", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        errorCallback(error);
      });
  }

  deleteNotes(errorCallback = () => {}) {
    fetch("http://localhost:3000/notes", {
      method: "DELETE", // or 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        errorCallback(error);
      });
  }
}

module.exports = NotesClient;
