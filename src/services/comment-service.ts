import { pool, UpdateResult } from "@/db/mariadb";
import { CommentModel } from "@/models/comment-model";

interface InsertCommentProps {
  content: string;
  postId: number;
  parentId?: number;
  userId: number;
}
export async function insertComment(data: InsertCommentProps) {
  const insert =
    "insert into comment (content, post_id, user_id, parent_id) values(?, ?, ?, ?)";
  try {
    return pool.query<UpdateResult>(insert, [
      data.content,
      data.postId,
      data.userId,
      data.parentId,
    ]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export type CommentsList = CommentModel & {
  user_name: string;
  user_image: string;
};

export async function getCommentsForPost(postId: number) {
  const query = `
  select comment.id, content, post_id, parent_id, created_on, updated_on, users.name as user_name, users.image as user_image
    from comment join users on comment.user_id = users.id
    where comment.post_id = 1  
  `;

  try {
    return pool.query<CommentsList[]>(query, [postId]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
