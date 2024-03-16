import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "us-east-2",
});
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

async function saveMealImageFileToS3(image, fileName) {
  const bufferedImage = await image.arrayBuffer();
  s3.putObject({
    Bucket: "evansaurus-levelup-foods-app",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: image.type,
  });
}

export async function saveMeal(meal) {
  const slug = slugify(meal.title, { lower: true });
  const imageExtenstion = meal.image.name.split(".").pop();
  const imageFileName = `${slug}.${imageExtenstion}`;

  await saveMealImageFileToS3(meal.image, imageFileName);

  const mealFinal = {
    ...meal,
    slug,
    instructions: xss(meal.instructions),
    image: imageFileName,
  };

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(mealFinal);
}
