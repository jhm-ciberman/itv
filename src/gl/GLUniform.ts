export default class GLUniform {

	public size: number;
	public location: WebGLUniformLocation;

	constructor(size: number, location: WebGLUniformLocation) {
		this.size = size;
		this.location = location;
	}
}