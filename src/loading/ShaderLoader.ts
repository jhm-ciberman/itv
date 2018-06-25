import GLShader from "../gl/GLShader";
import * as fse from "fs-extra";
import * as path from "path";

export default class ShaderLoader {

	private _gl: WebGL2RenderingContext;

	constructor(gl: WebGL2RenderingContext) {
		this._gl = gl;
	}

	
	
	public async load(shaderPath: string) {
		shaderPath = path.resolve(__dirname, "../../res/", shaderPath);
		const source = await fse.readFile(shaderPath, "utf8");
		return new GLShader(this._gl, source);
	}
}