interface IPageConfig {
  presetDesigns: {
    design1: IDesign;
  };
}

interface IDesign {
  fill: IDesignFill;
  font: string;
  fontWeight: string;
}

interface IDesignFill {
  bookType: {
    name: 'type';
    size: {
      x: number;
      y: number;
    };
    fontSize: number;
    font: string;
  };
  bookSeries: {
    name: 'series';
    size: {
      x: number;
      y: number;
    };
    fontSize: number;
    font: string;
  };
  bookTitle: {
    name: 'title';
    size: {
      x: number;
      y: number;
    };
    fontSize: number;
    font: string;
  };
  bookAuthor: {
    name: 'author';
    size: {
      x: number;
      y: number;
    };
    fontSize: number;
    font: string;
  };
  bookYear: {
    name: 'year';
    size: {
      x: number;
      y: number;
    };
    fontSize: number;
    font: string;
  };
}

const pageConfig: IPageConfig = {
  presetDesigns: {
    design1: {
      fill: {
        bookType: {
          name: 'type',
          size: {
            x: 50,
            y: 5,
          },
          fontSize: 24,
          font: 'sans-serif',
        },
        bookSeries: {
          name: 'series',
          size: {
            x: 50,
            y: 10,
          },
          fontSize: 36,
          font: 'sans-serif',
        },
        bookTitle: {
          name: 'title',
          size: {
            x: 50,
            y: 15,
          },
          fontSize: 48,
          font: 'sans-serif',
        },
        bookAuthor: {
          name: 'author',
          size: {
            x: 50,
            y: 20,
          },
          fontSize: 36,
          font: 'sans-serif',
        },
        bookYear: {
          name: 'year',
          size: {
            x: 50,
            y: 25,
          },
          fontSize: 24,
          font: 'sans-serif',
        },
      },
      font: 'sans-serif',
      fontWeight: 'bold',
    },
  },
};

// const colorConfig = {

// }

export { pageConfig };
