import GLBuffer from "../../gl/GLBuffer";
import GLAttributePointer from "../../gl/GLAttributePointer";
import MeshBuilder from "./MeshBuilder";

export default class Mesh {

	protected _gl: WebGL2RenderingContext;

	public readonly vertexBuffer: GLBuffer;

	public readonly drawMode: number; 

	public readonly vertexCount: number; 

	constructor(gl: WebGL2RenderingContext, builder: MeshBuilder) {
		this._gl = gl;

		const size = builder.vertices.length;
		const vertexNumb = Math.floor(size / 3)
		const interleaved = new Float32Array(vertexNumb * 5);
		let vertIndex = 0;
		let uvIndex = 0;
		for (let j = 0; vertIndex < size;) {
			interleaved[j++] = builder.vertices[vertIndex++];
			interleaved[j++] = builder.vertices[vertIndex++];
			interleaved[j++] = builder.vertices[vertIndex++];
			interleaved[j++] = builder.uvs[uvIndex++];
			interleaved[j++] = builder.uvs[uvIndex++];
		}

		this.vertexBuffer = new GLBuffer(this._gl, this._gl.ARRAY_BUFFER, interleaved)
		this.drawMode = gl.TRIANGLES;
		this.vertexCount = size;
	}

	public getAttributePointers(): GLAttributePointer[] {
		return [
			new GLAttributePointer(this.vertexBuffer, "a_position", 3, this._gl.FLOAT, false, 4 * 5, 0),
			new GLAttributePointer(this.vertexBuffer, "a_texCoord", 2, this._gl.FLOAT, false, 4 * 5, 3 * 4),
		];
	}

	public performDrawCall() {
		this._gl.drawArrays(this.drawMode, 0, this.vertexCount);
	}

	public destroy() {
		this.vertexBuffer.destroy();
	}
}