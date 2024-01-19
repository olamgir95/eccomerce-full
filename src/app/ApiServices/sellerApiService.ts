import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Seller } from "../../types/user";
import { Definer } from "../../lib/Definer";

export default class SellerApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async getTopSellers(data: any): Promise<Seller[]> {
    try {
      const url = `/sellers?order=${data.order}&page=1&limit=${data.limit}`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err1);

      const top_sellers: Seller[] = result.data.data;
      return top_sellers;
    } catch (err: any) {
      console.log(`ERROR ::: getTopSellers ${err.message}`);

      throw err;
    }
  }
}
