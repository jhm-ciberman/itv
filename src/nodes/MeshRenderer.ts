import GLBuffer from "../gl/GLBuffer";
import Node3D from "./Node3D";
import { mat4 } from "gl-matrix";
import Mesh from "../renderer/mesh/Mesh";
import Material from "../renderer/Material";

export default class MeshRenderer extends Node3D{

	private _gl: WebGL2RenderingContext;
	private _mesh: Mesh;
	private _material: Material;

	private _vao: WebGLVertexArrayObject;

	constructor(gl: WebGL2RenderingContext, mesh: Mesh, material: Material) {
		super();
		this._gl = gl;
		this._mesh = mesh;
		this._material = material;

		
		this._vao = gl.createVertexArray() as WebGLVertexArrayObject;
		gl.bindVertexArray(this._vao);

		this._bindAttributes(gl, mesh, material);
	}

	private _bindAttributes(gl: WebGL2RenderingContext ,mesh: Mesh, material: Material) {
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

	protected _renderItself(worldMatrix: mat4) {
		this._updateWorldMatrix(worldMatrix);
		console.log(this._localMatrix);
		console.log(this._worldMatrix);
		this._gl.bindVertexArray(this._vao);
		this._material.use(this._gl, this._worldMatrix);
		this._mesh.performDrawCall();
		super._renderChildren(worldMatrix);
	}
}