import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
export default function teste() {
	dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
	return (
		<View style={{ backgroundColor: "black", height: 200, width: 200 }}></View>
	);
}
