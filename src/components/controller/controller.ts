export class AppController {
  width = 796;
  height = 1200;
  positions = {
    type: 100,
    series: 50,
    title: 500,
    author: 1050,
    year: 1100,
  };
  bgColors = ['#BDFFED', '#C6D7FF', '#FBF7CE'];
  fillerColor = ['#A2D7C9', '#A4B6DF', '#DFD999'];
  getFields() {
    const type = <HTMLInputElement>document.getElementById('type-input');
    const series = <HTMLInputElement>document.getElementById('series-input');
    const title = <HTMLInputElement>document.getElementById('title-input');
    const author = <HTMLInputElement>document.getElementById('author-input');
    const year = <HTMLInputElement>document.getElementById('year-input');

    return {
      type: type?.value,
      series: series?.value,
      title: title?.value,
      author: author?.value,
      year: year?.value,
    };
  }

  useCanvas() {
    const container = document.querySelector('.results');
    const canvas = document.createElement('canvas');
    canvas.height = this.height;
    canvas.width = this.width;
    const context = canvas.getContext('2d');
    if (context) {
      context.textAlign = 'center';
      context.textBaseline = 'top';
    }
    container?.append(canvas);
    return { canvas, context };
  }

  fillTheSpace(context: CanvasRenderingContext2D) {
    const fields = this.getFields();
    context.font = 'sans-serif';
    const title = this.wrapWords(fields.title, context);
    console.log(title);

    const titleHeight = title.length * 48;
    this.generateRandColorspread(context, titleHeight);
    this.fillData(context, fields.type, 24, 'type');
    this.fillData(context, fields.series, 36, 'series');
    this.fillData(context, title, 48, 'title');
    this.fillData(context, fields.author, 36, 'author');
    this.fillData(context, fields.year, 24, 'year');
  }

  wrapWords(text: string, context: CanvasRenderingContext2D) {
    context.font = `bold 48px sans-serif`;

    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = context.measureText(currentLine + ' ' + word).width;
      console.log('measuring', currentLine + ' ' + word);

      console.log('width', width);

      if (width < 700) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    console.log(words.length);

    lines.push(currentLine);
    return lines;
  }

  fillData(
    context: CanvasRenderingContext2D,
    data: string | number | string[],
    fontSize: number,
    position: string,
    color?: string
  ) {
    context.font = `bold ${fontSize}px sans-serif`;
    if (color) context.fillStyle = color;
    context.fillStyle = '#100300';
    if (position === 'title') {
      const lines = data as string[];
      for (let i = 0; i < lines.length; i++) {
        context.fillText(
          lines[i],
          this.width / 2,
          this.positions[position as keyof typeof this.positions] + i * fontSize
        );
      }
    } else {
      context.fillText(
        position === 'author' ? `by ${data}` : data.toString(),
        this.width / 2,
        this.positions[position as keyof typeof this.positions]
      );
    }
  }

  generateRandColorspread(context: CanvasRenderingContext2D, titleHeight?: number) {
    const num = this.getRandomNum(this.bgColors.length);
    const bgColor = this.bgColors[num];
    const fillColor = this.fillerColor[num];
    context.fillStyle = bgColor;
    context.fillRect(0, 0, this.width, this.height);

    if (titleHeight) {
      context.fillStyle = fillColor;
      context.fillRect(0, 500 - 25, this.width, titleHeight + 50);
    }
  }

  getRandomNum(length: number) {
    return Math.floor(Math.random() * length);
  }

  saveImage(canvas: HTMLCanvasElement) {
    canvas.toBlob((blob) => {
      if (blob) {
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'cover.jpg';
        link.click();
      }
    }, 'image/jpeg');
  }
}
