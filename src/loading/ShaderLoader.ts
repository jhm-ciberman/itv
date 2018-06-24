import GLShader from "../gl/GLShader";
import * as fse from "fs-extra";

export default class ShaderLoader {

	private _gl: WebGL2RenderingContext;

	constructor(gl: WebGL2RenderingContext) {
		this._gl = gl;
	}

	
	
	public async load(vertexPath: string, fragmentPath: string) {
		const fragment = await fse.readFile(fragmentPath, "utf8");
		const vertex = await fse.readFile(vertexPath, "utf8");
		return new GLShader(this._gl, vertex, fragment);
	}
}