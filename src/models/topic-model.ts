import { DateTime } from "next-auth/providers/kakao";

export type TopicModel = {
  id: number;
  name: string;
  description: string;
  created_on?: DateTime;
  updated_on?: DateTime;
};
