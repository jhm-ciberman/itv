import GLBuffer from "../../gl/GLBuffer";
import Mesh from "./Mesh";
import MeshBuilder from "./MeshBuilder";

export default class IndexedMesh extends Mesh {

	public readonly indexBuffer: GLBuffer;

	public readonly indexCount: number;

	constructor(gl: WebGL2RenderingContext, builder: MeshBuilder) {
		super(gl, builder);
		this.indexCount = builder.indices.length;
		this.indexBuffer = new GLBuffer(this._gl, this._gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(builder.indices));
	}

	public destroy() {
		super.destroy();
		this.indexBuffer.destroy();
	}

	public performDrawCall() {
		this.vertexBuffer.bind();
		this.indexBuffer.bind();
		this._gl.drawElements(this.drawMode, this.indexCount, this._gl.UNSIGNED_BYTE, 0);
	}

}