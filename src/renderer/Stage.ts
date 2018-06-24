import DisplayObject from "../nodes/DisplayObject";
import SystemSymbols from "../SystemSymbols";
import { mat4 } from "gl-matrix";
import OrthoProjection from "./projection/OrthoProjection";
import GLRasterizer from "../gl/GLRasterizer";

export default class Stage {
	
	public rootNode: DisplayObject | null = null;

	public projection: OrthoProjection;

	private _view: mat4;

	private _viewProjection: mat4;

	private _rasterizer: GLRasterizer;

	constructor(rasterizer: GLRasterizer, width: number, height: number) {
		this.projection = new OrthoProjection();
		this._rasterizer = rasterizer;
		this._view = mat4.create();
		this._viewProjection = mat4.create();

		//const w = gl.canvas.width / 2;
		//const h = gl.canvas.height / 2;
		//const w = 400, h = 300;
		// mat4.lookAt(this._view, [w, h, 0], [w, h, -1], [0, 1, 0]);
		mat4.lookAt(this._view, [0, 0, 0], [0, 0, -10], [0, 1, 0]);
		this.setSize(width, height);
	}

	public setSize(width: number, height: number) {
		const proj = this.projection.getMatrix(width, height);
		mat4.multiply(this._viewProjection, proj, this._view);
	}

	public render() {
		if (!this.rootNode) return;

		this.rootNode[SystemSymbols.updateWorldMatrix](mat4.create(), true);
		this._rasterizer.beginFrame();
		this._visitNode(this.rootNode, this._viewProjection);
	}


	private _visitNode(node: DisplayObject, matrix: mat4) {

		mat4.multiply(matrix, matrix, node.localMatrix);
		node.render(this._rasterizer, matrix);

		const child = node[SystemSymbols.childNodes];
		for (let i = 0, s = child.length; i < s; i++) {
			this._visitNode(child[i], matrix);
		}
	}
}