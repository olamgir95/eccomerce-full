import { MeLiked, Member } from "./user";

export interface Article {
  _id: string;
  art_subject: string;
  art_content: string;
  art_image?: string;
  bo_id: string;
  art_status?: string;
  art_likes?: number;
  art_views?: number;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  member_data: Member;
  me_liked: MeLiked[];
}

export interface SearchArticlesObj {
  page: number;
  limit: number;
  order?: string | null;
  bo_id: string;
}

export interface SearchMemberArticlesObj {
  page: number;
  limit: number;
  mb_id: string;
}

export interface ArticleInput {
  art_image: string;
  art_content: string;
  art_subject: string;
  bo_id: string;
}
