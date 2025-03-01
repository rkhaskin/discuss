import { PostModel } from "@/models/post-model";
import { getPostById } from "@/services/posts-service";
import { notFound } from "next/navigation";

interface PostShowProps {
  postId: number;
}

export default async function PostShow({ postId }: PostShowProps) {
  let post: PostModel;
  try {
    post = await getPostById(postId);
  } catch (error) {
    console.log(error);
    notFound();
  }
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
