import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { MemberLiken } from "../../types/others";
import { SearchArticlesObj } from "../../types/Article";
import { Event } from "../../types/event";

export default class MemberApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }
  async memberLikeTarget(data: any): Promise<MemberLiken> {
    try {
      const result = await axios.post(this.path + "/member-liken", data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const like_result: MemberLiken = result.data.data;
      console.log("like", like_result);

      return like_result;
    } catch (err: any) {
      console.log(`ERROR ::: memberLikeTarget ${err.message}`);
      throw err;
    }
  }

  public async getNewEvents(data: SearchArticlesObj): Promise<Event[]> {
    try {
      let url = `/events/target?page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const events: Event[] = result.data.data;
      return events;
    } catch (err: any) {
      console.log(`ERROR ::: getNewEvents ${err.message}`);
      throw err;
    }
  }
}
