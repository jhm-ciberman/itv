import DisplayObject from "../nodes/DisplayObject";
import { mat4 } from "gl-matrix";
import GLRasterizer from "../gl/GLRasterizer";
import Camera from "../nodes/projection/Camera3D";
import OrthographicCamera from "../nodes/projection/OrthographicCamera";
import Vector3 from "../math/Vector3";

export default class Stage {
	
	public rootNode: DisplayObject | null = null;

	private _camera: Camera;

	private _viewProjectionMatrix: mat4;

	private _renderMatrix: mat4;

	private _rasterizer: GLRasterizer;

	private _projectionMatrix: mat4;

	private _width: number;
	private _height: number;

	constructor(rasterizer: GLRasterizer, width: number, height: number) {
		this._camera = new OrthographicCamera(height / 2);
		this._camera.transform.position = new Vector3(0, 0, -10);
		this._rasterizer = rasterizer;
		this._viewProjectionMatrix = mat4.create();
		this._renderMatrix = mat4.create();
		this._projectionMatrix = this._camera.computeProjectionMatrix(width / height);
		this._width = width;
		this._height = height;
	}

	public setSize(width: number, height: number) {
		this._width = width;
		this._height = height;
		this._projectionMatrix = this._camera.computeProjectionMatrix(this._width / this._height);
	}

	public set camera(value: Camera) {
		this._camera = value;
		this._projectionMatrix = this._camera.computeProjectionMatrix(this._width / this._height);
	}

	public render() {
		if (!this.rootNode) return;
		this.rootNode.transform.updateWorldMatrix(false);

		mat4.multiply(this._viewProjectionMatrix, this._projectionMatrix, this._camera.inverseWorldMatrix);

		this._rasterizer.beginFrame();
		this._visitNode(this.rootNode, false);
	}

	private _visitNode(node: DisplayObject, dirty: boolean) {
		mat4.multiply(this._renderMatrix, this._viewProjectionMatrix, node.transform.lastComputedWorldMatrix);
		this._rasterizer.setMatrix(this._renderMatrix);
		node.render(this._rasterizer);

		for(const child of node.children) {
			this._visitNode(child, dirty);
		}
	}


}