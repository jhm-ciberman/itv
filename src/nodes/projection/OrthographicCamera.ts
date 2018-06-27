import { mat4 } from "gl-matrix";
import Camera3D from "./Camera3D";

export default class OrthographicCamera extends Camera3D {

	private _size: number; 
	private _near: number; 
	private _far: number; 
	constructor(size: number, near: number = 0.1, far: number = 2000) {
		super();
		this._size = size; 
		this._near = near; 
		this._far = far; 
	}

	public computeProjectionMatrix(aspect: number): mat4 {
		mat4.ortho(this._projectionMatrix, 
			-this._size * aspect, 
			this._size * aspect, 
			this._size, 
			-this._size, 
			this._near, 
			this._far
		);
		this._projectionMatrix[10] = -this._projectionMatrix[10];
		this._projectionMatrix[11] = -this._projectionMatrix[11];
		return this._projectionMatrix;
	}


}