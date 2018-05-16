import Shader from "./GLShader";
import GLBuffer from "./GLBuffer";
import GLUniform from "./GLUniform";
import GLFragmentShader from "./GLFragmentShader";
import GLVertexShader from "./GLVertexShader";

export default class GLShaderProgram {

	private readonly _program: WebGLProgram;

	private readonly _gl: WebGL2RenderingContext; 

	private readonly _uniforms = new Map<string, GLUniform>();

	private readonly _attributesLocations = new Map<string, number>();
	

	constructor(gl: WebGL2RenderingContext, vertexShader: GLVertexShader, fragmentShader: GLFragmentShader) {
		this._gl = gl;
		this._program = gl.createProgram() as WebGLProgram;
		this._gl.attachShader(this._program, vertexShader.shader);
		this._gl.attachShader(this._program, fragmentShader.shader);
		this._gl.linkProgram(this._program);

		var success = this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS);
		if (!success) {
			const str = this._gl.getProgramInfoLog(this._program);
			this._gl.deleteProgram(this._program);
			throw new Error("Error compiling shader program: " + str);
		}
		this._extractAttrib();
		this._extractUniforms();
	}

	private _extractUniforms() {
		const gl = this._gl;
		const totalUniforms = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
		for (let i = 0; i < totalUniforms; i++) {
			const uniformData = gl.getActiveUniform(this._program, i) as WebGLActiveInfo;
			const name = uniformData.name.replace(/\[.*?\]/, "");
			const location = gl.getUniformLocation(this._program, uniformData.name) as WebGLUniformLocation;
			const u = new GLUniform(uniformData.size, location);
			this._uniforms.set(name, u);
		}
	};

	private _extractAttrib() {
		const gl = this._gl;
		const totalAttribs = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
		for (let i = 0; i < totalAttribs; i++) {
			const attribData = gl.getActiveAttrib(this._program, i) as WebGLActiveInfo;
			// Todo: if location is -1 is an error? 
			const location = gl.getAttribLocation(this._program, attribData.name);
			this._attributesLocations.set(attribData.name, location);
		}
	};

	public use() {
		this._gl.useProgram(this._program);
	}

	public getAttributeLocation(name: string): number | undefined {
		return this._attributesLocations.get(name);
	}
	
	public getUniform(name: string): GLUniform | undefined {
		return this._uniforms.get(name);
	}

}