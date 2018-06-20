import SystemSymbols from "../SystemSymbols";
import { mat4 } from "gl-matrix";
import PerspectiveCamera from "./PerspectiveCamera";
import DisplayObject3D from "../nodes/DisplayObject3D";

export default class WorldRenderer3D {

	private _gl: WebGL2RenderingContext;

	constructor(gl: WebGL2RenderingContext) {
		gl.disable(gl.CULL_FACE);
		gl.clearColor(0.2, 0.2, 0.2, 1.0);  // Clear to black, fully opaque
		gl.clearDepth(1.0);                 // Clear everything
		gl.enable(gl.DEPTH_TEST);           // Enable depth testing
		gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
		this._gl = gl;
	}

	public render(rootNode: DisplayObject3D, camera: PerspectiveCamera) {
		const gl = this._gl;
		// Tell WebGL how to convert from clip space to pixels
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		rootNode[SystemSymbols.updateWorldMatrix](mat4.create(), true);
		this._visitNode(rootNode, camera.getMatrix());
	}


	private _visitNode(node: DisplayObject3D, matrix: mat4) {
		
		mat4.multiply(matrix, matrix, node.localMatrix);
		node.render(matrix);
			
		const child = node[SystemSymbols.childNodes];
		for (let i = 0, s = child.length; i < s; i++) {
			this._visitNode(child[i], matrix);
		}
	}

}