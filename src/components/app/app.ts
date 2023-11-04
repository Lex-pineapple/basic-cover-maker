import { AppController } from '../controller/controller';

class App {
    controller: AppController;

    constructor() {
        this.controller = new AppController();
    }

    start(): void {
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
