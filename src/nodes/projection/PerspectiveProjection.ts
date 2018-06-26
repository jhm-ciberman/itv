import { mat4 } from "gl-matrix";
import Camera3D from "./Camera3D";

export default class PerspectiveCamera extends Camera3D {

	private _fov: number;

	private _aspect: number;

	private _near: number;

	private _far: number;

	constructor(fov: number, aspect : number, near: number = 0.1, far: number = 2000) {
		super();
		this._fov = fov;
		this._aspect = aspect;
		this._near = near;
		this._far = far;
		this.updateProjectionMatrix();
	}

	public updateProjectionMatrix(): void {
		mat4.perspective(this.projectionMatrix, this._fov * Math.PI / 180, this._aspect, this._near, this._far);
	}
}