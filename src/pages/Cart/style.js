import styled from "styled-components";
import { FlatList } from "react-native";
export const Container = styled.SafeAreaView`
	flex: 1;
	align-items: center;
`;

export const ProductContainer = styled.View`
	flex: 1;
	flex-direction: row;
	margin-top: 60px;
	border-radius: 20px;
	background-color: #e83f5b;
`;

export const ProductList = styled(FlatList)`
	flex: 1;
	padding: 30px 10px;
`;

export const Product = styled.View`
	flex: 1;
	flex-direction: row;
	margin: 5px;
	background-color: #fff;
	min-width: 350px;
	min-height: 130px;
	padding: 15px 10px;
	border-radius: 20px;
`;

export const ProductImage = styled.Image`
	height: 92px;
	width: 140px;
`;

export const ProductTitleContainer = styled.View`
	font-size: 16px;
	margin-left: 5px;
	margin-top: 10px;
`;

export const ProductTitle = styled.Text`
	font-size: 16px;
`;

export const ProductPriceContainer = styled.View`
	flex-direction: column;
`;

export const TotalContainer = styled.View`
	flex-direction: row;
	margin-top: 8px;
`;

export const ProductSinglePrice = styled.Text`
	font-size: 17px;
	color: #414756;
	margin-top: 8px;
`;

export const ProductPrice = styled.Text`
	font-weight: bold;
	color: #414756;
	margin-top: 5px;
	font-size: 16px;
`;
export const ProductQuantity = styled.Text`
	font-weight: bold;
	color: #e83f5b;
	margin-top: 5px;
	margin-right: 10px;
	font-size: 16px;
`;

export const ActionContainer = styled.Text`
	align-self: flex-end;
	align-items: center;
	justify-content: space-between;
	margin-left: auto;
	flex: 1;
	/* background-color: red; */
	flex-direction: column;
`;

export const ActionButton = styled.TouchableOpacity`
	background-color: rgba(232, 63, 91, 0.1);
	border-radius: 5px;
	padding: 12px;
	margin-bottom: 5px;
`;

export const TotalProductContainer = styled.View`
	bottom: 0;
	position: absolute;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 36px 40px;
	border-radius: 10px;
	/* background-color: #e83f5b; */
	width: 100%;
`;

export const TotalProductTextContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

export const TotalProductText = styled.Text`
	font-size: 16px;
	color: white;
	margin-left: 15px;
	font-weight: bold;
`;

export const SUbTotalValue = styled.Text`
	font-size: 15px;
	color: white;
	font-weight: bold;
`;
