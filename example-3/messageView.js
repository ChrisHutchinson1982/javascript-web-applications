class MessageView {
  constructor() {
    this.buttonEl = document.querySelector("#show-message-button");
    this.hideButtonEl = document.querySelector("#hide-message-button");

    this.buttonEl.addEventListener("click", () => {
      this.displayMessage();
    });
    this.hideButtonEl.addEventListener("click", () => {
      this.hideMessage();
    });
  }

  displayMessage() {
    const messageElement = document.createElement("div");
    messageElement.id = "message";
    messageElement.textContent = "This message displayed by JavaScript";

    document.querySelector("#main-container").append(messageElement);
  }

  hideMessage() {
    document.querySelector("#message").remove();
  }
}

module.exports = MessageView;
