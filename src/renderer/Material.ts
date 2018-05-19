import GLTexture from "../gl/GLTexture";
import GLShaderProgram from "../gl/GLShaderProgram";

export default class Material {
	public shader: GLShaderProgram;
	public texture: GLTexture | null = null;

	private _textureUniform: WebGLUniformLocation | null = null;

	constructor(shader: GLShaderProgram) {
		this.shader = shader;

		// this._matrixUniform = material.shader.getUniformLocation("u_matrix");
		this._textureUniform = shader.getUniformLocation("u_texture");
	}

	public use() {
		this.shader.use();
		
		if (this.texture && this._textureUniform) {
			this.texture.bind(this._textureUniform, 0);
		}	
	}
}