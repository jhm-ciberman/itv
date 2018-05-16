import GLShaderProgram from "../gl/GLShaderProgram";
import GLVertexShader from "../gl/GLVertexShader";
import GLFragmentShader from "../gl/GLFragmentShader";
import * as fse from "fs-extra";

export default class ShaderLoader {

	private _gl: WebGL2RenderingContext;

	constructor(gl: WebGL2RenderingContext) {
		this._gl = gl;
	}
	
	public async load(vertexPath: string, fragmentPath: string) {
		const fragmentSource = await fse.readFile(fragmentPath, "utf8");
		const vertexSource = await fse.readFile(vertexPath, "utf8");

		const fragment = new GLFragmentShader(this._gl, fragmentSource);
		const vertex = new GLVertexShader(this._gl, vertexSource);
		return new GLShaderProgram(this._gl, fragment, vertex);
	}
}