export interface IView<T, S = object> {
	element: HTMLElement;
	copy(settings?: S): IView<T>;
	render(data?: Partial<T>): HTMLElement;
}

export interface IViewConstructor<T, S> {
	new (root: HTMLElement, settings: S): IView<T>;
}

export type IClickableEvent<T> = { event: MouseEvent; item?: T };
export interface IClickable<T> {
	onClick: (args: IClickableEvent<T>) => void;
}
export type IChangeableEvent<T> = { event: Event; value?: T };
export interface IChangeable<T> {
	onChange: (args: IChangeableEvent<T>) => void;
}

export type ISelectableEvent<T> = { event: Event; value?: T };
export interface ISelectable<T> {
	onSelect: (args: ISelectableEvent<T>) => void;
}
