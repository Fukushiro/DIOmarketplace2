import React, { useEffect } from 'react';
import { View, RefreshControl, Text } from 'react-native';
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';
//icones
import FeatherIcon from 'react-native-vector-icons/Feather';
//componentes
import EmptyCart from '../../components/EmptyCart';
import { useNavigation } from '@react-navigation/native';
import { Creators } from '../../store/ducks/cart/cart';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//style
import Teste from '../teste';
import {
	Container,
	ProductPrice,
	ProductTitle,
	ProductImage,
	Product,
	ProductContainer,
	ProductList,
	ActionButton,
	ActionContainer,
	ProductPriceContainer,
	ProductQuantity,
	ProductSinglePrice,
	ProductTitleContainer,
	SUbTotalValue,
	TotalProductContainer,
	TotalProductText,
	TotalContainer,
	TotalProductTextContainer,
	ProductListScrool,
} from './style';
//utils
import formatValue from '../../utils/formatValue';
import { render } from 'react-dom';
const Cart = ({ cart, updateAmountCartRequest, removeCartRequest }) => {
	let [state2, setState2] = useState({ refreshing: false, prod: products });
	const matheus = useNavigation();
	const [state, setState] = useState(false);
	const dispatch = useDispatch();
	const products = useSelector(({ cart }) => cart);
	const [refreshing, setRefreshing] = useState(false);
	useEffect(() => {
		async function a() {
			setState(!state);
		}
		// console.log(cart);
		a();
	}, [cart]);
	const cartSize = useMemo(() => {
		return cart.length || 0;
	}, [cart]);

	const cartTotal = useMemo(() => {
		return cart.reduce((acc, product) => {
			const totalPrice = acc + product.price * product.amount;
			return totalPrice;
		}, 0);
	});
	function increment(product) {
		updateAmountCartRequest(product.id, product.amount + 1);
	}

	function decrement(product) {
		//dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
		updateAmountCartRequest(product.id, product.amount - 1);
	}

	// setTimeout(
	// 	function () {
	// 		setRefreshing(!refreshing);
	// 		// console.log("refresh");
	// 	}.bind(this),
	// 	1000
	// );
	function removeFromCart(id) {
		//setState(true);
		// matheus.navigate("Catalog");
		// matheus.navigate("Cart");
		//dispatch(CartActions.removeFromCart(id));
		removeCartRequest(id);
		// console.log(products);

		setState(!state);
	}
	const refresh = () => {
		this.setState2({
			refreshing: true,
			prod: cart,
		});

		setTimeout(
			() =>
				this.setState2({
					refreshing: false,
					prod: cart,
				}),
			1500
		);
	};
	const onRefresh = React.useCallback(async () => {
		setRefreshing(!refreshing);
	}, [refreshing]);
	const lista = (item) => {
		// render();
		return (
			<Product key={item.id}>
				<ProductImage source={{ uri: item.image_url }} />
				<ProductTitleContainer>
					<ProductTitle>{item.title}</ProductTitle>
					<ProductPriceContainer>
						<ProductSinglePrice>{formatValue(item.price)}</ProductSinglePrice>
						<TotalContainer>
							<ProductQuantity>{item.amount}</ProductQuantity>

							<ProductPrice>
								{formatValue(item.price * item.amount)}
							</ProductPrice>
						</TotalContainer>
					</ProductPriceContainer>
				</ProductTitleContainer>
				<ActionContainer>
					<ActionButton
						onPress={() => {
							increment(item);
						}}
					>
						<FeatherIcon name="plus" color="#e83f5b" size={16} />
					</ActionButton>
					<ActionButton
						onPress={() => {
							if (item.amount > 1) {
								decrement(item);
							} else {
								removeFromCart(item.id);
							}
						}}
					>
						<FeatherIcon name="minus" color="#e83f5b" size={16} />
					</ActionButton>
				</ActionContainer>
			</Product>
		);
	};
	// function onRefresh() {
	// 	products = useSelector(({ cart }) => cart);
	// 	setState(false);
	// 	console.log(state);
	// }
	return (
		<Container>
			{/* {products[0].amount > 2 && <Teste />} */}
			<ProductContainer>
				{/* <ProductList
					data={cart}
					keyExtractor={(item) => item.id.toString()}
					ListFooterComponent={<View />}
					ListFooterComponentStyle={{
						height: 80,
					}}
					extraData={cart}
					refreshControl={
						<RefreshControl
							refreshing={state2.refreshing}
							onRefresh={refresh}
						/>
					}
					ListEmptyComponent={<EmptyCart />}
					renderItem={({ item }) => (
						<Product>
				
							<ProductImage source={{ uri: item.image_url }} />
							<ProductTitleContainer>
								<ProductTitle>{item.title}</ProductTitle>
								<ProductPriceContainer>
									<ProductSinglePrice>
										{formatValue(item.price)}
									</ProductSinglePrice>
									<TotalContainer>
										<ProductQuantity>{item.amount}</ProductQuantity>

										<ProductPrice>
											{formatValue(item.price * item.amount)}
										</ProductPrice>
									</TotalContainer>
								</ProductPriceContainer>
							</ProductTitleContainer>
							<ActionContainer>
								<ActionButton
									onPress={() => {
										increment(item);
									}}
								>
									<FeatherIcon name="plus" color="#e83f5b" size={16} />
								</ActionButton>
								<ActionButton
									onPress={() => {
										if (item.amount > 1) {
											decrement(item);
										} else {
											removeFromCart(item.id);
										}
									}}
								>
									<FeatherIcon name="minus" color="#e83f5b" size={16} />
								</ActionButton>
							</ActionContainer>
						</Product>
					)}
				/> */}
				<ProductListScrool keyExtractor={(item) => item.id}>
					{cartSize > 0 ? cart.map((item) => lista(item)) : <EmptyCart />}
				</ProductListScrool>
			</ProductContainer>

			<TotalProductContainer>
				<TotalProductTextContainer>
					<FeatherIcon name="shopping-cart" color="white" size={24} />
					<TotalProductText>
						{cartSize} {cartSize > 1 ? 'itens' : 'item'}
					</TotalProductText>
				</TotalProductTextContainer>
				<SUbTotalValue>{formatValue(cartTotal)}</SUbTotalValue>
			</TotalProductContainer>
		</Container>
	);
};
const mapDispatchToProps = (dispatch) => bindActionCreators(Creators, dispatch);
const mapStateToProps = (state) => ({
	cart: state.cart,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
