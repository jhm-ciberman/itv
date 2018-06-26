import DisplayObject from "./DisplayObject";
import Vector3 from "../math/Vector3";

export default class DisplayObject3D extends DisplayObject {
	public lookAt(x: number, y: number, z: number): this {
		const v = (new Vector3(x, y, z)).substract(this.transform.position);
		if (!v.equals(Vector3.ZERO)) {
			this.transform.rotation = this.transform.rotation.setLookRotation(v);
		}
		return this;
	}
}