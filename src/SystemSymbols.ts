export default class SystemSymbols {
	public static readonly childNodes: unique symbol = Symbol("childItems");

	public static readonly render: unique symbol = Symbol("render");
	
	public static readonly updateWorldMatrix: unique symbol = Symbol("updateWorldMatrix");
}