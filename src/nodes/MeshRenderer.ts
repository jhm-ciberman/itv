import DisplayObject from "./DisplayObject";
import CubeMesh from "../renderer/mesh/CubeMesh";
import GLRasterizer from "../gl/GLRasterizer";
import GLTexture from "../gl/GLTexture";
import Texture from "../renderer/Texture";

export default class MeshRenderer extends DisplayObject {

	private _mesh: CubeMesh;
	public texture: Texture;

	constructor(mesh: CubeMesh, texture: Texture) {
		super();
		this._mesh = mesh;
		this.texture = texture;
	}

	public render(rasterizer: GLRasterizer) {
		if (this.texture) {
			rasterizer.drawMesh(this._mesh.mesh, this.texture.getTextureForRasterizer(rasterizer));
		}
	}
}