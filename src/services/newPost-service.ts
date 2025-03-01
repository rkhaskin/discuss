import { PostModel } from "@/models/post-model";
import { pool } from "@/db/mariadb";
import { UpdateResult } from "@/db/mariadb";

export default async function newPost(
  data: PostModel,
  slug: string
): Promise<number> {
  try {
    const topicId = await getTopicId(slug);
    if (!topicId) {
      throw new Error(`Topic ID is not found for ${slug}`);
    }
    const res: UpdateResult = await insertPost(data, topicId);
    return res.insertId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("createPost failed with unknown error");
    }

    throw error;
  }
}

async function getTopicId(slug: string): Promise<number | null> {
  const query = "select id from topic where name = ?";
  const res = await pool.query<[{ id: number }]>(query, [slug]);
  return res[0]?.id || null;
}

async function insertPost(data: PostModel, topicId: number) {
  const insert =
    "insert into post (title, content, topic_id, user_id) values(?, ?, ?, ?)";
  return pool.query<UpdateResult>(insert, [
    data.title,
    data.content,
    topicId,
    data.user_id,
  ]);
}
