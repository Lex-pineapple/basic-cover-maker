import { IFieldData } from '../../../types';

export class CoverView {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  positions = {
    type: 100,
    series: 50,
    title: 500,
    author: 1050,
    year: 1100,
  };
  bgColors = ['#BDFFED', '#C6D7FF', '#FBF7CE'];
  fillerColor = ['#A2D7C9', '#A4B6DF', '#DFD999'];

  constructor() {
    this.canvas = null;
    this.context = null;
    this.width = 0;
    this.height = 0;
  }

  getCanvas() {
    return this.canvas;
  }

  generate(data: IFieldData) {
    this.updateDimensions(data.height, data.width);
    console.log(this.canvas);

    if (this.context) this.fillTheSpace(data, this.context);
  }

  updateDimensions(height: number, width: number) {
    console.log(this.height !== height || this.width !== width, this.height, height, this.width, width);
    if (this.height !== height || this.width !== width) {
      this.height = height;
      this.width = width;
      if (this.canvas) {
        this.canvas.height = height;
        this.canvas.width = width;
      }
    }
  }

  useCanvas(data: IFieldData) {
    const container = document.querySelector('.results');
    const canvas = document.createElement('canvas');
    console.log('data', data);
    canvas.height = this.height;
    canvas.width = this.width;
    const context = canvas.getContext('2d');
    if (context) {
      context.textAlign = 'center';
      context.textBaseline = 'top';
    }
    container?.append(canvas);
    this.canvas = canvas;
    this.context = context;
  }

  fillTheSpace(data: IFieldData, context: CanvasRenderingContext2D) {
    context.font = 'sans-serif';
    const title = this.wrapWords(data.title, context);
    const titleHeight = title.length * 48;
    this.generateRandColorspread(data, context, titleHeight);
    this.fillContent(data, context, data.type, 24, 'type');
    this.fillContent(data, context, data.series, 36, 'series');
    this.fillContent(data, context, title, 48, 'title');
    this.fillContent(data, context, data.author, 36, 'author');
    this.fillContent(data, context, data.year, 24, 'year');
  }

  wrapWords(text: string, context: CanvasRenderingContext2D) {
    context.font = `bold 48px sans-serif`;

    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = context.measureText(currentLine + ' ' + word).width;
      if (width < 700) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  fillContent(
    data: IFieldData,
    context: CanvasRenderingContext2D,
    content: string | number | string[],
    fontSize: number,
    position: string,
    color?: string
  ) {
    context.font = `bold ${fontSize}px sans-serif`;
    if (color) context.fillStyle = color;
    context.fillStyle = '#100300';
    if (position === 'title') {
      const lines = content as string[];
      for (let i = 0; i < lines.length; i++) {
        context.fillText(
          lines[i],
          data.width / 2,
          this.positions[position as keyof typeof this.positions] + i * fontSize
        );
      }
    } else {
      context.fillText(
        position === 'author' ? `by ${content}` : content.toString(),
        data.width / 2,
        this.positions[position as keyof typeof this.positions]
      );
    }
  }

  generateRandColorspread(data: IFieldData, context: CanvasRenderingContext2D, titleHeight?: number) {
    const num = this.getRandomNum(this.bgColors.length);
    const bgColor = this.bgColors[num];
    const fillColor = this.fillerColor[num];
    context.fillStyle = bgColor;
    context.fillRect(0, 0, data.width, data.height);

    if (titleHeight) {
      context.fillStyle = fillColor;
      context.fillRect(0, 500 - 25, data.width, titleHeight + 50);
    }
  }

  getRandomNum(length: number) {
    return Math.floor(Math.random() * length);
  }
}
