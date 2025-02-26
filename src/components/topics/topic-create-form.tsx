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

import { createTopic } from "@/actions/createTopic";
import { useActionState, startTransition } from "react";
import FormButton from "../common/form-button";

export default function TopicCreateForm() {
  const [formState, createTopicAction, isPending] = useActionState(
    createTopic,
    {
      errors: {},
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      createTopicAction(formData);
    });
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
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
