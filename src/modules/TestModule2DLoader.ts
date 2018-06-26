import ModuleLoader from "./ModuleLoader";
import Sprite from "../nodes/Sprite";
import GLTexture from "../gl/GLTexture";
import TestModule2D from "./TestModule2D";
import Stage from "../renderer/Stage";
import OrthographicCamera from "../nodes/projection/OrthographicCamera";

export default class TestModule2DLoader extends ModuleLoader {
	public async load(gl: WebGL2RenderingContext, stage: Stage) {
		const image = await this._loadImage("sonny.jpg");
		const sprite = new Sprite();
		
		sprite.setPosition(400, 300, 0);
		sprite.setScale(400, 300, 1);
		sprite.texture = new GLTexture(gl, image);
		stage.rootNode = sprite;
		stage.camera = new OrthographicCamera(-400, 400, -300, 300);
		return new TestModule2D(sprite);
	}
}