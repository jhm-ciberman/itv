import DisplayObject3D from "../nodes/DisplayObject3D";
import WorldRenderer3D from "./WorldRenderer3D";
import PerspectiveCamera from "./PerspectiveCamera";

export default class Stage3D {
	
	private _rootNode: DisplayObject3D | null = null;
	
	private _renderer: WorldRenderer3D;

	private _camera: PerspectiveCamera;

	constructor(gl: WebGL2RenderingContext) {
		this._renderer = new WorldRenderer3D(gl);
		this._camera = new PerspectiveCamera(gl);
	}

	public render() {
		if (this._rootNode) {
			this._renderer.render(this._rootNode, this._camera);
		}
	}

	public get rootNode(): DisplayObject3D | null {
		return this._rootNode;
	}

	public set rootNode(value: DisplayObject3D | null) {
		this._rootNode = value;
	} 


}