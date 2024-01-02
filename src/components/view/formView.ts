export class FormView {
  draw() {
    this.attachListener();
  }

  createColorSelector() {
    const container = document.querySelector('.bkg-img-sources-container');
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.id = 'color-input';
    container?.append(colorInput);
  }

  attachListener() {
    const spoiler = <HTMLElement>document.querySelector('.spoiler-container');
    const content = <HTMLElement>document.querySelector('.additional-container');
    if (spoiler) {
      spoiler.addEventListener('click', () => {
        this.toggleSpoiler(content);
      });
    }
  }

  toggleSpoiler(content: HTMLElement) {
    if (content.classList.contains('active')) {
      content.style.maxHeight = '0';
      content.classList.remove('active');
    } else {
      content.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
    console.log('clicked');
  }
}
