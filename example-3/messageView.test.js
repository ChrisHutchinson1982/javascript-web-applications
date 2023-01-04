/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const MessageView = require("./messageView");

describe("MessageView", () => {
  it("clicks the button to show message", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");

    const view = new MessageView();

    const buttonEl = document.querySelector("#show-message-button");
    const inputEl = document.querySelector("#message-input");
    inputEl.value = "Some text in there";
    buttonEl.click();

    expect(document.querySelector("#message").textContent).toEqual(
      "Some text in there"
    );
    expect(document.querySelector("#message-input").value).toEqual("");
  });
  it("clicks the button to hide message", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");

    const view = new MessageView();

    // Show then hide message
    const buttonEl = document.querySelector("#show-message-button");
    buttonEl.click();
    const hideButtonEl = document.querySelector("#hide-message-button");
    hideButtonEl.click();

    // Assert that the message is not on the page
    expect(document.querySelector("#message")).toBeNull();
  });
});
