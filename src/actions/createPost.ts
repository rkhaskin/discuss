"use server";
import { z } from "zod";
import { auth } from "@/auth";

import { redirect } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import newPost from "@/services/newPost-service";
import { PostModel } from "@/models/post-model";

const CreatePostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    // store any other errors resulted from form submission
    _form?: string[];
  };
};

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be signed to do this"],
      },
    };
  }

  const result = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data: PostModel = {
    title: result.data.title,
    content: result.data.content,
    user_id: parseInt(session.user.id),
  };

  let postId: number;
  try {
    postId = await newPost(data, slug);
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : "Something went wrong";
    return {
      errors: {
        _form: [err],
      },
    };
  }
  revalidatePath(paths.postShow(slug, postId));
  redirect(paths.postShow(slug, postId));
}
