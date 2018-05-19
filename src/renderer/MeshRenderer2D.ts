import Material from "./Material";
import GLBuffer from "../gl/GLBuffer";
import Mesh2D from "./mesh/Mesh2D";

export default class MeshRenderer2D {

	private _gl: WebGL2RenderingContext;
	private _mesh: Mesh2D;
	private _material: Material;

	private _vao: WebGLVertexArrayObject;

	constructor(gl: WebGL2RenderingContext, mesh: Mesh2D, material: Material) {
		this._gl = gl;
		this._mesh = mesh;
		this._material = material;

		
		this._vao = gl.createVertexArray() as WebGLVertexArrayObject;
		gl.bindVertexArray(this._vao);

		this._bindAttributes(gl, mesh, material);

		// and make it the one we're currently working with


	}

	private _bindAttributes(gl: WebGL2RenderingContext ,mesh: Mesh2D, material: Material) {
		const attributes = mesh.getAttributePointers();
		let lastBuffer: GLBuffer | null = null;
		for (var i = 0; i < attributes.length; i++) {
			var attrib = attributes[i];
			if (lastBuffer !== attrib.buffer) {
				attrib.buffer.bind();
				lastBuffer = attrib.buffer;
			}
			console.log("Bind: ", attrib.name);
			attrib.bind(gl, material.shader);
		}
	}

	public draw(): void {
		console.log("draw");
		this._gl.bindVertexArray(this._vao);
		this._material.use();
		this._mesh.performDrawCall();
	}
}