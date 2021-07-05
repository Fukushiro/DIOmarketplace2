import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import formatValue from "../../utils/formatValue";
import {
	Container,
	CartPricing,
	CartButton,
	CartButtonText,
	CartTotalPrice,
} from "./style";

export default function FloatingCart() {
	const navigation = useNavigation();

	const products = useSelector(({ cart }) => cart);

	const cartSize = useMemo(() => {
		return products.length || 0;
	}, [products]);
	const cartTotal = useMemo(() => {
		return products.reduce((acc, prod) => {
			const totalPrice = acc + prod.price * prod.amount;
			return totalPrice;
		}, 0);
	});
	return (
		<Container>
			<CartButton onPress={() => navigation.navigate("Cart")}>
				<FeatherIcon name="shopping-cart" size={24} color="#f3f9ff" />
				<CartButtonText>
					{cartSize} {cartSize > 1 ? "itens" : "item"}
				</CartButtonText>
				<CartPricing>
					<CartTotalPrice>{formatValue(cartTotal)}</CartTotalPrice>
				</CartPricing>
				<FeatherIcon name="chevron-right" size={24} color="#f3f9ff" />
			</CartButton>
		</Container>
	);
}
