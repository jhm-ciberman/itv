import MeshRenderer from "./nodes/MeshRenderer";
import GLTexture from "./gl/GLTexture";

export default class TestModule {
	private _mesh: MeshRenderer;

	private _video: HTMLVideoElement;
	private _canPlay: boolean = false;

	constructor(mesh: MeshRenderer) {
		this._mesh = mesh;

		this._video = document.createElement("video");
		this._video.src = "https://mdn.github.io/webgl-examples/tutorial/sample8/Firefox.mp4";
		this._video.addEventListener("canplaythrough", () => {
			this._video.play();
			this._video.volume = 0;
			this._canPlay = true;
		});
	} 

	public update(deltaTime: number) {
		console.log(deltaTime)
		if (this._canPlay) {
			(this._mesh.material.texture as GLTexture).updateTexture(this._video);
		}
		this._mesh.setScale(.3, .3, .3)
		this._mesh.rotateY(10 * deltaTime).rotateZ(5 * deltaTime).rotateX(3 * deltaTime);
	}
}