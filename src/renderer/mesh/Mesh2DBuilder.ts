import Mesh2D from "./Mesh2D";
import IndexedMesh2D from "./IndexedMesh2D";

export default class Mesh2DBuilder {

	public vertices: number[] = [];
	public uvs: number[] = [];
	public indices: number[] = [];

	private _gl: WebGL2RenderingContext;
	constructor(gl: WebGL2RenderingContext) {
		this._gl = gl;
	}

	public build(): Mesh2D {
		if (this.indices.length > 0) {
			return new IndexedMesh2D(this._gl, this);
		} else {
			return new Mesh2D(this._gl, this);
		}
	}
}