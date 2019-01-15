import { Food } from './food-interface';
import { Meal } from './meal-interface';
export interface Mpt {
    id?: string;
    title: string;
    comment: string;
    breakfastIngredients?: Meal;
    lunchIngredients?: Meal;
    dinnerIngredients?: Meal;
    snacksIngredients?: Meal;
    totalKcal?: number;
    totalProtein?: number;
    totalCarbs?: number;
    totalFat?: number;
}
