import { createSlice } from "@reduxjs/toolkit";

//let initialFoodItems = {};

// export const getfood = createAsyncThunk("fooditems/getfood", async () => {
//   const FoodItems = await axios
//     .get("http://localhost:8800/api/food/")
//     .then((res) => res.data);

//   console.log(FoodItems);
//   return FoodItems;
// });

// const initial = async () => {
//   initialFoodItems = await axios.get("http://localhost:8800/api/food/");
//   // initialFoodItems = await response.then((res) => {
//   //   return res.data;
//   // });
//   console.log(initialFoodItems);
//   return initialFoodItems;
// };
// initial();
// console.log(initialFoodItems);
// // try {
// //   axios.get("http://localhost:8800/api/food/").then((res) => {
// //     initialFoodItems = res.data;
// //   });
// // } catch (error) {
// //   console.log(error);
// // }
const fooditemSlice = createSlice({
  name: "fooditems",
  initialState: {
    foodItems: [],
    editfood: null,
  },
  reducers: {
    addFood: (state, action) => {
      state.foodItems.push(action.payload);
    },
    updateFood: (state, action) => {},
    deleteFood: (state, action) => {
      state.foodItems = state.foodItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setFood: (state, action) => {
      state.foodItems = action.payload;
    },
    setEditFood: (state, action) => {
      state.editfood = action.payload;
    },
  },
});

const { reducer, actions } = fooditemSlice;
export const { addFood, updateFood, deleteFood, setFood, setEditFood } =
  actions;
export default reducer;
