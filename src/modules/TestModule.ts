import MeshRenderer from "../nodes/MeshRenderer";
import GLTexture from "../gl/GLTexture";
import Module from "./Module";

export default class TestModule extends Module {
	private _mesh: MeshRenderer;

	private _video: HTMLVideoElement;
	private _canPlay: boolean = false;

	constructor(mesh: MeshRenderer) {
		super();
		this._mesh = mesh;
		this._video = this._createVideo();
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
		console.log(deltaTime)
		if (this._canPlay) {
			(this._mesh.material.texture as GLTexture).updateTexture(this._video);
		}
		this._mesh.setScale(.5, .5, .5)
		this._mesh.rotateY(10 * deltaTime).rotateZ(5 * deltaTime).rotateX(3 * deltaTime);
	}
}