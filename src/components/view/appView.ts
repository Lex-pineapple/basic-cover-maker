import { FormView } from './formView';

export class AppView {
  readonly formView;

  constructor() {
    // super();
    this.formView = new FormView();
  }

  drawView() {
    this.formView.draw();
  }
}

export default AppView;
