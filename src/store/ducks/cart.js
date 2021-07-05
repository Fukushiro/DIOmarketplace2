import { createActions, createReducer } from "reduxsauce";
import api from "../../services/api";
import { all, put, select, takeLatest, call } from "redux-saga/effects";
let count = 0;
export const { Types, Creators } = createActions({
	addCartRequest: ["id"],
	addCart: ["product"],
	// removeCart: ["id"],
	// updateAmountCart: ["id", "amount"],
});

const INITIAL_STATE = [];

const add = (state = INITIAL_STATE, action) => {
	return [...state, action.product];
};

function* get(state = INITIAL_STATE, action) {
	yield put(console.log("adicionado"));
	const productExists = select((state) =>
		state.cart.find((product) => product.id == action.id)
	);
	console.log(productExists);
	const currentAmount = productExists ? productExists.amount : 0;
	const amount = currentAmount + 1;
	const response = api.get("products/" + action.id); //call(api.get, `products/${action.id}`);
	console.log(response);
	if (productExists) {
		//atualiza carrinho
		//	yield put(updateAmountSuccess(id, amount));
	} else {
		// const response = call(api.get, `products/${action.id}`);

		const data = {
			...response.data,
			amount: 1,
			priceFormatted: formatValue(response.data.price),
		};

		add(data);
	}
	return state;
}
// const remove = (state = INITIAL_STATE, action) => {
// 	const productIndex = state.findIndex((p) => p.id == action.id);
// 	if (productIndex >= 0) {
// 		state.splice(productIndex, 1);
// 	}
// 	return state;
// };
export default createReducer(INITIAL_STATE, {
	[Types.ADD_CART]: add,
	[Types.ADD_CART_REQUEST]: get,
});
