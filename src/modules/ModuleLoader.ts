import Module from "./Module";
import ShaderLoader from "../loading/ShaderLoader";
import GLShaderProgram from "../gl/GLShaderProgram";
import Stage3D from "../renderer/Stage3D";
import * as path from "path";

export default abstract class ModuleLoader {

	private _gl: WebGL2RenderingContext;

	protected readonly _stage: Stage3D; 

	constructor(gl: WebGL2RenderingContext, stage: Stage3D) {
		this._gl = gl;
		this._stage = stage;
	}


	protected _resolve(relativePath: string): string {
		return path.resolve(__dirname, "../../res/", relativePath);
	}
	

	// TODO: remove this gl argument
	public abstract async load(gl: WebGL2RenderingContext, stage: Stage3D): Promise<Module>;

	protected async _loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise<HTMLImageElement>((resolve) => {
			const image = new Image();
			image.src = this._resolve(src);  // MUST BE SAME DOMAIN!!!
			image.onload = function () {
				resolve(image);
			}
		});
	}


	protected async _loadShader(vertexSourcePath: string, fragmentSourcePath: string): Promise<GLShaderProgram> {
		const shaderLoader = new ShaderLoader(this._gl);
		return shaderLoader.load(
			this._resolve(vertexSourcePath), 
			this._resolve(fragmentSourcePath)
		);
	}
}