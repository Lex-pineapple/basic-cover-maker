export class GradientPicker {
  private MIN_POINT_WIDTH = 20;

  createPoint() {
    const point = document.createElement('div');
    point.className = 'grad-point';
    const childId = document.querySelector('.grad-bar')?.children.length;
    if (childId) point.id = `gp${childId}`;
    point.style.backgroundColor = 'red';
    return point;
  }

  dragColorBar(event: DragEvent) {
    console.log('move');

    console.log(event.offsetX, event.offsetY);
  }

  init() {
    // JUST ADD FUCKING RANGE SLIDERS JFK
    const gradBar = document.querySelector('.grad-bar');
    const points = <NodeListOf<HTMLElement>>document.querySelectorAll('.grad-point');
    console.log(gradBar?.clientWidth);
    points.forEach((point: HTMLElement) => {
      console.log(point.offsetLeft);
    });
    const sep = document.querySelector('.sep1');
    sep?.addEventListener('mousedown', () => {
      sep.addEventListener('mousemove', () => {
        console.log('mnoved pointer');
      });
    });

    if (gradBar) {
      // gradBar.addEventListener('click', (event) => {
      //   const target = event.target;
      //   if (target instanceof Element) {
      //     if (target.id.includes('gp')) console.log('bring point picker');
      //     else console.log('add picker');
      //   }
      // });
      gradBar.addEventListener('mousedown', (event) => {
        // const target = event.target;
        // if (target instanceof Element) {
        //   if (target.id.includes('gp')) this.dragColorBar(event as DragEvent);
        // }
      });
    }
  }
}
