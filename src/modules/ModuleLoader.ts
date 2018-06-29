import Module from "./Module";
import * as path from "path";
import Scene from "../window/Viewport";

export default abstract class ModuleLoader {


	protected _resolve(relativePath: string): string {
		return path.resolve(__dirname, "../../res/", relativePath);
	}
	

	// TODO: remove this gl argument
	public abstract async load(stage: Scene): Promise<Module>;

	protected async _loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise<HTMLImageElement>((resolve) => {
			const image = new Image();
			image.src = this._resolve(src);  // MUST BE SAME DOMAIN!!!
			image.onload = function () {
				resolve(image);
			}
		});
	}
}