import GLTexture from "../gl/GLTexture";
import GLShaderProgram from "../gl/GLShaderProgram";
import { glMatrix, mat2d, mat3 } from "gl-matrix";

export default class Material {
	public shader: GLShaderProgram;
	public texture: GLTexture | null = null;

	private _textureUniform: WebGLUniformLocation | null = null;
	private _matrixUniform: WebGLUniformLocation | null = null;

	constructor(shader: GLShaderProgram) {
		this.shader = shader;

		this._matrixUniform = shader.getUniformLocation("u_matrix");
		this._textureUniform = shader.getUniformLocation("u_texture");
	}

	public rotation: number = 0;

	public use(gl: WebGL2RenderingContext) {
		this.shader.use();
		
		if (this.texture && this._textureUniform) {
			this.texture.bind(this._textureUniform, 0);
		}

		const m = mat3.create();
		mat3.projection(m, gl.canvas.width, gl.canvas.height);
		mat3.rotate(m, m, this.rotation);
		gl.uniformMatrix3fv(this._matrixUniform, false, m)
	}
}