"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const MealFormSchema = z.object({
  title: z.string().min(2),
  summary: z.string(),
  instructions: z.string(),
  image: z.instanceof(File),
  creator: z.string().min(2),
  creator_email: z.string().email(),
});

export async function shareMeal(prevState, formData) {
  const { error, data } = MealFormSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  });

  if (error) {
    return { errors: error.issues };
  }

  await saveMeal(data);
  revalidatePath("/meals");
  redirect("/meals");
}
