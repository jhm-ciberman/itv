import MeshRenderer from "../nodes/MeshRenderer";
import Module from "./Module";
import Camera3D from "../nodes/projection/Camera3D";

export default class TestModule3D extends Module {
	private _mesh: MeshRenderer;
	private _camera: Camera3D;

	private _video: HTMLVideoElement;
	private _canPlay: boolean = false;
	private _time: number = 0;
	constructor(mesh: MeshRenderer, camera: Camera3D) {
		super();
		this._mesh = mesh;
		this._video = this._createVideo();
		this._camera = camera;
	} 

	private _createVideo(): HTMLVideoElement {
		const video = document.createElement("video");
		video.src = "https://mdn.github.io/webgl-examples/tutorial/sample8/Firefox.mp4";
		video.addEventListener("canplaythrough", () => {
			this._video.play();
			this._video.volume = 0;
			this._canPlay = true;
		});
		return video;
	}

	public update(deltaTime: number) {
		this._time += deltaTime;
		if (this._canPlay) {
			//(this._mesh.texture as GLTexture).updateTexture(this._video);
		}
		//this._mesh.setScale(.5, .5, .5)
		this._camera.setPosition(Math.cos(this._time) * 2, 0, 0);
		this._camera.lookAt(0, 0, -10);
		this._mesh.rotateX(10 * deltaTime).rotateZ(5 * deltaTime).rotateX(3 * deltaTime);
	}
}