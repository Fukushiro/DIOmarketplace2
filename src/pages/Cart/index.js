import React from "react";
import { View } from "react-native";
import { useState } from "react";
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
			quantidade: 1,
			price: 150,
		},
	]);
	return (
		<Container>
			<ProductContainer>
				<Product>
					<ProductList
						data={products}
						keyExtractor={(item) => item.id}
						ListFooterComponent={<View />}
						ListFooterComponentStyle={{
							height: 80,
						}}
						renderItem={({ item }) => <Product></Product>}
					/>
				</Product>
			</ProductContainer>
		</Container>
	);
}
