import { mat4 } from "gl-matrix";
import DisplayObject from "./DisplayObject";
import Mesh from "../renderer/mesh/Mesh";
import Material from "../renderer/Material";

export default class MeshRenderer extends DisplayObject {

	private _gl: WebGL2RenderingContext;
	private _mesh: Mesh;
	public material: Material;

	private _vao: WebGLVertexArrayObject;

	constructor(gl: WebGL2RenderingContext, mesh: Mesh, material: Material) {
		super();
		this._gl = gl;
		this._mesh = mesh;
		this.material = material;

		
		this._vao = gl.createVertexArray() as WebGLVertexArrayObject;
		gl.bindVertexArray(this._vao);

		this._bindAttributes(gl, mesh, material);
	}

	private _bindAttributes(gl: WebGL2RenderingContext, mesh: Mesh, material: Material) {
		const attributes = mesh.getAttributePointers();
		let lastBuffer: GLBuffer | null = null;
		for (var i = 0; i < attributes.length; i++) {
			var attrib = attributes[i];
			if (lastBuffer !== attrib.buffer) {
				attrib.buffer.bind();
				lastBuffer = attrib.buffer;
			}
			attrib.bind(gl, material.shader);
		}
	}
	


	public render(matrix: mat4) {
		this._gl.bindVertexArray(this._vao);
		this.material.use(this._gl, matrix);
		this._mesh.performDrawCall();
	}
}