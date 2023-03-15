import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCartItem } from "../../app/cartItemSlice";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";

let items = [];

const CartItem = ({ item, setFlag, flag }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItem);
  const [qty, setQty] = useState(item.qty);

  const cartDispatch = () => {
    dispatch(setCartItem(items));
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      items = cartItems.map((item) => {
        if (item.id === id) {
          setFlag(flag + 1);
          return { ...item, qty: qty + 1 };
        }
        return item;
      });
      cartDispatch();
    } else {
      if (qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        items = cartItems.map((item) => {
          if (item.id === id) {
            setFlag(flag + 1);
            return { ...item, qty: qty - 1 };
          }
          return item;
        });
        cartDispatch();
      }
    }
  };

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item?.imageURL}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.name}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {parseFloat(item?.price) * qty}
        </p>
      </div>

      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50 " />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50 " />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
