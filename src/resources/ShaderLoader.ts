import * as fse from "fs-extra";
import * as path from "path";
import Shader from "./Shader";

export default class ShaderLoader {
	public async load(shaderPath: string) {
		shaderPath = path.resolve(__dirname, "../../res/", shaderPath);
		const source = await fse.readFile(shaderPath, "utf8");
		return new Shader(source);
	}
}