import React from "react";
import { View } from "react-native";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as CartActions from "../../store/modules/cart/actions";
//icones
import FeatherIcon from "react-native-vector-icons/Feather";
//componentes
import EmptyCart from "../../components/EmptyCart";
//style
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
} from "./style";
//utils
import formatValue from "../../utils/formatValue";
export default function Cart() {
	const dispatch = useDispatch();
	const products = useSelector(({ cart }) => cart);

	const cartSize = useMemo(() => {
		return products.length || 0;
	}, [products]);

	const cartTotal = useMemo(() => {
		return products.reduce((acc, product) => {
			const totalPrice = acc + product.price * product.amount;
			return totalPrice;
		}, 0);
	});
	function increment(product) {
		dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
	}

	function decrement(product) {
		dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
	}
	function removeFromCart(id) {
		dispatch(CartActions.removeFromCart(id));
	}
	return (
		<Container>
			<ProductContainer>
				<ProductList
					data={products}
					keyExtractor={(item) => item.id}
					ListFooterComponent={<View />}
					ListFooterComponentStyle={{
						height: 80,
					}}
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
				/>
			</ProductContainer>

			<TotalProductContainer>
				<TotalProductTextContainer>
					<FeatherIcon name="shopping-cart" color="white" size={24} />
					<TotalProductText>
						{cartSize} {cartSize > 1 ? "itens" : "item"}
					</TotalProductText>
				</TotalProductTextContainer>
				<SUbTotalValue>{formatValue(cartTotal)}</SUbTotalValue>
			</TotalProductContainer>
		</Container>
	);
}
