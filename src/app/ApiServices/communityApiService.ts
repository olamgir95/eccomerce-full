import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import {
  Article,
  ArticleInput,
  SearchArticlesObj,
  SearchMemberArticlesObj,
} from "../../types/Article";

export default class CommunityApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async getTargetArticles(data: SearchArticlesObj): Promise<Article[]> {
    try {
      let url = `/community/all-articles?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const articles: Article[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR ::: getTargetArticles ${err.message}`);
      throw err;
    }
  }

  public async getMemberCommunityArticles(
    data: SearchMemberArticlesObj
  ): Promise<Article[]> {
    try {
      let url = `/community/member-articles?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      return result.data.data;
    } catch (err: any) {
      console.log(`ERROR ::: getMemberCommunityArticles ${err.message}`);
      throw err;
    }
  }

  public async getChosenArticle(art_id: string): Promise<Article> {
    try {
      let url = `/community/single-article/${art_id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      console.log("state:::", result.data.data);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);

      const article: Article = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`ERROR ::: getChosenArticle ${err.message}`);
      throw err;
    }
  }

  public async uploadImageToServer(image: any): Promise<string> {
    try {
      let formData = new FormData();
      formData.append("community_image", image);
      console.log(formData);
      const result = await axios(`${this.path}/community/image`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);

      const image_name: string = result.data?.data;
      return image_name;
    } catch (err: any) {
      console.log(`ERROR ::: uploadImageToServer ${err.message}`);
      throw err;
    }
  }

  public async createArticle(data: ArticleInput): Promise<Article> {
    try {
      let url = `/community/create`;
      const result = await axios.post(this.path + url, data, {
        withCredentials: true,
      });

      console.log("state:::", result.data.data);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", Definer.general_err1);

      const article: Article = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`ERROR ::: createArticle ${err.message}`);
      throw err;
    }
  }
}
