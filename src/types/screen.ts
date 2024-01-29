import { Article } from "./Article";
import { Event } from "./event";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Comment } from "./others";
import { Product } from "./product";
import { Seller, Member } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  shopPage: ShopPageState;
  productDetailPage: ProductDetailPage;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState;
}

export interface ProductDetailPage {
  comments: Comment[];
}

export interface HomePageState {
  topSellers: Seller[];
  newProducts: Product[];
  saleProducts: Product[];
  newEvents: Event[];
  trendArticles: Article[];
}

export interface ShopPageState {
  allProducts: Product[];
  chosenProduct: Product | null;
  saleProducts: Product[];
}

//Orders page

export interface OrdersPageState {
  processOrders: Order[];
  finishedOrders: Order[];
}

//Community page
export interface CommunityPageState {
  targetArticles: Article[];
}

//Member page
export interface MemberPageState {
  chosenMember: Member | null;
  chosenMemberArticles: Article[];
  chosenSingleArticle: Article | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}
