export default interface IDisplayObject {
	/**
	 * return all the children display objects
	 */
	children: IterableIterator<IDisplayObject>;
}