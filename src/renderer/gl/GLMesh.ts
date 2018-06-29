import GLShader from "./GLShader";

export default class GLMesh {

	protected readonly _buffer: WebGLBuffer;
	protected readonly _vao: WebGLVertexArrayObject;
	protected readonly _gl: WebGL2RenderingContext;
	protected readonly _drawMode: number;
	protected readonly _vertexCount: number;
	
	constructor(gl: WebGL2RenderingContext, data: Float32Array, vertexCount: number, drawMode: number) {
		this._gl = gl;

		this._vertexCount = vertexCount;
		this._drawMode = drawMode;

		this._vao = gl.createVertexArray() as WebGLVertexArrayObject;
		gl.bindVertexArray(this._vao);

		this._buffer = gl.createBuffer() as WebGLBuffer;
		gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
		gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

		gl.enableVertexAttribArray(GLShader.ATTR_POSITION);
		gl.vertexAttribPointer(GLShader.ATTR_POSITION, 3, gl.FLOAT, false, 4 * 5, 0);
		gl.enableVertexAttribArray(GLShader.ATTR_TEXCOORD);
		gl.vertexAttribPointer(GLShader.ATTR_TEXCOORD, 2, gl.FLOAT, false, 4 * 5, 3 * 4);
	}

	public destroy() {
		this._gl.deleteBuffer(this._buffer);
		this._gl.deleteVertexArray(this._vao);
	}

	public drawCall() {
		this._gl.bindVertexArray(this._vao);
		this._gl.drawArrays(this._drawMode, 0, this._vertexCount);
	}

}