import GLTexture from "../gl/GLTexture";
import GLShader from "../gl/GLShader";
import { mat4 } from "gl-matrix";

export default class Material {
	public shader: GLShader;
	public texture: GLTexture | null = null;

	private _textureUniform: WebGLUniformLocation | null;
	private _matrixUniform: WebGLUniformLocation | null;

	constructor(shader: GLShader) {
		this.shader = shader;

		this._matrixUniform = shader.getUniformLocation("u_matrix");
		this._textureUniform = shader.getUniformLocation("u_texture");
	}

	public use(gl: WebGL2RenderingContext, matrix: mat4) {
		this.shader.use();
		
		if (this.texture && this._textureUniform) {
			this.texture.bind(this._textureUniform, 0);
		}

		gl.uniformMatrix4fv(this._matrixUniform, false, matrix);
		
	}
}