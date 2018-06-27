import MeshRenderer from "../nodes/MeshRenderer";
import Module from "./Module";
import Camera3D from "../nodes/projection/Camera3D";
import Vector3 from "../math/Vector3";

export default class TestModule3D extends Module {
	private _mesh: MeshRenderer;
	private _camera: Camera3D;

	private _video: HTMLVideoElement;
	//private _canPlay: boolean = false;
	constructor(mesh: MeshRenderer, camera: Camera3D) {
		super();
		this._mesh = mesh;
		this._video = this._createVideo();
		this._camera = camera;

		document.addEventListener("keydown", (e) => {
			
			const speed = 0.1;
			if (e.key === "w") {
				this._camera.transform.move(Vector3.FORWARD.mul(speed));
				//this._camera.transform.position = this._camera.transform.position.add(Vector3.FORWARD);
			}
			if (e.key === "s") {
				this._camera.transform.move(Vector3.BACKWARDS.mul(speed));
				//this._camera.transform.position = this._camera.transform.position.substract(Vector3.FORWARD);
			}
			if (e.key === "a") {
				this._camera.transform.move(Vector3.LEFT.mul(speed));
				//this._camera.rotateY(-10);
			}
			if (e.key === "d") {
				this._camera.transform.move(Vector3.RIGHT.mul(speed));
				//this._camera.rotateY(10);
			}
			if (e.key === " ") {
				
			}
			//this._camera.transform.rotation = this._camera.transform.rotation.setEuler(new Vector3(0,90,0))
			this._camera.transform.lookAt(this._mesh.transform.position);
		});
	} 

	private _createVideo(): HTMLVideoElement {
		const video = document.createElement("video");
		video.src = "https://mdn.github.io/webgl-examples/tutorial/sample8/Firefox.mp4";
		video.addEventListener("canplaythrough", () => {
			this._video.play();
			this._video.volume = 0;
			//this._canPlay = true;
		});
		return video;
	}

	public update(deltaTime: number) {
		this._mesh.rotateX(10 * deltaTime)
				.rotateZ(5 * deltaTime)
				.rotateX(3 * deltaTime);
	}
}