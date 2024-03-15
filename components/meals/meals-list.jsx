import MealItem from "./meal-item";

import styles from "./meals-list.module.css";

export default function MealsList({ meals }) {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
