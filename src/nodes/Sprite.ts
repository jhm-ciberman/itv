import GLTexture from "../gl/GLTexture";
import GLRasterizer from "../gl/GLRasterizer";
import DisplayObject2D from "./DisplayObject2D";

export default class Sprite extends DisplayObject2D {

	public texture: GLTexture | null = null;

	constructor() {
		super();
	}

	public render(rasterizer: GLRasterizer) {
		if (this.texture) {
			rasterizer.drawQuad(this.texture);
		}
	}
}