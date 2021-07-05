import { all, put, select, takeLatest, call } from "redux-saga/effects";
import api from "../../../services/api";
import formatValue from "../../../utils/formatValue";
import {
	addToCartSuccess,
	updateAmountRequest,
	updateAmountSuccess,
	addCountRequest,
} from "./actions";

import { addCart } from "../../ducks/cart";
function* addToCart({ id }) {
	const productExists = yield select((state) =>
		state.cart.produtos.find((product) => product.id == id)
	);

	const currentAmount = productExists ? productExists.amount : 0;
	const amount = currentAmount + 1;
	if (productExists) {
		//atualiza carrinho
		yield put(updateAmountSuccess(id, amount));
	} else {
		const response = yield call(api.get, `products/${id}`);

		const data = {
			...response.data,
			amount: 1,
			priceFormatted: formatValue(response.data.price),
		};

		yield put(addCart(data));
	}
}

function* updateAmount({ id, amount }) {
	if (amount <= 0) {
		return;
	}
	yield put(updateAmountSuccess(id, amount));
}

function* addCount({ val }) {
	yield put(addCountSuccess(val));
}
export default all([
	takeLatest("@cart/ADD_REQUEST", addToCart),
	takeLatest("@cart/UPDATE_AMOUNT_REQUEST", updateAmount),
	takeLatest("@teste/ADD_REQUEST", addCount),
]);
