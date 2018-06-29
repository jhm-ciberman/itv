import { mat4 } from "gl-matrix";
import Camera3D from "./Camera3D";

export default class PerspectiveCamera extends Camera3D {

	private _fov: number;

	private _pixelAspect: number;

	private _near: number;

	private _far: number;

	constructor(fov: number, pixelAspect : number = 1, near: number = 0.1, far: number = 2000) {
		super();
		this._fov = fov;
		this._pixelAspect = pixelAspect;
		this._near = near;
		this._far = far;
	}

	public computeProjectionMatrix(matrix: mat4, aspect: number): void {
		mat4.perspective(matrix, 
			this._fov * Math.PI / 180, 
			this._pixelAspect * aspect, 
			this._near, 
			this._far
		);
		matrix[10] = -matrix[10];
		matrix[11] = -matrix[11];
	}

}