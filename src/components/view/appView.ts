import { IFieldData } from '../../types';
import { CoverView } from './cover/coverView';
import { FormView } from './formView';

export class AppView {
  readonly formView;
  readonly coverView;
  constructor() {
    // super();
    this.formView = new FormView();
    this.coverView = new CoverView();
  }

  drawView(fieldData: IFieldData) {
    this.formView.draw();
    this.coverView.useCanvas(fieldData);
  }

  generateCover(data: IFieldData) {
    this.coverView.generate(data);
  }
}

export default AppView;
