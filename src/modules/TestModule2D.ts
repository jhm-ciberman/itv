import Module from "./Module";
import Sprite from "../nodes/Sprite";

export default class TestModule2D extends Module {
	private _sprite: Sprite;

	private _s: number = 0;
	constructor(sprite: Sprite) {
		super();
		this._sprite = sprite;
	}

	public update(deltaTime: number): void {
		this._s += (10 * deltaTime);
		this._sprite.setPosition(400, 300, 0);
		this._sprite.setScale(this._s, this._s, 1);
		this._sprite.rotateZ(10 * deltaTime);
	}

}