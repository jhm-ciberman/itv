import IndexedMesh from "./IndexedMesh";
import MeshBuilder from "./MeshBuilder";

export default class Quad extends IndexedMesh {
	constructor(gl: WebGL2RenderingContext) {
		const builder = new MeshBuilder(gl);
		builder.vertices = [
			-.50, -.50, 0,
			.50, -.50, 0,
			.50, .50, 0,
			-.50, .50, 0,
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