import { AppController } from '../controller/controller';
import AppView from '../view/appView';

class App {
  controller: AppController;
  view;

  constructor() {
    this.view = new AppView();
    this.controller = new AppController();
  }

  start(): void {
    this.view.drawView();
    const buttonGen = document.getElementById('button-make');
    const buttonSave = <HTMLButtonElement>document.getElementById('button-save');
    const { canvas, context } = this.controller.useCanvas();
    buttonGen?.addEventListener('click', () => {
      if (context) this.controller.fillTheSpace(context);
      if (buttonSave) buttonSave.disabled = false;
    });
    buttonSave?.addEventListener('click', () => {
      this.controller.saveImage(canvas);
    });
  }
}

export default App;
