import Camera3D from "../nodes/projection/Camera3D";
import { mat4 } from "gl-matrix";
import Scene from "../nodes/Scene";
import Vector3 from "../math/Vector3";
import OrthographicCamera from "../nodes/projection/OrthographicCamera";

export default class Viewport {

	private _camera: Camera3D;
	public readonly projectionMatrix: mat4 = mat4.create();

	private _width: number;
	private _height: number;

	private _scene: Scene;

	constructor(width: number, height: number, scene: Scene) {
		this._width = width;
		this._height = height;
		this._scene = scene;
		this._camera = new OrthographicCamera(height / 2);
		this._camera.transform.position = new Vector3(0, 0, -10);
		
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

	public attachScene(scene: Scene) {
		this._scene = scene;
	}

	public get scene(): Scene {
		return this._scene;
	}

	private _updateMatrix() {
		this._camera.computeProjectionMatrix(this.projectionMatrix, this._width / this._height);
	}
}