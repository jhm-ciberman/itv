import DisplayObject from "../nodes/DisplayObject";
import Camera3D from "../nodes/projection/Camera3D";
import { mat4 } from "gl-matrix";

export default class Viewport {

	public rootNode: DisplayObject | null = null;

	private _camera: Camera3D;
	public readonly projectionMatrix: mat4 = mat4.create();

	private _width: number;
	private _height: number;

	constructor(width: number, height: number, camera: Camera3D) {
		this._width = width;
		this._height = height;
		this._camera = camera;
		this._updateMatrix();
	}

	public setSize(width: number, height: number) {
		this._width = width;
		this._height = height;
		this._updateMatrix();
	}

	public set camera(value: Camera3D) {
		this._camera = value;
		this._updateMatrix();
	}

	public get camera(): Camera3D {
		return this._camera;
	}

	private _updateMatrix() {
		this._camera.computeProjectionMatrix(this.projectionMatrix, this._width / this._height);
	}
}