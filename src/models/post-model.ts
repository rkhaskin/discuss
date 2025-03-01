import { DateTime } from "next-auth/providers/kakao";
export type PostModel = {
  id?: number;
  title: string;
  content: string;
  topic_id?: number;
  user_id: number;
  created_on?: DateTime;
  updated_on?: DateTime;
};
