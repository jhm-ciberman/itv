import DisplayObject from "./DisplayObject";
import CubeMesh from "../resources/CubeMesh";
import GLRasterizer from "../renderer/gl/GLRasterizer";
import Texture from "../resources/Texture";

export default class MeshRenderer extends DisplayObject {

	private _mesh: CubeMesh;
	public texture: Texture;

	constructor(mesh: CubeMesh, texture: Texture) {
		super();
		this._mesh = mesh;
		this.texture = texture;
	}

	public render(rasterizer: GLRasterizer) {
		rasterizer.drawMesh(this._mesh, this.texture);
	}
}