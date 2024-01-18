import { Article } from "./Article";
import { Event } from "./event";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { Seller, Member } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  shopPage: ShopPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState;
}

export interface HomePageState {
  topSellers: Seller[];
  newProducts: Product[];
  trendProducts: Product[];
  newEvents: Event[];
  trendArticles: Article[];
}

export interface ShopPageState {
  allProducts: Product[];
  chosenProduct: Product | null;
}

//Orders page

export interface OrdersPageState {
  pausedOrders: Order[];
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
