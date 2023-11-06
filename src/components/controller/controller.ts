export class AppController {
  getFields() {
    const type = <HTMLInputElement>document.getElementById('type-input');
    const series = <HTMLInputElement>document.getElementById('series-input');
    const title = <HTMLInputElement>document.getElementById('title-input');
    const author = <HTMLInputElement>document.getElementById('author-input');
    const year = <HTMLInputElement>document.getElementById('year-input');
    const width = <HTMLInputElement>document.getElementById('width-input');
    const height = <HTMLInputElement>document.getElementById('height-input');

    return {
      type: type.value || 'Fanworks',
      series: series.value || '',
      title: title.value || '',
      author: author.value || '',
      year: year.value || '',
      width: parseInt(width.value) || 796,
      height: parseInt(height.value) || 1200,
    };
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
