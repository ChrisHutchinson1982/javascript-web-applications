class View {
  constructor() {
    this.mainContainerEl = document.querySelector("#main-container");
    console.log(this.mainContainerEl);
  }

  addParagraph() {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = "something new";
    this.mainContainerEl.append(newParagraph);
  }

  clearParagraphs() {
    const allParagraphEl = document.querySelectorAll("p");
    allParagraphEl.forEach((paragraph) => {
      paragraph.remove();
    });
  }
}

module.exports = View;
