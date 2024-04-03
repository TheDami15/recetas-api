
export const filterRecipesByAllergens = (recipes, selectedAllergens) => {
    return recipes.filter(recipe => {
      return !selectedAllergens.some(allergen => recipe.alergenos.includes(allergen));
    });
  };