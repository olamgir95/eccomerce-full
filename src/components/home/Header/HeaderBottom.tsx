import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import {
  actionDispatch,
  shopRetriever,
} from "../../../pages/ShopPage/useReduxShop";
import { items } from "../../../constants/shopFilterCategories";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import ProductApiService from "../../../app/ApiServices/productApiService";
import { useDispatch } from "react-redux";
import { useCombinedContext } from "../../../context/useCombinedContext";
import useWindowSize from "../../../constants/useWindowResize";

const HeaderBottom = (props: any) => {
  const { able } = props;
  const { allProducts } = useSelector(shopRetriever);
  const [show, setShow] = useState<boolean>(false);
  const [showUser, setShowUser] = useState<boolean>(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [width] = useWindowSize();

  const { updateTargetSearchObj } = useCombinedContext();
  const { setAllProducts } = actionDispatch(useDispatch());

  const handleCategoryChange = (value: string, category: string) => {
    updateTargetSearchObj(value, category);
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current?.contains(e.target as Node)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !(event.target as Node).contains(inputRef.current)
      ) {
        setShowUser(false);
        setSearchQuery("");
      }
    };

    window.document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowUser(true);
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getAllProducts({ order: "createdAt", page: 1, limit: 100 })
      .then((data) => setAllProducts(data))
      .catch((err) => console.log(err));
  }, [searchQuery]);

  useEffect(() => {
    const filtered = allProducts.filter((item: Product) =>
      item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchQuery, allProducts]);

  const chosenProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      onClick={() => setShowUser(false)}
      className="w-full bg-orangge relative z-50"
      data-aos="zoom-in-right"
    >
      {width > 667 && (
        <Container>
          <div className="max-w-container mx-auto">
            <Flex
              className={
                able
                  ? "justify-between flex flex-col lg:flex-row items-start lg:items-center w-full px-4 pb-4 lg:pb-0 h-full lg:h-24"
                  : "justify-center pt-10 flex flex-col lg:flex-row items-start lg:items-center w-full px-4 pb-4 lg:pb-0 h-full lg:h-24"
              }
            >
              {able && (
                <div
                  onClick={() => setShow(!show)}
                  ref={ref}
                  data-aos-delay={300}
                  className="flex h-14 cursor-pointer transition-all items-center gap-2  text-primeColor"
                >
                  <HiOutlineMenuAlt4 className="w-5 h-5 menu" />
                  <p className="text-[14px] category font-normal hover:text-orange-600 hover:menu  hover:menu-text-orange-600 ">
                    Shop by Category
                  </p>

                  {show && (
                    <motion.ul
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-24 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
                    >
                      {items?.map(({ _id, title }) => (
                        <li
                          key={_id}
                          onClick={() => {
                            handleCategoryChange(title, "collection");
                            navigate("/shop");
                          }}
                          className="text-gray-400 px-4 py-1 capitalize border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                        >
                          {title}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              )}
              <div
                data-aos="zoom-in-left"
                data-aos-delay={300}
                className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between  rounded-3xl"
              >
                <div className="flex items-center w-full">
                  <input
                    className="flex-1 h-[50px] rounded-3xl  w-[90%] outline-gray-300 outline outline-1 hover:outline-electricPurple placeholder:text-[#C4C4C4] placeholder:text-[14px] pl-2 "
                    type="text"
                    ref={inputRef}
                    onChange={handleInputChange}
                    value={searchQuery}
                    placeholder="Search your products here"
                  />
                  <div className="bg-gray-300 hover:bg-gray-400 h-[50px] cursor-pointer flex items-center justify-center w-[100px] absolute right-0 rounded-r-3xl">
                    <FaSearch className="w-6 h-6 text-orange-400  hover:text-orangge absolute" />
                  </div>
                </div>
                {showUser && searchQuery && (
                  <div
                    className={`w-full mx-auto  p-2 h-96 scrollbar-none z-50 bg-white top-16 absolute left-0  overflow-y-scroll shadow-2xl  cursor-pointer`}
                  >
                    {showUser &&
                      searchQuery &&
                      filteredProducts?.map((product) => {
                        const image_path = `${serverApi}/${product?.product_images[0]}`;

                        return (
                          <div
                            key={product._id}
                            className="max-w-[600px]  h-28 bg-gray-100 mb-3 flex items-center gap-3"
                            onClick={() => {
                              chosenProduct(product?._id);
                              setSearchQuery("");
                            }}
                          >
                            <img
                              className="w-24"
                              src={image_path}
                              alt="productImg"
                            />
                            <div className="flex flex-col gap-1">
                              <p className="font-semibold text-lg">
                                {product.product_name}
                              </p>
                              <p className="text-xs max-h-12  overflow-hidden">
                                {product.product_description}
                              </p>
                              <p className="text-sm">
                                Price:
                                <span className="text-primeColor font-semibold">
                                  ${product.product_price}
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </Flex>
          </div>
        </Container>
      )}
    </div>
  );
};

export default HeaderBottom;
