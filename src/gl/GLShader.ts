/**
 * Represents a single WebGL Shader (can be a Vertex shader or a Program Shader)
 */
export default class GLShader {

	public readonly shader: WebGLShader;

	public constructor(gl: WebGL2RenderingContext, type: number, source: string) {
		this.shader = gl.createShader(type) as WebGLShader;
		gl.shaderSource(this.shader, source);
		gl.compileShader(this.shader);
		var success = gl.getShaderParameter(this.shader, gl.COMPILE_STATUS);
		if (!success) {
			const str = gl.getShaderInfoLog(this.shader);
			gl.deleteShader(this.shader);
			throw new Error("Error compiling shader: " + str);
		}
	}
}