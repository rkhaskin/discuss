"use server";
import { z } from "zod";
import { auth } from "@/auth";

import { pool, UpdateResult } from "@/db/mariadb";
import { redirect } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

const CreateTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lower case letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

type CreateTopicFormState = {
  errors: {
    name?: string[];
    description?: string[];
    // store any other errors resulted from form submission
    _form?: string[];
  };
};

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed to do this"],
      },
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const result = CreateTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let res: UpdateResult;
  const insert = "insert into topic (name, description) values(?, ?)";
  try {
    res = await pool.query<UpdateResult>(insert, [
      result.data.name,
      result.data.description,
    ]);
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : "Something went wrong";
    return {
      errors: {
        _form: [err],
      },
    };
  }
  revalidatePath("/");
  redirect(paths.topicShow(res.insertId.toString()));
}
