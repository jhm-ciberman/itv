import RasterizerResource from "./RasterizerResource";
import GLShader from "../renderer/gl/GLShader";
import GLRasterizer from "../renderer/gl/GLRasterizer";

export default class Shader extends RasterizerResource<GLShader> {

	private _vertex: string;
	private _fragment: string;
	constructor(source: string) {
		super();

		const REGEX = /\[vertex]([.\s\S]*)\[fragment\]([.\s\S]*)/g;
		const r = REGEX.exec(source);
		if (!r) {
			throw new Error("The passed shader needs to have the [vertex] and [frament] tags in order");
		}

		this._vertex = r[1];
		this._fragment = r[2];
	}

	protected _createRawResource(rasterizer: GLRasterizer): GLShader {
		return rasterizer.createShader(this._vertex, this._fragment);
	}
	protected _destroyRawResource(_rasterizer: GLRasterizer, rawResource: GLShader): void {
		rawResource.delete();
	}


}