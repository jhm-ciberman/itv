import GLBuffer from "./GLBuffer";
import GLShaderProgram from "./GLShaderProgram";

export default class GLAttributePointer {
	public buffer: GLBuffer;
	public readonly name: string;
	private _size: number;
	private _type: number;
	private _normalized: boolean;
	private _stride: number;
	private _start: number;

	constructor(buffer: GLBuffer, name: string, size: number, type: number, normalized: boolean = false, stride: number = 0, start: number = 0) {
		this.buffer = buffer;
		this.name = name;
		this._size = size;
		this._type = type;
		this._normalized = normalized;
		this._stride = stride;
		this._start = start;
	}

	public bind(gl: WebGL2RenderingContext, program: GLShaderProgram) {

		const location = program.getAttributeLocation(this.name);
		if (location >= 0) {
			gl.enableVertexAttribArray(location);
			gl.vertexAttribPointer(location, this._size, this._type, this._normalized, this._stride, this._start);
		} else {
			throw new Error(`Attribute ${this.name} not found`);
		}
		
	}
}