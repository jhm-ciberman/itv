import ModuleLoader from "./ModuleLoader";
import Module from "./Module";
import TestModule from "./TestModule3D";
import Stage from "../renderer/Stage";
import MeshRenderer from "../nodes/MeshRenderer";
import CubeMesh from "../renderer/mesh/CubeMesh";
import DisplayObject from "../nodes/DisplayObject";
import PerspectiveCamera from "../nodes/projection/PerspectiveCamera";
import Texture from "../renderer/Texture";

export default class TestModule3DLoader extends ModuleLoader {



	public async load(gl: WebGL2RenderingContext, stage: Stage): Promise<Module> {
		const image1 = await this._loadImage("sonny.jpg");
		const image2 = await this._loadImage("atm_cash.png");

		const s = 2;
		const mesh = new CubeMesh(gl);
		const texture1 = new Texture(image1);
		const texture2 = new Texture(image2);
		// Sonny
		const renderer = new MeshRenderer(mesh, texture1);
		renderer.setScale(s, s, s);
		renderer.setPosition(0, 0, 10);


		// Bill
		const renderer2 = new MeshRenderer(mesh, texture2);
		renderer2.setScale(s,s,s);
		renderer2.setPosition(2, 0, -10);

		const floor = new MeshRenderer(mesh, texture1);
		floor.setPosition(0, -2, 0).setScale(5, 1, 5);

		const root = new DisplayObject();
		root.addChild(renderer);
		root.addChild(renderer2);
		root.addChild(floor);

		stage.rootNode = root;

		const cam = new PerspectiveCamera(45);
		//const ss = 10;
		//const cam = new OrthographicCamera(-ss, ss, ss, -ss, -100, 100);

		stage.camera = cam;
		return new TestModule(renderer, cam);


	}

}