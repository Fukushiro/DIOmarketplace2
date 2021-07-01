import React from "react";
import { View } from "react-native";
import { useState, useMemo } from "react";
//icones
import FeatherIcon from "react-native-vector-icons/Feather";

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
	const [products, setProducts] = useState([
		{
			id: "1",
			title: "Assinatura trimestral",
			image_url:
				"https://res.cloudinary.com/robertosousa1/image/upload/v1594492578/dio/quarterly_subscription_yjolpc.png",
			quantidade: 2,
			price: 150,
		},
		{
			id: "2",
			title: "Assinatura trimestral",
			image_url:
				"https://res.cloudinary.com/robertosousa1/image/upload/v1594492578/dio/quarterly_subscription_yjolpc.png",
			quantidade: 1,
			price: 150,
		},
	]);

	const cartSize = useMemo(() => {
		return products.length || 0;
	}, [products]);

	const cartTotal = useMemo(() => {
		return products.reduce((acc, product) => {
			const totalPrice = acc + product.price * product.quantidade;
			return totalPrice;
		}, 0);
	});

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
										<ProductQuantity>{item.quantidade}</ProductQuantity>

										<ProductPrice>
											{formatValue(item.price * item.quantidade)}
										</ProductPrice>
									</TotalContainer>
								</ProductPriceContainer>
							</ProductTitleContainer>
							<ActionContainer>
								<ActionButton onPress={() => {}}>
									<FeatherIcon name="plus" color="#e83f5b" size={16} />
								</ActionButton>
								<ActionButton onPress={() => {}}>
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
