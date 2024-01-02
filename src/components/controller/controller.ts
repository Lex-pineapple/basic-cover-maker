import { IBckgColorData, IColorData, IFieldData } from '../../types';

export class AppController {
  getFields(): IFieldData {
    const type = <HTMLInputElement>document.getElementById('type-input');
    const series = <HTMLInputElement>document.getElementById('series-input');
    const title = <HTMLInputElement>document.getElementById('title-input');
    const author = <HTMLInputElement>document.getElementById('author-input');
    const year = <HTMLInputElement>document.getElementById('year-input');
    const dimensions = <HTMLSelectElement>document.getElementById('dimensions-input');
    const design = <HTMLSelectElement>document.getElementById('design-input');
    const width = dimensions.value.split('x')[0];
    const height = dimensions.value.split('x')[1];
    const background = this.getBackgroundValues();

    return {
      type: type.value || 'Fanworks',
      series: series.value || '',
      title: title.value || '',
      author: author.value || '',
      year: year.value || '',
      width: parseInt(width) * 120 || 7 * 120,
      height: parseInt(height) * 120 || 10 * 120,
      design: design.value,
      background,
    };
  }

  getBackgroundOrigin() {
    if (document.getElementById('solid-color')?.classList.contains('active')) return 'solid';
    if (document.getElementById('gradient')?.classList.contains('active')) return 'gradient';
    if (document.getElementById('flickr')?.classList.contains('active')) return 'flickr';
    if (document.getElementById('local-img')?.classList.contains('active')) return 'local';
    return 'solid';
  }

  getBackgroundValues(): IBckgColorData {
    switch (this.getBackgroundOrigin()) {
      case 'solid':
        return {
          type: 'solid',
          value: this.getColorValue('solid'),
        };
        break;
      case 'gradient':
        return {
          type: 'gradient',
          value: this.getColorValue('gradient'),
        };
        break;
      // case 'flickr':
      //   return {
      //     type: 'image',
      //     value: 'NULL',
      //   };
      //   break;
      // case 'local':
      // return {
      //   type: 'image',
      //   value: 'NULL',
      // };
      default:
        return {
          type: 'solid',
          value: [
            {
              type: 'color',
              value: '#FFFFFF',
            },
          ],
        };
        break;
    }
  }

  getColorValue(type: string): IColorData[] {
    if (type === 'solid') {
      const solidColor = <HTMLInputElement>document.getElementById('color-input-bckg');
      if (solidColor.value)
        return [
          {
            type: 'color',
            value: solidColor.value,
          },
        ];
    } else if (type === 'gradient') {
      const gradientElements = <NodeListOf<HTMLInputElement>>document.querySelectorAll('.input-color-grad');
      const gradientValues = [];
      for (let i = 0; i < gradientElements.length; i++) {
        gradientValues.push(gradientElements[i].value);
      }
      if (gradientValues.length !== 0)
        return gradientValues.map((value) => {
          return {
            type: 'color',
            value: value,
          };
        });
    }
    return [
      {
        type: 'color',
        value: '#FFFFFF',
      },
    ];
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
