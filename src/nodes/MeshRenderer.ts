import { mat4 } from "gl-matrix";
import DisplayObject from "./DisplayObject";
import CubeMesh from "../renderer/mesh/CubeMesh";
import GLRasterizer from "../gl/GLRasterizer";
import GLTexture from "../gl/GLTexture";

export default class MeshRenderer extends DisplayObject {

	private _mesh: CubeMesh;
	public texture: GLTexture;

	constructor(mesh: CubeMesh, texture: GLTexture) {
		super();
		this._mesh = mesh;
		this.texture = texture;
	}

	public render(rasterizer: GLRasterizer, matrix: mat4) {
		if (this.texture) {
			rasterizer.drawMesh(this._mesh.mesh, matrix, this.texture);
		}
	}
}