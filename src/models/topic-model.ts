import { DateTime } from "next-auth/providers/kakao";

export type TopicModel = {
  name: string;
  description: string;
  createdOn: DateTime;
  updatedOn?: DateTime;
};
