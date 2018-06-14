import Node from "../nodes/Node";
import SystemSymbols from "../SystemSymbols";
import { mat4 } from "gl-matrix";

export default class WorldRenderer {

	private _rootNode: Node;
	private _gl: WebGL2RenderingContext;

	constructor(gl: WebGL2RenderingContext, rootNode: Node) {
		this._rootNode = rootNode;
		gl.disable(gl.CULL_FACE);
		gl.clearColor(0.2, 0.2, 0.2, 1.0);  // Clear to black, fully opaque
		gl.clearDepth(1.0);                 // Clear everything
		gl.enable(gl.DEPTH_TEST);           // Enable depth testing
		gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
		this._gl = gl;
	}

	public render() {
		const gl = this._gl;
		// Tell WebGL how to convert from clip space to pixels
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		const proj = mat4.create();
		const view = mat4.create();
		const viewProjection = mat4.create();
		mat4.perspective(proj, 45 * Math.PI / 180, gl.canvas.width / gl.canvas.height, 0.1, 1000);
		mat4.lookAt(view, [0,0,0], [0, 0, 3], [0, 1, 0]);
		//mat4.invert(view, view);
		//const w = 1; //gl.canvas.width / 2;
		//const h = 1; //gl.canvas.height / 2;
		//mat4.ortho(proj, -w, w, h, -h, -10, 100);

		mat4.multiply(viewProjection, proj, view);
		this._rootNode[SystemSymbols.renderItself](viewProjection);
	}

}