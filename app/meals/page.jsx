import Link from "next/link";

import styles from "./page.module.css";
import { getMeals } from "@/lib/meals";
import MealsList from "@/components/meals/meals-list";
import { Suspense } from "react";

async function MealsAsync() {
  const meals = await getMeals();
  return <MealsList meals={meals} />;
}

export const metadata = {
  title: "LevelUp Foods - Meals",
  description: "Browse all the meals crafted by a food-loving community.",
};

export default async function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals created{" "}
          <span className={styles.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It's easy and fun!
        </p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense fallback={<p className={styles.loading}>Loading meals...</p>}>
          <MealsAsync />
        </Suspense>
      </main>
    </>
  );
}
