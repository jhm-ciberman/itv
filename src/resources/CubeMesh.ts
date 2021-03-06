import GLIndexedMesh from "../renderer/gl/GLIndexedMesh";
import GLRasterizer from "../renderer/gl/GLRasterizer";
import { GLRasterizerDrawMode } from "../renderer/gl/GLRasterizerDrawMode";
import Mesh from "./Mesh";

export default class CubeMesh extends Mesh {

	private _vertices = new Float32Array([
		// Front face
		-1.0, -1.0, 1.0, 0, 1,
		1.0, -1.0, 1.0, 1, 1,
		1.0, 1.0, 1.0, 1, 0,
		-1.0, 1.0, 1.0, 0, 0,

		// back face
		-1.0, -1.0, -1.0, 1, 1,
		-1.0, 1.0, -1.0, 1, 0,
		1.0, 1.0, -1.0, 0, 0,
		1.0, -1.0, -1.0, 0, 1,

		// Top face
		-1.0, 1.0, -1.0, 0, 1,
		-1.0, 1.0, 1.0, 1, 1,
		1.0, 1.0, 1.0, 1, 0,
		1.0, 1.0, -1.0, 0, 0,

		// Bottom face
		-1.0, -1.0, -1.0, 1, 1,
		1.0, -1.0, -1.0, 1, 0,
		1.0, -1.0, 1.0, 0, 0,
		-1.0, -1.0, 1.0, 0, 1,

		// Right face
		1.0, -1.0, -1.0, 1, 1,
		1.0, 1.0, -1.0, 1, 0,
		1.0, 1.0, 1.0, 0, 0,
		1.0, -1.0, 1.0, 0, 1,

		// Left face
		-1.0, -1.0, -1.0, 0, 1,
		-1.0, -1.0, 1.0, 1, 1,
		-1.0, 1.0, 1.0, 1, 0,
		-1.0, 1.0, -1.0, 0, 0,
	]);

	private _indices = new Uint8Array([
		0, 1, 2, 0, 2, 3,    // front
		4, 5, 6, 4, 6, 7,    // back
		8, 9, 10, 8, 10, 11,   // top
		12, 13, 14, 12, 14, 15,   // bottom
		16, 17, 18, 16, 18, 19,   // right
		20, 21, 22, 20, 22, 23    // left
	]);

	protected _createRawResource(rasterizer: GLRasterizer): GLIndexedMesh {
		return rasterizer.createIndexedMesh(this._vertices, this._indices, GLRasterizerDrawMode.TRIANGLES);
	}
	protected _destroyRawResource(_rasterizer: GLRasterizer, rawResource: GLIndexedMesh): void {
		rawResource.destroy();
	}

}