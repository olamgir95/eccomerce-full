import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { emptyCart } from "../../assets/images/index";
import { Container } from "@mui/material";
import ItemCard from "./ItemCard";
import { useCombinedContext } from "../../constants/useCombinedContext";
import { CartItem } from "../../types/others";
import OrderApiService from "../../app/ApiServices/orderApiService";
import { verifyMemberData } from "../../app/ApiServices/verify";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { Order } from "../../types/order";

const Cart = (props: any) => {
  const { useBasket } = useCombinedContext();
  const { cartItems, onDeleteAll } = useBasket;
  const navigate = useNavigate();
  const totalPrice = cartItems?.reduce(
    (value: any, curValue: CartItem) =>
      value + curValue?.price * curValue?.quantity,
    0
  );

  const processOrderHandler = async () => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const order = new OrderApiService();
      const order_id = await order.createOrder(cartItems);
      onDeleteAll();

      const data = { order_id: order_id, order_status: "process" };
      let confirmation = window.confirm(
        "Do you confirm your order for payment?"
      );
      if (confirmation) {
        const orderServer = new OrderApiService();
        await orderServer.updateStatusOfOrder(data).then();
      }
      navigate("/orders");
    } catch (err: any) {
      console.log(err.message);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Container>
      <Breadcrumbs title="Cart" />
      {cartItems.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {cartItems?.map((item: any) => (
              <div key={item?._id}>{<ItemCard item={item} />}</div>
            ))}
          </div>

          <button
            onClick={onDeleteAll}
            className="py-2 px-10 bg-red-500 text-white rounded-md font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Coupon Number"
              />
              <button className="text-sm bg-[#6f9a37] p-2 text-white rounded-sm hover:bg-[#86ba42] mdl:text-base font-semibold">
                Apply Coupon
              </button>
            </div>
            <button className="text-sm bg-[#48e13d] p-2 rounded-sm text-white hover:bg-[#43b752] mdl:text-base font-semibold">
              Update Cart
            </button>
          </div>
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total:
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${totalPrice ?? 0}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="" onClick={processOrderHandler}>
                  <button className="w-52 h-10 rounded bg-primeColor text-base mdl:text-lg text-white hover:bg-black duration-300">
                    Order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              beds sofas, armchairs, chairs, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </Container>
  );
};

export default Cart;
