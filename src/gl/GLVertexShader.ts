import GLShader from "./GLShader";

export default class GLVertexShader extends GLShader {
	constructor(gl: WebGL2RenderingContext, source: string) {
		super(gl, gl.VERTEX_SHADER, source);
	}
}