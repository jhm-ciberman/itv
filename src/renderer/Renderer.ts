import DisplayObject from "../nodes/DisplayObject";
import { mat4 } from "gl-matrix";
import GLRasterizer from "../renderer/gl/GLRasterizer";
import Shader from "../resources/Shader";
import Viewport from "../window/Viewport";

export default class Renderer {
	
	public rootNode: DisplayObject | null = null;

	private _viewProjectionMatrix: mat4;

	private _renderMatrix: mat4;

	private _rasterizer: GLRasterizer;

	constructor(canvas: HTMLCanvasElement, defaultShader: Shader) {

		const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

		this._viewProjectionMatrix = mat4.create();
		this._renderMatrix = mat4.create();


		this._rasterizer = new GLRasterizer(gl, defaultShader);
		this._rasterizer.init();
	}

	public render(viewport: Viewport) {
		this._rasterizer.beginFrame();
		if (!viewport.rootNode) return;

		viewport.rootNode.transform.updateWorldMatrix(false);

		mat4.multiply(this._viewProjectionMatrix, viewport.projectionMatrix, viewport.camera.inverseWorldMatrix);


		this._visitNode(viewport.rootNode, false);
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