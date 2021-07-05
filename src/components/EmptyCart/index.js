import React from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import LottieView from "lottie-react-native";
import anim from "../../../anim.json";
import { Container, EmptyCartContainer, EmptyCartText } from "./styles";

export default function EmptyCart() {
	return (
		<Container>
			<EmptyCartContainer>
				<LottieView source={anim} resizeMode="contain" autoPlay loop />
			</EmptyCartContainer>
			<EmptyCartText>Seu carrinho esta vazio</EmptyCartText>
		</Container>
	);
}
