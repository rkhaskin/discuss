import { pool } from "@/db/mariadb";
import { PostModel } from "@/models/post-model";

export type PostWithData = PostModel & {
  topic_name: string;
  user_name: string;
  comment_count: number;
};

export async function fetchPostsByTopicName(name: string) {
  try {
    const query = `
         select post.id, post.title, post.content, post.created_on, post.updated_on, users.name as user_name, 
            topic.name as topic_name,
            count(comment.id) as comment_count
           from post join topic on post.topic_id = topic.id
                     join users on users.id = post.user_id
                     left outer join comment on comment.post_id = post.id      
           where topic.name = ?
           group by post_id
        `;

    return pool.query<PostWithData[]>(query, [name]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPostById(postId: number): Promise<PostModel> {
  const query = `select id, title, content, topic_id, user_id, created_on, updated_on
                     from post 
                     where id = ?`;

  try {
    const posts = await pool.query<PostModel[]>(query, [postId]);
    if (posts.length > 0) {
      return posts[0];
    }
    throw new Error("Post not found");
  } catch (error: unknown) {
    const msg = "error fetching a post";
    if (error instanceof Error) {
      console.log(msg, error.message);
    } else {
      console.log("Unlnown error fetch ing post");
    }

    throw error;
  }
}
