import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalPrice: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct(state, action) {
			const findItem = state.items.find(
				(obj) =>
					obj.id === action.payload.id &&
					obj.size === action.payload.size &&
					obj.type === action.payload.type,
			);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = state.items.reduce((sum, obj) => {
				return sum + obj.price * obj.count;
			}, 0);
		},
		removeItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			state.totalPrice -= findItem.count * findItem.price;
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
		addCount(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			state.totalPrice += findItem.price;
			findItem.count += 1;
		},
		minusCount(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			state.totalPrice -= findItem.price;
			if (findItem.count <= 1) {
				state.items = state.items.filter((obj) => obj.id !== action.payload);
			}
			findItem.count -= 1;
		},
	},
});

export const { addProduct, clearItems, removeItem, minusCount, addCount } = cartSlice.actions;

export default cartSlice.reducer;
