import { vec3 } from "gl-matrix";

export default class Vector3 {

	private _v: vec3;

	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this._v = vec3.fromValues(x, y, z);
	}

	public get value(): vec3 {
		return this._v;
	}


}