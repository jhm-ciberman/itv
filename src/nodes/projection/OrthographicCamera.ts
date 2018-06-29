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

	public computeProjectionMatrix(matrix: mat4, aspect: number): void {
		mat4.ortho(matrix, 
			-this._size * aspect, 
			this._size * aspect, 
			this._size, 
			-this._size, 
			this._near, 
			this._far
		);
		matrix[10] = -matrix[10];
		matrix[11] = -matrix[11];
	}


}