import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { IoFastFood } from "react-icons/io5";
import { data } from "../../constants";
import { motion } from "framer-motion";
import { RowContainer } from "../";
import { setFood } from "../../app/foodItemSlice";
import MainBackground from "../../assets/bg.png";

const MenuContainer = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("Chicken");
  const foodItems = useSelector((state) => state.fooditem.foodItems);
  useEffect(() => {
    axios
      .get("http://localhost:8800/api/food/")
      .then((res) => {
        dispatch(setFood(res.data));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section
      className="w-full"
      style={{
        backgroundImage: `url(${MainBackground})`,
      }}
      id="menu"
    >
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-8 overflow-x-scroll scrollbar-none">
          {data.categories &&
            data.categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
