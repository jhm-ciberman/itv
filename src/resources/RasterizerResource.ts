import GLRasterizer from "../renderer/gl/GLRasterizer";

export default abstract class RasterizerResource<T> {

	private _currentRasterizer: GLRasterizer | null = null; 
	private _rawResource: T | null = null;

	public getRawResource(rasterizer: GLRasterizer): T {
		if (this._currentRasterizer !== rasterizer || this._rawResource === null) {
			this._currentRasterizer = rasterizer;
			if (this._rawResource) {
				this._destroyRawResource(rasterizer, this._rawResource);
			}
			this._rawResource = this._createRawResource(rasterizer);
		}
		return this._rawResource;
	}

	protected abstract _createRawResource(rasterizer: GLRasterizer): T;
	protected abstract _destroyRawResource(rasterizer: GLRasterizer, rawResource: T): void;
}