import { mat4 } from "gl-matrix";
import Quaternion from "./Quaternion";
import Vector3 from "./Vector3";
import DisplayObject from "../nodes/DisplayObject";

export default class Transform {

	protected readonly _localMatrix: mat4 = mat4.create();
	protected readonly _worldMatrix: mat4 = mat4.create();
	protected _dirtyWorldMatrix: boolean = true;
	protected _dirtyLocalMatrix: boolean = false;

	protected _rotation: Quaternion = new Quaternion();
	protected _position: Vector3 = new Vector3();
	protected _scale: Vector3 = new Vector3(1, 1, 1);

	private readonly _displayObject: DisplayObject;

	constructor(displayObject: DisplayObject) {
		this._displayObject = displayObject;
	}

	public get localMatrix(): mat4 {
		if (this._dirtyLocalMatrix) {
			mat4.fromRotationTranslationScale(
				this._localMatrix,
				this._rotation.rawData,
				this._position.rawData,
				this._scale.rawData,
			);
			this._dirtyLocalMatrix = false;
		}
		return this._localMatrix;
	}

	public get lastComputedWorldMatrix(): mat4 {
		return this._worldMatrix;
	}



	public get position(): Vector3 {
		return this._position;
	}

	public set position(value: Vector3) {
		this._position = value;
		this._dirtyWorldMatrix = this._dirtyLocalMatrix = true;
	}

	public get scale(): Vector3 {
		return this._scale;
	}

	public set scale(value: Vector3) {
		this._scale = value;
		this._dirtyWorldMatrix = this._dirtyLocalMatrix = true;
	}

	public get rotation(): Quaternion {
		return this._rotation;
	}

	public set rotation(value: Quaternion) {
		this._rotation = value;
		this._dirtyWorldMatrix = this._dirtyLocalMatrix = true;
	}

	public updateWorldMatrix(force: boolean) {
		if (force || this._dirtyWorldMatrix) {
			const parent = this._displayObject.parent;
			if (parent !== null) {
				mat4.multiply(this._worldMatrix, parent.transform._worldMatrix, this.localMatrix);
			} else {
				mat4.copy(this._worldMatrix, this.localMatrix);
			}

			this._dirtyWorldMatrix = false;
			force = true;
		}

		for(const child of this._displayObject.children) {
			child.transform.updateWorldMatrix(force);
		}
	}


	public set worldMatrixIsDirty(value: boolean) {
		this._dirtyWorldMatrix = value;
	}

	public get worldMatrixIsDirty(): boolean {
		return this._dirtyWorldMatrix;
	}

}