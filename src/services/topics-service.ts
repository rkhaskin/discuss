import { pool, UpdateResult } from "@/db/mariadb";
import { TopicModel } from "@/models/topic-model";

export async function getTopics() {
  const query =
    "select id, name, description, created_on, updated_on from topic";
  return pool.query<TopicModel[]>(query);
}

interface InsertTopicProps {
  name: string;
  description: string;
}

export async function insertTopic(data: InsertTopicProps) {
  let res: UpdateResult;
  const insert = "insert into topic (name, description) values(?, ?)";
  try {
    res = await pool.query<UpdateResult>(insert, [data.name, data.description]);
    return res;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

type TopicByPostIdProps = {
  name: string;
};

export async function getTopicByPostId(postId: number) {
  const query = `
    select name 
      from topic a join post b on a.id = b.topic_id
    where b.id = 1   
  `;

  return pool.query<TopicByPostIdProps>(query, [postId]);
}
