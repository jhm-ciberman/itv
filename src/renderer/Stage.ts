import DisplayObject from "../nodes/DisplayObject";
import { mat4 } from "gl-matrix";
import GLRasterizer from "../gl/GLRasterizer";
import Camera from "../nodes/projection/Camera3D";
import OrthographicCamera from "../nodes/projection/OrthographicCamera";

export default class Stage {
	
	public rootNode: DisplayObject | null = null;

	private _camera: Camera;

	private _viewProjectionMatrix: mat4;

	private _renderMatrix: mat4;

	private _rasterizer: GLRasterizer;

	constructor(rasterizer: GLRasterizer, width: number, height: number) {
		this._camera = new OrthographicCamera(-width/2, width/2, -height/2, height/2);
		this._rasterizer = rasterizer;
		this._viewProjectionMatrix = mat4.create();
		this._renderMatrix = mat4.create();
		//this._width = width;
		//this._height = height;

		//this.setSize(width, height);
	}

	//public setSize(width: number, height: number) {
		//this._width = width;
		//this._height = height;
		//const proj = this._camera.getMatrix(width, height);
		//mat4.multiply(this._viewProjection, proj, this._view);
	//}

	public set camera(value: Camera) {
		this._camera = value;
		//this.setSize(this._width, this._height);
	}

	public render() {
		if (!this.rootNode) return;
		this.rootNode.transform.updateWorldMatrix(false);

		mat4.multiply(this._viewProjectionMatrix, this._camera.projectionMatrix, this._camera.inverseWorldMatrix);
		//mat4.copy(this._viewProjectionMatrix, this._camera.projectionMatrix);
		
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