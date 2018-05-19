import GLBuffer from "../../gl/GLBuffer";
import GLAttributePointer from "../../gl/GLAttributePointer";
import Mesh2DBuilder from "./Mesh2DBuilder";

export default class Mesh2D {

	protected _gl: WebGL2RenderingContext;

	public readonly vertexBuffer: GLBuffer;

	public readonly drawMode: number; 

	public readonly vertexCount: number; 

	constructor(gl: WebGL2RenderingContext, builder: Mesh2DBuilder) {
		this._gl = gl;

		const size = builder.vertices.length;
		const interleaved = new Float32Array(size * 2);
		for (let i = 0, j = 0; i < size; i += 2, j += 4) {
			interleaved[j] = builder.vertices[i];
			interleaved[j + 1] = builder.vertices[i + 1];
			interleaved[j + 2] = builder.uvs[i];
			interleaved[j + 3] = builder.uvs[i + 1];
		}

		this.vertexBuffer = new GLBuffer(this._gl, this._gl.ARRAY_BUFFER, interleaved)
		this.drawMode = gl.TRIANGLES;
		this.vertexCount = size;
	}

	public getAttributePointers(): GLAttributePointer[] {
		return [
			new GLAttributePointer(this.vertexBuffer, "a_position", 2, this._gl.FLOAT, false, 4 * 4, 0),
			new GLAttributePointer(this.vertexBuffer, "a_texCoord", 2, this._gl.FLOAT, false, 4 * 4, 2 * 4),
		];
	}

	public performDrawCall() {
		this._gl.drawArrays(this.drawMode, 0, this.vertexCount);
	}

	public destroy() {
		this.vertexBuffer.destroy();
	}
}