import {SVG_NS} from '../settings'

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.speed = 30;
    this.score = 0;

    document.addEventListener('keydown', event => {
       switch(event.key) {
        case up: 
        this.up();
        break;
        case down:
        this.down();
        break;
       }
      });
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return { leftX, rightX, topY, bottomY};
  }

  up(){
    //GET MAX NUMBER
    this.y = Math.max(this.y - this.speed,0);
  this.y =  this.y - this.speed;
  }

  down(){
    //GET THE MIN NUMBER
    
this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
 this.y = this.y + this.speed;
  }



  render(svg){
  let paddle = document.createElementNS(SVG_NS, 'rect');
  paddle.setAttributeNS(null, 'x', this.x);
  paddle.setAttributeNS(null, 'y', this.y);
  paddle.setAttributeNS(null,'width', this.width);
  paddle.setAttributeNS(null,'height', this.height);
  paddle.setAttributeNS(null, 'fill', 'green');
  svg.appendChild(paddle);
    
  }
}
