type TypedArray = 
	Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array |
	Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer;

export default class GLBuffer {

	private readonly _buffer: WebGLBuffer;

	private readonly _bufferType: number; 
	
	private readonly _gl: WebGL2RenderingContext;

	constructor(gl: WebGL2RenderingContext, bufferType: number, data: TypedArray) {
		this._gl = gl;
		// Create a buffer
		this._buffer = this._gl.createBuffer() as WebGLBuffer;
		this._bufferType = bufferType;
		this.upload(data);
	}


	public bind() {
		this._gl.bindBuffer(this._bufferType, this._buffer);
	}

	public upload(data: TypedArray) {
		this._gl.bindBuffer(this._bufferType, this._buffer);
		this._gl.bufferData(this._bufferType, data, this._gl.STATIC_DRAW);
	}

	public destroy() {
		this._gl.deleteBuffer(this._buffer);
	}
}