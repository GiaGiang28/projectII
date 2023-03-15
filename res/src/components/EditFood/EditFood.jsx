import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdAttachMoney,
} from "react-icons/md";
import axios from "axios";
import { Loader } from "../";
import { data } from "../../constants";
import MainBackground from "../../assets/bg.png";

const EditFood = () => {
  const Editdata = useSelector((state) => state.fooditem.editfood);
  const [title, setTitle] = useState(Editdata?.name);
  const [price, setPrice] = useState(Editdata?.price);
  const [category, setCategory] = useState(Editdata?.category);
  const [imageAsset, setImageAsset] = useState(Editdata?.imageURL);
  const [fields, setFields] = useState(true);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8800/api/food/editFood/${Editdata.id}`,
        {
          title,
          price,
          category,
          imageUrl: `${
            typeof imageAsset === "string"
              ? imageAsset
              : "https://raw.githubusercontent.com/GiaGiang28/DA2/main/" +
                imageAsset.name
          }`,
          // "https://raw.githubusercontent.com/GiaGiang28/DA2/main/" +
          // imageAsset.name,
        }
      );
      setAlertStatus("Success");
      setMsg(res.data);
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    } catch (error) {
      setAlertStatus("danger");
      setMsg(error.response.data);
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center py-8"
      style={{ backgroundImage: `url(${MainBackground})` }}
    >
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              {category}
            </option>
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

        <div className="relative group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-56 md:h-52 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={(e) => setImageAsset(e.target.files[0])}
                      className="w-0 h-0 opacity-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="h-full">
                    <img
                      src={
                        typeof imageAsset === "string"
                          ? imageAsset
                          : URL.createObjectURL(imageAsset)
                      }
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 p-3 w-1/6 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={(e) => setImageAsset(null)}
                    >
                      <MdDelete className="text-white m-auto" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={handleClick}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFood;
