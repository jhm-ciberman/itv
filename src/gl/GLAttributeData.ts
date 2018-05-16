import GLBuffer from "./GLBuffer";

export default class GLAttributeData {
	public buffer: GLBuffer;
	public location: number;
	public size: number;
	public normalized: boolean;
	public stride: number;
	public start: number;

	constructor(buffer: GLBuffer, location: number, size: number, normalized: boolean = false, stride: number = 0, start: number = 0) {
		this.buffer = buffer;
		this.location = location;
		this.size = size;
		this.normalized = normalized;
		this.stride = stride;
		this.start = start;
	}
}