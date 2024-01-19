import axios from "axios";
import { serverApi } from "../../lib/config";
import { ProductSearchObj } from "../../types/others";
import { Definer } from "../../lib/Definer";
import assert from "assert";
import { Product } from "../../types/product";

export default class ProductApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async getTrendProducts(data: ProductSearchObj): Promise<Product[]> {
    try {
      console.log(serverApi);

      const url = "/products",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result, Definer.general_err1);

      console.log("state", result);
      const products: Product[] = result.data.data;
      return products;
    } catch (err: any) {
      console.log(`ERROR ::: getTargetProducts ${err.message}`);

      throw err;
    }
  }

  async getNewProducts(data: ProductSearchObj): Promise<Product[]> {
    try {
      console.log(serverApi);

      const url = "/products",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result, Definer.general_err1);

      console.log("state", result);
      const products: Product[] = result.data.data;
      return products;
    } catch (err: any) {
      console.log(`ERROR ::: getNewProducts ${err.message}`);

      throw err;
    }
  }

  async getAllProducts(data: ProductSearchObj): Promise<Product[]> {
    try {
      const url = "/products",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result, Definer.general_err1);

      console.log("state", result);
      const products: Product[] = result.data.data;
      return products;
    } catch (err: any) {
      console.log(`ERROR ::: getAllProducts ${err.message}`);

      throw err;
    }
  }

  async getChosenProduct(id: string): Promise<Product> {
    try {
      console.log(serverApi);

      const url = `/products/${id}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });
      assert.ok(result, Definer.general_err1);

      console.log("state", result);
      const product: Product = result.data.data;
      return product;
    } catch (err: any) {
      console.log(`ERROR ::: getTargetProducts ${err.message}`);

      throw err;
    }
  }
}
