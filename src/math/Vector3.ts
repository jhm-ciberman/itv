import { vec3 } from "gl-matrix";

export default class Vector3 {

	static readonly ONE: Vector3 = new Vector3(1, 1, 1);
	static readonly ZERO: Vector3 = new Vector3(0, 0, 0);
	static readonly UP: Vector3 = new Vector3(0, 1, 0);
	static readonly RIGHT: Vector3 = new Vector3(1, 0, 0);
	static readonly FORWARD: Vector3 = new Vector3(0, 0, 1);

	private _value: vec3;
	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this._value = vec3.fromValues(x, y, z);
	}

	get rawData() {
		return this._value;
	}

	set rawData(value: vec3) {
		this._value = value;
	}

	get x() {
		return this._value[0];
	}

	set x(value: number) {
		this._value[0] = value;
	}

	get y() {
		return this._value[1];
	}

	set y(value: number) {
		this._value[1] = value;
	}

	get z() {
		return this._value[2];
	}

	set z(value: number) {
		this._value[2] = value;
	}

	public set(x: number, y:number, z?:number): Vector3 {
		this._value[0] = x;
		this._value[1] = y;
		if (z !== undefined) {
			this._value[2] = z;
		}
		return this;
	}

	public dot(vector: Vector3): number {
		return vec3.dot(this._value, vector.rawData);
	}

	public cross(vector: Vector3): Vector3 {
		const v = new Vector3();
		vec3.cross(v.rawData, this._value, vector.rawData);
		return v;
	}

	public substract(vector: Vector3): Vector3 {
		const v = new Vector3();
		vec3.subtract(v.rawData, this._value, vector.rawData);
		return v;
	}

	public equals(vector: Vector3): boolean {
		return vec3.equals(this._value, vector.rawData);
	}

	public toString() {
		return `Vector3(${this._value[0]}, ${this._value[1]}, ${this._value[2]})`;
	}
}