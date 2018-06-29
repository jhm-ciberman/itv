import RasterizerResource from "./RasterizerResource";
import GLShader from "../renderer/gl/GLShader";
import GLRasterizer from "../renderer/gl/GLRasterizer";

export default class Shader extends RasterizerResource<GLShader> {

	private _source: string;
	constructor(source: string) {
		super();
		this._source = source;
	}

	protected _createRawResource(rasterizer: GLRasterizer): GLShader {
		return rasterizer.createShader(this._source);
	}
	protected _destroyRawResource(_rasterizer: GLRasterizer, rawResource: GLShader): void {
		rawResource.delete();
	}


}