import CommentShow from "@/components/comments/comment-show";
import type { CommentsList } from "@/services/comment-service";

interface CommentListProps {
  fetchData: () => Promise<CommentsList[]>;
}

// TODO: Get a list of comments from somewhere
export default async function CommentList({ fetchData }: CommentListProps) {
  const comments = await fetchData();

  const topLevelComments = comments.filter(
    (comment) => comment.parent_id === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id!}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
