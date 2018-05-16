import Mesh from "./Mesh";

export default class Canvas2D {

	private _gl: WebGL2RenderingContext;
	
	public child: Mesh | null = null; 

	constructor(gl: WebGL2RenderingContext) {
		this._gl = gl;
		this._gl.disable(gl.CULL_FACE);
	}

	public render() {
		// Tell WebGL how to convert from clip space to pixels
		this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);

		// Clear the canvas
		this._gl.clearColor(.2, .2, .2, 1);
		this._gl.clear(this._gl.COLOR_BUFFER_BIT);

		// Render the program
		if (this.child) {
			this.child.draw();
		} else {
			alert("No child")
		}
		
	}
}