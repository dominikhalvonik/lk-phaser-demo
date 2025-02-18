// eslint-disable-next-line vue/prefer-import-from-vue
import { type IfAny } from "@vue/shared";
import { produce, type WritableDraft } from "immer";
import { computed, type ComputedRef, ref, type Ref, type UnwrapRef } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReturnValueOfVueRef<T> = [T] extends [Ref<any, any>]
	? IfAny<T, Ref<T, T>, T>
	: Ref<UnwrapRef<T>, T | UnwrapRef<T>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createImmutableState = <T extends Record<string, any>>(
	state: T,
): ReturnValueOfVueRef<T> =>
	ref<T>(
		produce<T, WritableDraft<T>>({} as T, (draft: WritableDraft<T>): void =>
			Object.keys(state).forEach((key: keyof T): void => {
				draft[key] = state[key];
			}),
		),
	);

export const getImmutableStateProperty = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Record<string, any>,
	U extends keyof T,
>(
	state: ReturnValueOfVueRef<T>,
	property: U,
	fallback: T[U],
): ComputedRef<T[U]> =>
	computed<T[U]>((): T[U] => state.value?.[property] ?? fallback);

export const setImmutableStateProperty = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Record<string, any>,
	U extends keyof T,
>(
	state: ReturnValueOfVueRef<T>,
	property: U,
	value: T[U],
): void => {
	state.value = produce<T, WritableDraft<T>>(
		state.value,
		(draft: WritableDraft<T>): void => {
			draft[property] = value;
		},
	);
};
