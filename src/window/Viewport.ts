import DisplayObject from "../nodes/DisplayObject";
import Camera3D from "../nodes/projection/Camera3D";
import OrthographicCamera from "../nodes/projection/OrthographicCamera";
import { mat4 } from "gl-matrix";
import Vector3 from "../math/Vector3";

export default class Viewport {

	public rootNode: DisplayObject | null = null;

	private _camera: Camera3D;

	public projectionMatrix: mat4;

	private _width: number;
	private _height: number;

	constructor(width: number, height: number) {
		this._camera = new OrthographicCamera(height / 2);
		this._camera.transform.position = new Vector3(0, 0, -10);
		this._width = width;
		this._height = height;

		this.projectionMatrix = this._camera.computeProjectionMatrix(width / height);
	}

	public setSize(width: number, height: number) {
		this._width = width;
		this._height = height;
		this.projectionMatrix = this._camera.computeProjectionMatrix(this._width / this._height);
	}

	public set camera(value: Camera3D) {
		this._camera = value;
		this.projectionMatrix = this._camera.computeProjectionMatrix(this._width / this._height);
	}

	public get camera(): Camera3D {
		return this._camera;
	}
}