import {SVG_NS} from '../settings'

export default class Ball {
  constructor(r, boardWidth, boardHeight) {
    this.r = r;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.ping = new Audio('public/sounds/pong-01.wav');

    this.reset();
  }
  

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;

    while ( this.vy === 0 ){
      this.vy = Math.floor(Math.random() * - 5 );
    }
    //BALL MOVEMENT 
    this.vx = this.direction * (6 - Math.abs(this.vy)); 
  }

  wallCollision(paddleOne, paddleTwo){
    const hitLeft = this.x - this.r <= 0;
    const hitRight = this.x + this.r >= this.boardWidth;
    const hitTop = this.y - this.r <= 0;
    const hitBottom = this.y + this.r >= this.boardHeight;

    if (hitLeft){
      this.direction = - 1;
      this.goal(paddleTwo)
    }else if(hitRight){ 
      this.direction = 1;
      this.goal(paddleOne)

    }else if(hitTop || hitBottom){
      this.vy = -this.vy;
    }
  }
  goal(paddle){
    paddle.score++;
    this.reset();
  }
  paddleCollision( paddleOne,paddleTwo){
    if(this.vx > 0) {
    // Detect collision on right side paddle2
      let paddle = paddleTwo.coordinates(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
      let {leftX, topY, bottomY} = paddle;
      
      
      if (
      this.x + this.r >= leftX
      && this.y >= topY
      && this.y <= bottomY
      ) {
        this.vx = -this.vx;
        this.ping.play();

      }

    } else { 
      let paddle = paddleOne.coordinates(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
      let {rightX, topY, bottomY} = paddle;
      if (
      //detect collision on right side paddle1
      this.x - this.r <= rightX
      && this.y >= topY
      && this.y <= bottomY
    ){this.vx = -this.vx;
      this.ping.play();
      } }
  }

  render(svg, paddleOne, paddleTwo){
    this.x +=  this.vx;
    this.y +=  this.vy;
   
    this.wallCollision(paddleOne, paddleTwo);
    this.paddleCollision(paddleOne,paddleTwo);

    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'r', this.r);
    ball.setAttributeNS(null, 'fill', 'white');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    svg.appendChild(ball);

  }
}
 

  
  


  
  
