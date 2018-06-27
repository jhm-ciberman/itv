import { mat4 } from "gl-matrix";
import DisplayObject3D from "../DisplayObject3D";

export default abstract class Camera3D extends DisplayObject3D {

	private readonly _inverseWorldMatrix: mat4 = mat4.create();
	protected readonly _projectionMatrix: mat4 = mat4.create();
	constructor() {
		super();
	}

	public get inverseWorldMatrix():mat4 {
		if (this.transform.worldMatrixIsDirty) {
			this.transform.updateWorldMatrix(false);
		}
		mat4.invert(this._inverseWorldMatrix, this.transform.lastComputedWorldMatrix);
		//mat4.copy(this._inverseWorldMatrix, this.transform.lastComputedWorldMatrix);
		return this._inverseWorldMatrix;
	}

	public abstract computeProjectionMatrix(aspect: number): mat4;


}