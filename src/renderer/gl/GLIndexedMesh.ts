import GLMesh from "./GLMesh";

export default class GLIndexedMesh extends GLMesh {

	protected readonly _indexBuffer: WebGLBuffer; 

	constructor(gl: WebGL2RenderingContext, data: Float32Array, indices: Uint8Array, drawMode: number) {
		super(gl, data, indices.length, drawMode);

		this._indexBuffer = gl.createBuffer() as WebGLBuffer;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
	}

	public destroy() {
		super.destroy();
		this._gl.deleteBuffer(this._indexBuffer);
	}

	public drawCall() {
		this._gl.bindVertexArray(this._vao);
		this._gl.drawElements(this._drawMode, this._vertexCount, this._gl.UNSIGNED_BYTE, 0);
	}
}