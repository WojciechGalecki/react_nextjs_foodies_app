"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { saveMeal } from "./meals";

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isEmpty(meal.title) ||
    isEmpty(meal.summary) ||
    isEmpty(meal.instructions) ||
    isEmpty(meal.creator) ||
    isEmpty(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input."
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals"); //triggering Next.js cache revalidations for production
  redirect("/meals");
}

function isEmpty(text) {
  return !text || text.trim() === "";
}
