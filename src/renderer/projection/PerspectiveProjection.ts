import { mat4 } from "gl-matrix";

export default class PerspectiveProjection {

	public getMatrix(width: number, height: number) {
		const proj = mat4.create();
		mat4.perspective(proj, 45 * Math.PI / 180, width / height, 0.1, 1000);
		return proj;
	}

}