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
    const fieldData = this.controller.getFields();
    this.controller.initGradientPicker();
    this.view.drawView(fieldData);
    this.addListeners();
  }

  addListeners() {
    const buttonGen = document.getElementById('button-make');
    const buttonSave = <HTMLButtonElement>document.getElementById('button-save');
    buttonGen?.addEventListener('click', () => {
      this.view.generateCover(this.controller.getFields());
      if (buttonSave) buttonSave.disabled = false;
    });
    buttonSave?.addEventListener('click', () => {
      this.controller.saveImage(this.view.coverView.getCanvas());
    });
  }
}

export default App;
