import GLTexture from "../renderer/gl/GLTexture";
import GLRasterizer from "../renderer/gl/GLRasterizer";
import RasterizerResource from "./RasterizerResource";

export default class Texture extends RasterizerResource<GLTexture> {

	private _image: HTMLImageElement;
	constructor(image: HTMLImageElement) {
		super();
		this._image = image;
	}

	protected _createRawResource(rasterizer: GLRasterizer): GLTexture {
		return rasterizer.createTexture(this._image);
	}
	protected _destroyRawResource(_rasterizer: GLRasterizer, rawResource: GLTexture): void {
		rawResource.free();
	}

}