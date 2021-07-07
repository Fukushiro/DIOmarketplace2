import { all, put, select, takeLatest, call } from "redux-saga/effects";
import api from "../../../services/api";
import formatValue from "../../../utils/formatValue";
import {
	addToCartSuccess,
	updateAmountRequest,
	updateAmountSuccess,
	addCountRequest,
} from "../../modules/cart/actions";
import { Types, Creators } from "./cart";

import { addCart } from "./cart";
function* addToCart({ id }) {
	const productExists = yield select((state) =>
		state.cart.find((product) => product.id == id)
	);

	const currentAmount = productExists ? productExists.amount : 0;
	const amount = currentAmount + 1;

	if (productExists) {
		//atualiza carrinho
		yield put(Creators.updateAmountCart(id, amount));
	} else {
		const response = yield call(api.get, `products/${id}`);

		const data = {
			...response.data,
			amount: 1,
			priceFormatted: formatValue(response.data.price),
		};

		yield put(Creators.addCart(data));
	}
}

function* updateAmount({ id, amount }) {
	if (amount <= 0) {
		return;
	}
	yield put(Creators.updateAmountCart(id, amount));
}

function* addCount({ val }) {
	yield put(addCountSuccess(val));
}

function* remove({ id }) {
	yield put(Creators.removeCart(id));
}
export default all([
	takeLatest(Types.ADD_CART_REQUEST, addToCart),
	takeLatest(Types.UPDATE_AMOUNT_CART_REQUEST, updateAmount),
	takeLatest(Types.REMOVE_CART_REQUEST, remove),
]);
