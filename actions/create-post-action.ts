"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PostCategory } from "@/lib/generated/prisma/enums";

const FormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(6).max(55),
  subject: z.string().min(6).max(55),
  category: z.nativeEnum(PostCategory),
  content: z.string().min(6),
  published: z.preprocess((val) => {
    // normalize published coming from form: 'on' -> true, 'true' -> true, anything else -> false
    if (val === "on" || val === "true" || val === true) return true;
    return false;
  }, z.boolean()),
});

export type State = {
  errors?: {
    title?: string[];
    subject?: string[];
    content?: string[];
    category?: string[]
    published?: string[];
  };
  message?: string | null;
};

const CreateValidPost = FormSchema.omit({ id: true });
const UpdateValidPost = FormSchema.omit({ id: true });

export async function createNewPost(formData: FormData) {
  let publish = false;
  if (formData.get("published") === "on") {
    publish = true;
  } else {
    publish = false;
  }
  const title = String(formData.get("title"));
  const subject = String(formData.get("subject"));
  const content = String(formData.get("content"));
  const userId = String(formData.get("userId"));
  if (!title || !subject || !content || !userId) {
    return { error: "some field are needed !" };
  }
  try {
    await prisma.post.create({
      data: {
        subject: subject,
        title: title,
        content: content,
        userId: userId,
        published: publish,
      },
    });
    revalidatePath("/dashboard/posts/create");
    return { error: null };
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to create Post.",
    };
  }
}

export async function updateNewPost(formData: FormData) {
  let publish = false;
  if (formData.get("published") === "on") {
    publish = true;
  } else {
    publish = false;
  }
  const id = String(formData.get("id"));
  const title = String(formData.get("title"));
  const subject = String(formData.get("subject"));
  const content = String(formData.get("content"));
  if (!title || !subject || !content) {
    return { error: "some field are needed !" };
  }
  try {
    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        subject: subject,
        title: title,
        content: content,
        published: publish,
      },
    });
    revalidatePath(`/dashboard/posts/${id}/edit`);
    return { error: null };
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to update Post.",
    };
  }
}

export async function createPost(prevState: State, formData: FormData) {
  let pb = formData.get("published") as unknown;
  if (!pb || pb === null) {
    pb = "false";
  }
  const validatedFields = CreateValidPost.safeParse({
    userId: formData.get("userId"),
    title: formData.get("title"),
    subject: formData.get("subject"),
    category: formData.get("category"),
    content: formData.get("content"),
    published: pb,
  });

  if (!validatedFields.success) {
    return {
      //errors: treeifyError(validatedFields.error),
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }
  // Prepare data for insertion into the database
  const { userId, title, subject, content, published, category } = validatedFields.data;

  try {
    await prisma.post.create({
      data: {
        subject: subject,
        title: title,
        content: content,
        category: category as PostCategory,
        published: published,
        userId: userId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to create Post.",
    };
  }

  revalidatePath("/dashboard/posts/create");
  redirect("/dashboard/posts");
}

export async function updatePost(
  id: string,
  prevState: State,
  formData: FormData
) {
  console.log(formData);
  let pb = formData.get("published") as unknown;
  if (!pb || pb === null) {
    pb = "false";
  }
  const validatedFields = UpdateValidPost.safeParse({
    title: formData.get("title"),
    subject: formData.get("subject"),
    content: formData.get("content"),
    category: formData.get("category"),
    userId: formData.get("userId"),
    published: pb,
  });

  if (!validatedFields.success) {
    return {
      //errors: treeifyError(validatedFields.error),
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Post.",
    };
  }
  // Prepare data for insertion into the database
  const { title, subject, content, category, published } = validatedFields.data;

  try {
    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        subject: subject,
        title: title,
        content: content,
        category: category as PostCategory,
        published: published,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Update Post.",
    };
  }

  //revalidatePath(`/dashboard/posts/${id}/edit`);
  redirect("/dashboard/posts");
}
