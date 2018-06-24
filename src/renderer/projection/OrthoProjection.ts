import { mat4 } from "gl-matrix";

export default class OrthoProjection {

	public getMatrix(width: number, height: number) {
		const proj = mat4.create();
		height *= .5;
		width *= .5;
		mat4.ortho(proj, -width, width, height, -height, -10, 100);
		return proj;
	}

}