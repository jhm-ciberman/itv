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

	public computeProjectionMatrix(aspect: number): mat4 {
		mat4.perspective(this._projectionMatrix, 
			this._fov * Math.PI / 180, 
			this._pixelAspect * aspect, 
			this._near, 
			this._far
		);
		this._projectionMatrix[10] = -this._projectionMatrix[10];
		this._projectionMatrix[11] = -this._projectionMatrix[11];
		return this._projectionMatrix;
	}

}