import GLTexture from "../gl/GLTexture";
import GLRasterizer from "../gl/GLRasterizer";

export default class Texture {

	private _glTexture: GLTexture | null = null;

	private _currentRasterizer: GLRasterizer | null = null; 

	private _image: HTMLImageElement;
	constructor(image: HTMLImageElement) {
		this._image = image;
	}

	public getTextureForRasterizer(rasterizer: GLRasterizer) {
		if (this._currentRasterizer !== rasterizer || this._glTexture === null) {
			this._currentRasterizer = rasterizer;
			if (this._glTexture) {
				this._glTexture.free();
			}
			this._glTexture = rasterizer.createTexture(this._image);
		}
		return this._glTexture;
		
	}

	public destroy() {
		if (this._glTexture) {
			this._glTexture.free();
		}
	}

}