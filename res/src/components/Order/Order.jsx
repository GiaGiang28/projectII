import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdShoppingBasket } from "react-icons/md";
import axios from "axios";
import { data } from "../../constants";
import { motion } from "framer-motion";
import { RowContainer, CartContainer } from "../";
import { setFood } from "../../app/foodItemSlice";
import { setCart } from "../../app/cartSlice";
import MainBackground from "../../assets/bg.png";

const Order = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("Chicken");
  const [message, setMessage] = useState("Choose Table");
  const [isTable, setIsTable] = useState(true);
  const [tableID, setTableID] = useState(0);
  const cartItems = useSelector((state) => state.cartItem);
  const cartShow = useSelector((state) => state.cart);
  const foodItems = useSelector((state) => state.fooditem.foodItems);
  useEffect(() => {
    axios
      .get("http://localhost:8800/api/food/")
      .then((res) => {
        dispatch(setFood(res.data));
      })
      .catch((error) => console.log(error));
  });

  const tables = [];
  for (let i = 1; i <= 30; i++) {
    tables.push(i);
  }

  const showCart = () => {
    dispatch(setCart(!cartShow));
  };

  const handleClick = (item) => {
    setIsTable(false);
    setTableID(item);
    setMessage("Choose Food");
    return 0;
  };

  return (
    <section
      className="w-full"
      style={{
        backgroundImage: `url(${MainBackground})`,
      }}
      id="order"
    >
      <div className="w-full flex flex-col items-center justify-center">
        <p className="w-full text-2xl text-center font-semibold capitalize text-green-700 relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          {message}
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-8 overflow-x-hidden flex-wrap justify-center">
          {isTable ? (
            tables.map((item) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={item}
                className={`group bg-white
                w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                onClick={() => handleClick(item)}
              >
                <p
                  className={`text-sm 
                   text-textColor group-hover:text-white`}
                >
                  {item}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="w-3/4 flex flex-col items-center justify-center">
              <div className="w-1/4">
                <select
                  onChange={(e) => setType(e.target.value)}
                  className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                >
                  {data.categories &&
                    data.categories.map((item) => (
                      <option
                        key={item.id}
                        className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                        value={item.urlParamName}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div
                className="relative flex items-center justify-center mt-5"
                onClick={showCart}
              >
                <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
                {cartItems && cartItems.length > 0 && (
                  <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                    <p className="text-xs text-white font-semibold">
                      {cartItems.length}
                    </p>
                  </div>
                )}
              </div>

              <div className="w-full">
                <RowContainer
                  flag={false}
                  data={foodItems?.filter((n) => n.category === type)}
                  isChoose={true}
                />
              </div>

              {cartShow && <CartContainer table={tableID} />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Order;
