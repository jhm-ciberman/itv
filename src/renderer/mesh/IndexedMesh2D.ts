import Mesh2D from "./Mesh2D";
import Mesh2DBuilder from "./Mesh2DBuilder";
import GLBuffer from "../../gl/GLBuffer";

export default class IndexedMesh2D extends Mesh2D {

	public readonly indexBuffer: GLBuffer;

	public readonly indexCount: number;

	constructor(gl: WebGL2RenderingContext, builder: Mesh2DBuilder) {
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