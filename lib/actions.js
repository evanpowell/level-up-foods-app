"use server";

export async function shareMeal() {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    name: formData.get("name"),
    creator_email: formData.get("email"),
  };

  console.log(meal);
}