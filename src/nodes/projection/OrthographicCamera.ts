import { mat4 } from "gl-matrix";
import Camera3D from "./Camera3D";

export default class OrthographicCamera extends Camera3D {

	private _left: number; 
	private _right: number; 
	private _top: number; 
	private _bottom: number; 
	private _near: number; 
	private _far: number; 
	constructor(left: number, right: number, top: number, bottom: number, near: number = 0.1, far: number = 2000) {
		super();
		this._left = left; 
		this._right = right; 
		this._top = top; 
		this._bottom = bottom; 
		this._near = near; 
		this._far = far; 
		this.updateProjectionMatrix();
	}

	public updateProjectionMatrix(): void {
		mat4.ortho(this.projectionMatrix, this._left, this._right, -this._top, -this._bottom, this._near, this._far);
		this.projectionMatrix[10] = -this.projectionMatrix[10];
		this.projectionMatrix[11] = -this.projectionMatrix[11];
	}


}