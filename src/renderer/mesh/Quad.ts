import Mesh2DBuilder from "./Mesh2DBuilder";
import IndexedMesh2D from "./IndexedMesh2D";

export default class Quad extends IndexedMesh2D {
	constructor(gl: WebGL2RenderingContext) {
		const builder = new Mesh2DBuilder(gl);
		builder.vertices = [
			-.5, -.5,
			.5, -.5,
			.5, .5,
			-.5, .5,
		];
		builder.uvs = [
			0, 0,
			1, 0,
			1, 1,
			0, 1,
		];
		builder.indices = [0, 1, 2, 0, 2, 3];
		super(gl, builder);
	}
}