import MeshBuilder from "./MeshBuilder";
import IndexedMesh from "./IndexedMesh";

export default class Cube extends IndexedMesh {
	constructor(gl: WebGL2RenderingContext) {
		const builder = new MeshBuilder(gl);
		builder.vertices = [
			// Front face
			-1.0, -1.0, 1.0,
			1.0, -1.0, 1.0,
			1.0, 1.0, 1.0,
			-1.0, 1.0, 1.0,

			// back face
			-1.0, -1.0, -1.0,
			-1.0, 1.0, -1.0,
			1.0, 1.0, -1.0,
			1.0, -1.0, -1.0,

			// Top face
			-1.0, 1.0, -1.0,
			-1.0, 1.0, 1.0,
			1.0, 1.0, 1.0,
			1.0, 1.0, -1.0,

			// Bottom face
			-1.0, -1.0, -1.0,
			1.0, -1.0, -1.0,
			1.0, -1.0, 1.0,
			-1.0, -1.0, 1.0,

			// Right face
			1.0, -1.0, -1.0,
			1.0, 1.0, -1.0,
			1.0, 1.0, 1.0,
			1.0, -1.0, 1.0,

			// Left face
			-1.0, -1.0, -1.0,
			-1.0, -1.0, 1.0,
			-1.0, 1.0, 1.0,
			-1.0, 1.0, -1.0
		];
		builder.uvs = [
			0, 0,
			1, 0,
			1, 1,
			0, 1,
			
			0, 0,
			1, 0,
			1, 1,
			0, 1,

			0, 0,
			1, 0,
			1, 1,
			0, 1,

			0, 0,
			1, 0,
			1, 1,
			0, 1,

			0, 0,
			1, 0,
			1, 1,
			0, 1,

			0, 0,
			1, 0,
			1, 1,
			0, 1,
		];
		builder.indices = [
			0, 1, 2, 0, 2, 3,    // front
			4, 5, 6, 4, 6, 7,    // back
			8, 9, 10, 8, 10, 11,   // top
			12, 13, 14, 12, 14, 15,   // bottom
			16, 17, 18, 16, 18, 19,   // right
			20, 21, 22, 20, 22, 23    // left
		];;
		super(gl, builder);
	}
}