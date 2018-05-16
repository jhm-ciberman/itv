import GLShader from "./GLShader";

export default class GLFragmentShader extends GLShader {
	constructor(gl: WebGL2RenderingContext, source: string) {
		super(gl, gl.FRAGMENT_SHADER, source);
	}
}