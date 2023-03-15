import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setCartItem } from "../../app/cartItemSlice";
import MainBackground from "../../assets/bg.png";

const Payment = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItem);
  const [tableID, setTableID] = useState(0);
  const [message, setMessage] = useState("Choose Table");
  const [isTable, setIsTable] = useState(true);
  const [total, setTotal] = useState(0);
  const [billID, setBillID] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tableID !== 0) {
      axios
        .get(`http://localhost:8800/api/bill/getBill/${tableID}`)
        .then((res) => {
          dispatch(setCartItem(res.data.food));
          setTotal(res.data.total);
          setBillID(res.data.billID);
        })
        .catch((error) => console.log(error));
    }
  }, [tableID]);

  const tables = [];
  for (let i = 1; i <= 30; i++) {
    tables.push(i);
  }

  const handleClick = (item) => {
    setIsTable(false);
    setTableID(item);
    setMessage("Payment");
    return 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8800/api/bill/editBill/${billID}`,
        {
          tableID: tableID,
        }
      );
      dispatch(setCartItem([]));
      navigate("/Successful");
    } catch (error) {
      navigate("/Error");
    }
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
            <div className="w-[90%] md:w-[50%] p-1 px-2 rounded-lg bg-cartItem flex flex-col gap-3 overflow-y-scroll scrollbar-none">
              {cartItems.map((item) => (
                <div
                  key={item?.id}
                  className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-4"
                >
                  <img
                    src={item?.imageURL}
                    className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                    alt=""
                  />

                  <div className="flex flex-col gap-2">
                    <p className="text-base text-gray-50">{item?.name}</p>
                    <p className="text-sm block text-gray-300 font-semibold">
                      {`${item?.price} $  x ${item?.quantity} = ${
                        parseFloat(item?.price) * item?.quantity
                      } $`}
                    </p>
                  </div>
                </div>
              ))}
              <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8">
                <div className="w-full border-b border-gray-600 my-2"></div>

                <div className="w-full flex items-center justify-between">
                  <p className="text-gray-200 text-xl font-semibold">Total</p>
                  <p className="text-gray-200 text-xl font-semibold">
                    {total} $
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={handlePayment}
              >
                Payment
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Payment;
