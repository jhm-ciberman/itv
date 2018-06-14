import IndexedMesh from "./IndexedMesh";
import Mesh from "./Mesh";

export default class MeshBuilder {

	public vertices: number[] = [];
	public uvs: number[] = [];
	public indices: number[] = [];

	private _gl: WebGL2RenderingContext;
	constructor(gl: WebGL2RenderingContext) {
		this._gl = gl;
	}

	public build(): Mesh {
		if (this.indices.length > 0) {
			return new IndexedMesh(this._gl, this);
		} else {
			return new Mesh(this._gl, this);
		}
	}
}