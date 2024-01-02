import { GradientPicker } from '../../utils/gradientPicker';

export class AppController {
  gradPicker: GradientPicker;
  constructor() {
    this.gradPicker = new GradientPicker();
  }
  getFields() {
    const type = <HTMLInputElement>document.getElementById('type-input');
    const series = <HTMLInputElement>document.getElementById('series-input');
    const title = <HTMLInputElement>document.getElementById('title-input');
    const author = <HTMLInputElement>document.getElementById('author-input');
    const year = <HTMLInputElement>document.getElementById('year-input');
    const dimensions = <HTMLSelectElement>document.getElementById('dimensions-input');
    const design = <HTMLSelectElement>document.getElementById('design-input');
    const width = dimensions.value.split('x')[0];
    const height = dimensions.value.split('x')[1];
    const bckg = this.desideBckg();

    return {
      type: type.value || 'Fanworks',
      series: series.value || '',
      title: title.value || '',
      author: author.value || '',
      year: year.value || '',
      width: parseInt(width) * 120 || 7 * 120,
      height: parseInt(height) * 120 || 10 * 120,
      design: design.value,
    };
  }

  initGradientPicker() {
    this.gradPicker.init();
  }

  desideBckg() {
    const localImgCheckbox = <HTMLInputElement>document.getElementById('local-img');
    if (localImgCheckbox.checked) return 'local';
    if (document.getElementById('solid-color')?.classList.contains('active')) return 'solid';
    if (document.getElementById('gradient')?.classList.contains('active')) return 'gradient';
    if (document.getElementById('flickr')) return 'flickr';
    return 'none';
  }

  saveImage(canvas: HTMLCanvasElement | null) {
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const data = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = data;
          link.download = 'cover.jpg';
          link.click();
        }
      }, 'image/jpeg');
    } else alert('Could not save the cover');
  }
}
