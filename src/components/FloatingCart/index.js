import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import formatValue from '../../utils/formatValue';
import { Creators } from '../../store/ducks/cart/cart';
import { bindActionCreators } from 'redux';
import {
	Container,
	CartPricing,
	CartButton,
	CartButtonText,
	CartTotalPrice,
} from './style';
import { connect } from 'react-redux';
const mapDispatchToProps = (dispatch) => bindActionCreators(Creators, dispatch);
const mapStateToProps = (state) => ({
	cart: state.cart,
});
const FloatingCart = ({ cart }) => {
	const navigation = useNavigation();
	const [state, setState] = useState(false);
	const products = cart; //useSelector(({ cart }) => cart);
	useEffect(() => {
		async function loadProducts() {
			setState(!state);
		}

		loadProducts();
	}, [cart]);
	const cartSize = useMemo(() => {
		return cart.length || 0;
	}, [cart]);
	const cartTotal = useMemo(() => {
		return cart.reduce((acc, prod) => {
			const totalPrice = acc + prod.price * prod.amount;

			return totalPrice;
		}, 0);
	});
	return (
		<Container>
			<CartButton onPress={() => navigation.navigate('Cart')}>
				<FeatherIcon name="shopping-cart" size={24} color="#f3f9ff" />
				<CartButtonText>
					{cartSize} {cartSize > 1 ? 'itens' : 'item'}
				</CartButtonText>
				<CartPricing>
					<CartTotalPrice>R${cartTotal}</CartTotalPrice>
				</CartPricing>
				<FeatherIcon name="chevron-right" size={24} color="#f3f9ff" />
			</CartButton>
		</Container>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(FloatingCart);
