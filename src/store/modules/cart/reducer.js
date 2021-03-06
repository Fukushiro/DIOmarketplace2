import produce from "immer";

export default function cart(state = [], action) {
	switch (action.type) {
		case "@cart/ADD_SUCCESS":
			return produce(state, (draft) => {
				const { product } = action;
				draft.push(product);
			}); //[...state, action.product];
		case "@cart/REMOVE":
			return produce(state, (draft) => {
				const productIndex = draft.findIndex((p) => p.id == action.id);
				if (productIndex >= 0) {
					draft.splice(productIndex, 1);
				}
			});
		case "@cart/UPDATE_AMOUNT_SUCCESS":
			return produce(state, (draft) => {
				const productIndex = draft.findIndex((p) => p.id == action.id);
				if (productIndex >= 0) {
					draft[productIndex].amount = Number(action.amount);
				}
			});
		case "@teste/ADD_SUCCESS":
			return produce(state, (draft) => {
				draft = action.val;
			});
		default:
			return state;
	}
}
