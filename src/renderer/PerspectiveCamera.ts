import { mat4 } from "gl-matrix";

export default class PerspectiveCamera {

	private _gl: WebGL2RenderingContext;

	constructor(gl: WebGL2RenderingContext) {
		this._gl = gl;
	}

	public getMatrix() {
		const proj = mat4.create();
		const view = mat4.create();
		const viewProjection = mat4.create();
		mat4.perspective(proj, 45 * Math.PI / 180, this._gl.canvas.width / this._gl.canvas.height, 0.1, 1000);
		mat4.lookAt(view, [0, 1, -3], [0, 0, 0], [0, 1, 0]);
		mat4.multiply(viewProjection, proj, view);

				//mat4.invert(view, view);
		//const w = 1; //gl.canvas.width / 2;
		//const h = 1; //gl.canvas.height / 2;
		//mat4.ortho(proj, -w, w, h, -h, -10, 100);
		return viewProjection;
	}

}