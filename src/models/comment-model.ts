import { DateTime } from "next-auth/providers/kakao";

export type CommentModel = {
  id?: number;
  content: string;
  post_id: number;
  user_id: number;
  parent_id?: number;
  create_on?: DateTime;
  updated_on?: DateTime;
};
