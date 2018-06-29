import GLRasterizer from "../renderer/gl/GLRasterizer";
import DisplayObject2D from "./DisplayObject2D";
import Texture from "../resources/Texture";

export default class Sprite extends DisplayObject2D {

	public texture: Texture | null = null;

	constructor() {
		super();
	}

	public render(rasterizer: GLRasterizer) {
		if (this.texture) {
			rasterizer.drawQuad(
				this.texture.getRawResource(rasterizer)
			);
		}
	}
}