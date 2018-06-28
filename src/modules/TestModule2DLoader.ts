import ModuleLoader from "./ModuleLoader";
import Sprite from "../nodes/Sprite";
import TestModule2D from "./TestModule2D";
import Stage from "../renderer/Stage";
import OrthographicCamera from "../nodes/projection/OrthographicCamera";
import Texture from "../renderer/Texture";

export default class TestModule2DLoader extends ModuleLoader {
	public async load(_gl: WebGL2RenderingContext, stage: Stage) {
		const image = await this._loadImage("sonny.jpg");
		const sprite = new Sprite();
		sprite.setPosition(0, 0, 0);
		sprite.setScale(500, 647, 1);
		sprite.texture = new Texture(image);
		stage.rootNode = sprite;

		const cam = new OrthographicCamera(400);
		cam.setPosition(0, 0, -1);
		stage.camera = cam;
		return new TestModule2D(sprite);
	}
}