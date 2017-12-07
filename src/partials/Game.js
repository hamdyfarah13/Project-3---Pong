import { SVG_NS, KEYS } from '../settings.js';


import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {
	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(element);

		this.board = new Board(this.width, this.height);
		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;

		this.paddleone = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z
		);

		this.paddletwo = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			(this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down
		),


			this.radius = 8;
		this.ball = new Ball(
			this.radius,
			this.width,
			this.height,
		);
		this.ball2 = new Ball(
			this.radius,
			this.width,
			this.height,
		);
		this.ball3 = new Ball(
			this.radius,
			this.width,
			this.height,
		);

		this.score1 = new Score(200, 35, 25);
		this.score2 = new Score(300, 35, 25);

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		});
	}
	render() {
		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		svg.setAttributeNS(null, 'version', '1.1');

		this.gameElement.appendChild(svg);
		this.board.render(svg);
		this.paddleone.render(svg);
		this.paddletwo.render(svg);
		this.ball.render(svg, this.paddleone, this.paddletwo);
		this.ball2.render(svg, this.paddleone, this.paddletwo);
		this.ball3.render(svg, this.paddleone, this.paddletwo);
		this.score1.render(svg, this.paddleone.score);
		this.score2.render(svg, this.paddletwo.score);
	}

}
