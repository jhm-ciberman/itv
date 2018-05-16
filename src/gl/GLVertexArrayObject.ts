import GLBuffer from "./GLBuffer";
import GLAttributeData from "./GLAttributeData";

export default class GLVertexArrayObject {

	private _dirty: boolean = true;

	private _attributes: GLAttributeData[] = [];

	private _gl: WebGL2RenderingContext;

	private _vao: WebGLVertexArrayObject;

	private _indexBuffer: GLBuffer | null = null;

	constructor(gl: WebGL2RenderingContext) {
		this._gl = gl;
		this._vao = gl.createVertexArray() as WebGLVertexArrayObject;
	}

	public addAttributeData(attributeData: GLAttributeData) {
		this._attributes.push(attributeData);
		this._dirty = true;
	}

	public setIndexBuffer(indexBuffer: GLBuffer) {
		this._indexBuffer = indexBuffer;
		this._dirty = true;
	}

	private _use() {
		if (this._dirty) {
			this._activate();
		} else {
			this._gl.bindVertexArray(this._vao);
		}
	}

	private _activate() {
		var gl = this._gl;
		let lastBuffer: GLBuffer | null = null;
		
		// and make it the one we're currently working with
		gl.bindVertexArray(this._vao);

		for (var i = 0; i < this._attributes.length; i++) {
			var attrib = this._attributes[i];

			if (lastBuffer !== attrib.buffer) {
				attrib.buffer.bind();
				lastBuffer = attrib.buffer;
			}

			gl.enableVertexAttribArray(attrib.location);

			gl.vertexAttribPointer(
				attrib.location,
				attrib.size,
				gl.FLOAT, //attrib.buffer.dataType,
				attrib.normalized || false,
				attrib.stride || 0,
				attrib.start || 0
			);
		}

		if (this._indexBuffer) {
			this._indexBuffer.bind();
		}

		this._dirty = false;
	}


	public draw(type: number, size: number, start: number) {
		this._use();
		if (this._indexBuffer) {
			this._gl.drawElements(type, size, this._gl.UNSIGNED_BYTE, (start || 0) * 2);
		} else {
			this._gl.drawArrays(type, start, size);
		}
	}
}