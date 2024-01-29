import axios from "axios";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import { CartItem } from "../../types/others";
import { Order, OrderItem } from "../../types/order";

export default class OrderApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async createOrder(data: CartItem[]): Promise<Order> {
    try {
      const url = "/orders/create",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const order: Order = result.data.data;
      return order;
    } catch (err: any) {
      console.log(`ERROR ::: createOrder ${err.message}`);

      throw err;
    }
  }
  async getMyOrders(order_status: string): Promise<Order[]> {
    try {
      const url = `/orders?status=${order_status}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const orders: Order[] = result.data.data;
      return orders;
    } catch (err: any) {
      console.log(`ERROR ::: getMyOrders ${err.message}`);

      throw err;
    }
  }

  async updateStatusOfOrder(data: any): Promise<Order> {
    try {
      const url = `/orders/edit`,
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const orders: Order = result.data.data;
      return orders;
    } catch (err: any) {
      console.log(`ERROR ::: updateStatusOfOrder ${err.message}`);

      throw err;
    }
  }
}
