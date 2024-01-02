import { IFieldData, fields } from '../../../types';
import { pageConfig } from '../../../constants/config';

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
    const currDesign = pageConfig.presetDesigns[data.design as keyof typeof pageConfig.presetDesigns];
    context.font = currDesign.font;
    console.log(currDesign);
    const title = this.wrapWords(data.title, context);
    const titleHeight = title.length * 48;
    this.generateRandColorspread(data, context, titleHeight);
    this.placeText(data.author, currDesign.fill.bookAuthor, currDesign.fontWeight, context);
    for (const [_, value] of Object.entries(currDesign.fill)) {
      const type = value.name;
      this.placeText(data[type as fields], value, value.fontWeight, context);
    }
  }

  placeText(
    text: string,
    data: { size: { x: number; y: number }; fontSize: number; font: string },
    fontWeight: string,
    context: CanvasRenderingContext2D
  ) {
    context.font = `${fontWeight} ${data.fontSize}px ${data.font}`;
    context.fillStyle = '#100300';
    const textWidth = context.measureText(text).width;
    context.fillText(text, this.width * data.size.x * 0.01 - textWidth / 2, this.height * data.size.y * 0.01);
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
