import { configureStore, createSlice } from "@reduxjs/toolkit";

/* -------------------- Cart LocalStorage -------------------- */
const savedCart = localStorage.getItem("cart");
const localStorageCart = savedCart ? JSON.parse(savedCart) : [];

/* -------------------- Products Slice -------------------- */
const productsSlice = createSlice({
  name: "products",
  initialState: {
    veg: [
      { name: "Tomato", price: 50.45, image: "/vegimages/tomato.jpg", description: "Fresh, juicy red tomatoes perfect for salads and cooking." },
      { name: "Radish", price: 75.45, image: "/vegimages/radish.jpg", description: "Crisp radishes with a spicy kick." },
      { name: "Onion", price: 100, image: "/vegimages/onion.jpg", description: "Versatile onions for every dish." },
      { name: "Curry Leaves", price: 11.45, image: "/vegimages/curryleaves.jpg", description: "Aromatic curry leaves for Indian cooking." },
      { name: "Cucumber", price: 65.45, image: "/vegimages/cucumber.jpg", description: "Fresh and cool cucumbers for salads." },
      { name: "Chilli", price: 50.45, image: "/vegimages/chilli.jpg", description: "Spicy chillies to add heat." },
      { name: "Cauliflower", price: 75.95, image: "/vegimages/cauliflower.jpg", description: "Perfect for curries and soups." },
      { name: "Bottle Gourd", price: 30, image: "/vegimages/bottlegourd.jpg", description: "Healthy and light vegetable." },
      { name: "Ladies Finger", price: 55.65, image: "/vegimages/ladiesfinger.jpg", description: "Tender okra for stir-fries." },
      { name: "Cabbage", price: 60.65, image: "/vegimages/cabbage.jpg", description: "Crunchy cabbage for salads and cooking." }
    ],

    nonVeg: [
      { name: "Chicken65", price: 280.86, image: "/nonVegimages/chicken65.jpg", description: "Spicy fried chicken snack." },
      { name: "Mutton", price: 400.45, image: "/nonVegimages/mutton.jpg", description: "Tender mutton for curries." },
      { name: "Chicken Biryani", price: 1200.86, image: "/nonVegimages/chickenbiryani.jpg", description: "Traditional aromatic biryani." },
      { name: "Chicken Tikka", price: 1200.86, image: "/nonVegimages/chickentikka.jpg", description: "Grilled smoky chicken." },
      { name: "Fish Fry", price: 430, image: "/nonVegimages/fishfry.jpg", description: "Crispy fried fish." },
      { name: "Prawns", price: 520.86, image: "/nonVegimages/prawns.jpg", description: "Fresh prawns for curry or fry." }
    ],

    milk: [
      { name: "Milk", price: 40.45, image: "/milk/milk.jpg", description: "Fresh cow milk." },
      { name: "Curd", price: 48, image: "/milk/curd.jpg", description: "Fresh creamy curd." },
      { name: "Butter", price: 400.45, image: "/milk/butter.jpg", description: "Rich creamy butter." },
      { name: "Ghee", price: 600, image: "/milk/ghee.jpg", description: "Pure clarified butter." },
      { name: "Paneer", price: 450, image: "/milk/paneer.jpg", description: "Fresh paneer for curries." },
      { name: "Ice Cream", price: 325.45, image: "/milk/icecream.jpg", description: "Delicious frozen dessert." }
    ]
  },
  reducers: {}
});

/* -------------------- Cart Slice -------------------- */
const cartSlice = createSlice({
  name: "cart",
  initialState: localStorageCart,
  reducers: {
    AddToCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    IncCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) item.quantity += 1;
    },
    DecCart: (state, action) => {
      const index = state.findIndex(i => i.name === action.payload.name);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
    RemoveFromCart: (state, action) => {
      const index = state.findIndex(i => i.name === action.payload.name);
      if (index !== -1) state.splice(index, 1);
    },
    ClearCart: () => []
  }
});

export const {
  AddToCart,
  IncCart,
  DecCart,
  RemoveFromCart,
  ClearCart
} = cartSlice.actions;

/* -------------------- Orders Slice -------------------- */
const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    OrderDetails: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { OrderDetails } = ordersSlice.actions;

/* -------------------- Users Slice -------------------- */
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isAuthenticated: false,
    currentUser: null
  },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      const foundUser = state.users.find(
        user =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      );

      if (foundUser) {
        state.isAuthenticated = true;
        state.currentUser = foundUser;
      } else {
        alert("Invalid Credentials");
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    }
  }
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;

/* -------------------- Store Configuration -------------------- */
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
    users: userSlice.reducer
  }
});

/* -------------------- Persist Cart -------------------- */
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart));
});

export default store;
