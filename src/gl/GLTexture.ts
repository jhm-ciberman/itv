export type GLImageSource = ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

export default class GLTexture {

	private _texture: WebGLTexture;

	private _gl: WebGL2RenderingContext;

	constructor(gl: WebGL2RenderingContext, image: GLImageSource) {
		this._gl = gl;
		this._texture = gl.createTexture() as WebGLTexture;
		// make unit 0 the active texture uint
		// (ie, the unit all other texture commands will affect
		//gl.activeTexture(gl.TEXTURE0 + 0);

		// Bind it to texture unit 0' 2D bind point
		gl.bindTexture(gl.TEXTURE_2D, this._texture);

		// Set the parameters so we don't need mips and so we're not filtering
		// and we don't repeat
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.generateMipmap(gl.TEXTURE_2D);
	}


	public updateTexture(image: GLImageSource): void {
		const gl = this._gl;
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.generateMipmap(gl.TEXTURE_2D);
	}

	public bind(location: WebGLUniformLocation, textureUnit: number) {
		// The the shader we're putting the texture on texture unit 0
		this._gl.uniform1i(location, textureUnit);

		// Bind the texture to texture unit 0
		this._gl.activeTexture(this._gl.TEXTURE0 + textureUnit);
		this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
	}

	public free() {
		this._gl.deleteTexture(this._texture);
	}
}