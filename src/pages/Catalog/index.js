import React, { useState, useEffect, Component } from 'react';
import { useDispatch } from 'react-redux';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
} from 'react-native';
// import * as CartActions from "../../store/modules/cart/actions";
import { Creators as CartActions } from '../../store/ducks/cart/cart';
import { bindActionCreators } from 'redux';
//icones
import FeatherIcon from 'react-native-vector-icons/Feather';
//componentes
import FloatingCart from '../../components/FloatingCart';
//utils
import formatValue from '../../utils/formatValue';
//services
import api from '../../services/api';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
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
} from './styles';

const Catalog = ({ addCartRequest, cart }) => {
	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function loadProducts() {
			const { data } = await api.get('/products');

			setProducts(data);
		}

		loadProducts();
	}, []);

	function handleAddToCart(id) {
		addCartRequest(id);
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
		// <SafeAreaView>
		// 	<View style={a.Container}>
		// 		<FlatList
		// 			data={products}
		// 			keyExtractor={(item) => item.id}
		// 			ListFooterComponent={<View />}
		// 			ListFooterComponentStyle={{
		// 				height: 80,
		// 			}}
		// 			renderItem={({ item }) => (
		// 				<View>
		// 					<Image source={{ uri: item.image_url }} style={a.Imagem} />
		// 					<Text>{item.title}</Text>
		// 					<View>
		// 						<Text>{formatValue(item.price)}</Text>
		// 						<TouchableOpacity
		// 							onPress={() => {
		// 								handleAddToCart(item.id);
		// 							}}
		// 						>
		// 							<Text>Adicionar</Text>
		// 							<FeatherIcon size={30} name="plus-circle" color="#d1d7e9" />
		// 						</TouchableOpacity>
		// 					</View>
		// 				</View>
		// 			)}
		// 		></FlatList>
		// 		<FloatingCart />
		// 	</View>
		// </SafeAreaView>
	);
};

// class CatalogClass extends Component {
// 	handleSubmit = (e) => {
// 		e.preventDefault();

// 		this.props.addCart(this.input.value);

// 		this.input.value = "";
// 	};

// 	render() {
// 		// useEffect(() => {
// 		// 	async function loadProducts() {
// 		// 		const { data } = await api.get("/products");

// 		// 		setProducts(data);
// 		// 	}
// 		// 	loadProducts();
// 		// }, []);
// 		const { cart, addCart } = this.props;

// 		<SafeAreaView>
// 			<View style={a.Container}>
// 				<FlatList
// 					data={cart}
// 					keyExtractor={(item) => item.id}
// 					ListFooterComponent={<View />}
// 					ListFooterComponentStyle={{
// 						height: 80,
// 					}}
// 					renderItem={({ item }) => (
// 						<View>
// 							<Image source={{ uri: item.image_url }} style={a.Imagem} />
// 							<Text>{item.title}</Text>
// 							<View>
// 								<Text>{formatValue(item.price)}</Text>
// 								<TouchableOpacity
// 									onPress={() => {
// 										this.handleSubmit(item.id);
// 									}}
// 								>
// 									<Text>Adicionar</Text>
// 									<FeatherIcon size={30} name="plus-circle" color="#d1d7e9" />
// 								</TouchableOpacity>
// 							</View>
// 						</View>
// 					)}
// 				></FlatList>
// 				<FloatingCart />
// 			</View>
// 		</SafeAreaView>;
// 	}
// }

const a = StyleSheet.create({
	Container: {
		flex: 1,
		alignItems: 'center',
	},
	Imagem: {
		// 	width: 90%;
		// height: 220px;
		// align-self: center;
		width: '90%',
		height: 220,
		alignSelf: 'center',
	},
});
const mapStateToProps = (state) => ({
	cart: state.cart,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(CartActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
