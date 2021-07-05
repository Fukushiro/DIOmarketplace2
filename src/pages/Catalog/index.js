import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import * as CartActions from "../../store/modules/cart/actions";
//icones
import FeatherIcon from "react-native-vector-icons/Feather";
//componentes
import FloatingCart from "../../components/FloatingCart";
//utils
import formatValue from "../../utils/formatValue";
//services
import api from "../../services/api";
//styles
import {
	Container,
	ProductList,
	ProductContainer,
	ProductImage,
	Product,
	ProductTitle,
	PriceContainer,
	ProductPrice,
	ProductButton,
	ProductButtonText,
} from "./styles";
export default function Catalog() {
	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		console.log("iniciou");
		async function loadProducts() {
			const { data } = await api.get("/products");

			setProducts(data);
		}
		loadProducts();
	}, []);

	function handleAddToCart(id) {
		dispatch(CartActions.addToCartRequest(id));
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
					renderItem={({ item }) => (
						<Product>
							<ProductImage source={{ uri: item.image_url }} />
							<ProductTitle>{item.title}</ProductTitle>
							<PriceContainer>
								<ProductPrice>{formatValue(item.price)}</ProductPrice>
								<ProductButton
									onPress={() => {
										handleAddToCart(item.id);
									}}
								>
									<ProductButtonText>Adicionar</ProductButtonText>
									<FeatherIcon size={30} name="plus-circle" color="#d1d7e9" />
								</ProductButton>
							</PriceContainer>
						</Product>
					)}
				></ProductList>
			</ProductContainer>
			<FloatingCart />
		</Container>
	);
}
