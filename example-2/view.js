class View {
  constructor() {
    this.mainContainerEl = document.querySelector("#main-container");
    this.allParagraphEl = document.querySelectorAll("p");
    console.log(this.mainContainerEl);
  }

  addParagraph() {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = "something new";
    this.mainContainerEl.append(newParagraph);
  }

  clearParagraphs() {
    this.allParagraphEl.forEach((paragraph) => {
      paragraph.remove();
    });
  }
}

module.exports = View;
