import { mat4 } from "gl-matrix";
import GLTexture from "./GLTexture";

const PREPEND_VERTEX = 
`#version 300 es
layout(location = 0) in vec4 a_position;
layout(location = 1) in vec2 a_texCoord;
uniform mat4 u_matrix;
`;

const PREPEND_FRAGMENT = 
`#version 300 es
precision mediump float;
uniform sampler2D u_texture;
`;

export default class GLShader {

	public static readonly ATTR_POSITION = 0;
	public static readonly ATTR_TEXCOORD = 1;

	private readonly _program: WebGLProgram;

	private readonly _gl: WebGL2RenderingContext; 

	private readonly _a_position: number;
	private readonly _a_texCoord: number;
	private readonly _u_matrix: WebGLUniformLocation;
	private readonly _u_texture: WebGLUniformLocation;
	constructor(gl: WebGL2RenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
		this._gl = gl;


		vertexShaderSource = PREPEND_VERTEX + vertexShaderSource;
		fragmentShaderSource = PREPEND_FRAGMENT + fragmentShaderSource;

		const fragment = this._compileShaderSource(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
		const vertex = this._compileShaderSource(gl, gl.VERTEX_SHADER, vertexShaderSource);


		this._program = gl.createProgram() as WebGLProgram;
		this._gl.attachShader(this._program, vertex);
		this._gl.attachShader(this._program, fragment);
		this._gl.linkProgram(this._program);
		gl.deleteShader(fragment);
		gl.deleteShader(vertex);
		var success = this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS);
		if (!success) {
			const str = this._gl.getProgramInfoLog(this._program);
			this._gl.deleteProgram(this._program);
			throw new Error("Error compiling shader program: " + str);
		}

		this._a_position = this._gl.getAttribLocation(this._program, "a_position");
		this._a_texCoord = this._gl.getAttribLocation(this._program, "a_texCoord");
		this._u_matrix = this._gl.getUniformLocation(this._program, "u_matrix") as WebGLUniformLocation;
		this._u_texture = this._gl.getUniformLocation(this._program, "u_texture") as WebGLUniformLocation;

	}

	private _compileShaderSource(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
		const shader = gl.createShader(type) as WebGLShader;
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (!success) {
			const str = gl.getShaderInfoLog(shader);
			gl.deleteShader(shader);
			throw new Error("Error compiling shader: " + str);
		}
		return shader;
	}

	public extractUniforms(): Map<string, WebGLUniformLocation> {
		const uniforms = new Map<string, WebGLUniformLocation>();
		const gl = this._gl;
		const totalUniforms = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
		for (let i = 0; i < totalUniforms; i++) {
			const uniformData = gl.getActiveUniform(this._program, i) as WebGLActiveInfo;
			const name = uniformData.name.replace(/\[.*?\]/, "");
			const location = gl.getUniformLocation(this._program, uniformData.name) as WebGLUniformLocation;
			uniforms.set(name, location);
		}
		return uniforms;
	}

	public extractAttributes(): Map<string, number> {
		const attributes = new Map<string, number>();
		const gl = this._gl;
		const totalAttribs = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
		for (let i = 0; i < totalAttribs; i++) {
			const attribData = gl.getActiveAttrib(this._program, i) as WebGLActiveInfo;
			// Todo: if location is -1 is an error? 
			const location = gl.getAttribLocation(this._program, attribData.name);
			attributes.set(attribData.name, location);
		}
		return attributes;
	}

	public use() {
		this._gl.useProgram(this._program);
	}

	public getAttributeLocation(name: string): number {
		return this._gl.getAttribLocation(this._program, name);
	}
	
	public getUniformLocation(name: string): WebGLUniformLocation | null {
		return this._gl.getUniformLocation(this._program, name);
	}

	public setMatrix(matrix: mat4) {
		this._gl.uniformMatrix4fv(this._u_matrix, false, matrix);
	}

	public setTexture(texture: GLTexture) {
		texture.bind(this._u_texture, 0);
	}

	public delete() {
		this._gl.deleteProgram(this._program);
	}

}