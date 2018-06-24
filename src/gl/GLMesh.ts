import GLShader from "./GLShader";

export default class GLMesh {

	private readonly _buffer: WebGLBuffer;
	private readonly _vao: WebGLVertexArrayObject;
	private readonly _gl: WebGL2RenderingContext;
	
	constructor(gl: WebGL2RenderingContext, data: Float32Array) {
		this._gl = gl;
		this._buffer = gl.createBuffer() as WebGLBuffer;
		gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
		gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);


		this._vao = gl.createVertexArray() as WebGLVertexArrayObject;
		gl.bindVertexArray(this._vao);
		gl.enableVertexAttribArray(GLShader.ATTR_POSITION);
		gl.vertexAttribPointer(GLShader.ATTR_POSITION, 2, gl.FLOAT, false, 4 * 4, 0);
		gl.enableVertexAttribArray(GLShader.ATTR_TEXCOORD);
		gl.vertexAttribPointer(GLShader.ATTR_TEXCOORD, 2, gl.FLOAT, false, 4 * 4, 2 * 4);
	}

	public destroy() {
		this._gl.deleteBuffer(this._buffer);
	}

	public drawCall() {
		this._gl.bindVertexArray(this._vao);
		this._gl.drawArrays(this._gl.TRIANGLES, 0, 6);
	}

}