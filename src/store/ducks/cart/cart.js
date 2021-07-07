import { createActions, createReducer } from 'reduxsauce';
import api from '../../../services/api';
import { all, put, select, takeLatest, call } from 'redux-saga/effects';
let count = 0;
export const { Types, Creators } = createActions({
	addCartRequest: ['id'],
	addCart: ['product'],
	updateAmountCartRequest: ['id', 'amount'],
	updateAmountCart: ['id', 'amount'],
	removeCart: ['id'],
	removeCartRequest: ['id'],
	// removeCart: ["id"],
});

const INITIAL_STATE = [];

//Adiciona um novo produto
const add = (state = INITIAL_STATE, action) => {
	return [...state, action.product];
};

//atualiza produto com os parametros id e amount
const update = (state = INITIAL_STATE, action) => {
	const prodIndex = state.findIndex((p) => p.id == action.id);
	if (prodIndex >= 0) {
		novo = [...state];
		novo[prodIndex].amount = Number(action.amount); //state[prodIndex].amount = Number(action.amount);
		return novo;
	}

	return state;
};
const remove = (state = INITIAL_STATE, action) => {
	const prodIndex = state.findIndex((p) => p.id == action.id);
	let clone = state.slice();
	if (prodIndex >= 0) {
		console.log(state.splice(prodIndex, 1));
		clone.splice(prodIndex, 1);
	}

	return clone;
};
export default createReducer(INITIAL_STATE, {
	[Types.ADD_CART]: add,
	[Types.UPDATE_AMOUNT_CART]: update,
	[Types.REMOVE_CART]: remove,
});
