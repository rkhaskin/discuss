"use client";

import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Textarea,
  Button,
  Form,
} from "@heroui/react";

import { createPost } from "@/actions/createPost";
import { useActionState, startTransition } from "react";
import FormButton from "../common/form-button";

interface PostCreateFormProps {
  slug: string;
}
export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, createPostAction, isPending] = useActionState(
    createPost.bind(null, slug),
    {
      errors: {},
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      createPostAction(formData);
    });
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Enter your post"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border-red-400 rounded">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}
            <FormButton isLoading={isPending}>Submit</FormButton>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
