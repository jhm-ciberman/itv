import ModuleLoader from "./ModuleLoader";
import Sprite from "../nodes/Sprite";
import TestModule2D from "./TestModule2D";
import OrthographicCamera from "../nodes/projection/OrthographicCamera";
import Texture from "../resources/Texture";
import Viewport from "../window/Viewport";

export default class TestModule2DLoader extends ModuleLoader {
	public async load(viewport: Viewport) {
		const image = await this._loadImage("sonny.jpg");
		const sprite = new Sprite();
		sprite.setPosition(0, 0, 0);
		sprite.setScale(500, 647, 1);
		sprite.texture = new Texture(image);
		viewport.scene.addChild(sprite);

		const cam = new OrthographicCamera(400);
		cam.setPosition(0, 0, -1);
		viewport.camera = cam;
		return new TestModule2D(sprite);
	}
}