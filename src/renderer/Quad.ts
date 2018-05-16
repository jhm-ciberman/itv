import Mesh from "./Mesh";

export default class Quad extends Mesh {
	constructor(gl: WebGL2RenderingContext) {
		const vertices = new Float32Array([
			-.5, -.5,
			.5, -.5,
			.5, .5,
			-.5, .5,
		]);
		const uvs = new Float32Array([
			0, 0,
			1, 0,
			1, 1,
			0, 1,
		]);
		const indices = new Uint8Array([0, 1, 2, 0, 2, 3]);
		super(gl, vertices, uvs, indices);
	}
}