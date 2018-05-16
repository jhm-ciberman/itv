import GLBuffer from "../gl/GLBuffer";
import GLVertexArrayObject from "../gl/GLVertexArrayObject";
import GLAttributeData from "../gl/GLAttributeData";
import GLShaderProgram from "../gl/GLShaderProgram";

export default class Mesh {

	private _vertices: Float32Array;

	private _uvs: Float32Array;

	//private _interleaved: Float32Array;

	private _vertexBuffer: GLBuffer;

	private _vao: GLVertexArrayObject;

	private _indexBuffer: GLBuffer;

	private _drawMode: number; 

	private _shaderProgram: GLShaderProgram | null = null;

	private _indicesNumb: number; 
	private _vertexNumb: number; 

	constructor(gl: WebGL2RenderingContext, vertices: Float32Array, uvs: Float32Array, indices: Uint8Array) {
		this._vertices = vertices;
		this._uvs = uvs;
		this._indicesNumb = indices.length;
		this._vertexNumb = vertices.length;

		//this._interleaved = new Float32Array(vertices.length * 2);
		//this._createInterleaved();

		this._vao = new GLVertexArrayObject(gl);

		this._vertexBuffer = new GLBuffer(gl, gl.ARRAY_BUFFER, gl.FLOAT, vertices);
		this._indexBuffer = new GLBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, gl.FLOAT, indices);
		this._drawMode = gl.TRIANGLES;
	}

	public setShaderProgram(shaderProgram: GLShaderProgram) {
		if (shaderProgram !== this._shaderProgram) {
			this._vao.setIndexBuffer(this._indexBuffer);
			this._addAttribute(shaderProgram, "a_position", 2, false, 0, 0);
			//this._addAttribute(shaderProgram, "a_texcoord", 2, false, 0, 2 * 4);
			this._shaderProgram = shaderProgram;
		}
	}

	public draw() {
		if (this._shaderProgram) {
			this._shaderProgram.use();
			this._vao.draw(this._drawMode, 6, 0);
		} else {
			throw new Error("No shader program");
		}
		
	}

	private _addAttribute(program: GLShaderProgram, name: string, size: number, normalize: boolean, stride: number, start: number) {
		const attributeLocation = program.getAttributeLocation(name);
		if (attributeLocation !== undefined) {
			const data = new GLAttributeData(
				this._vertexBuffer, 
				attributeLocation,
				size,
				normalize, 
				stride, 
				start,
			);
			this._vao.addAttributeData(data);
		} else {
			console.log(`Attribute ${name} not found`);
		}
	}

	/*
	private _createInterleaved() {
		for (let i = 0; i < this._vertexNumb; i++) {
			this._interleaved[i * 4] = this._vertices[(i * 2)];
			this._interleaved[(i * 4) + 1] = this._vertices[(i * 2) + 1];
			this._interleaved[(i * 4) + 2] = this._uvs[i * 2];
			this._interleaved[(i * 4) + 3] = this._uvs[(i * 2) + 1];
		}
	}

	public upload() {
		this._createInterleaved();
		this._vertexBuffer.upload(this._interleaved);
	}*/
}