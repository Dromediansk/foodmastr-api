type SelectedLanguage = {
  EN: string;
  SK: string;
};

interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  country: string;
  selectedLang: SelectedLanguage;
}

interface Ingredient {
  id: number;
  name: string;
}

interface IngredientWithQuantity extends Ingredient {
  quantity: number;
  units: string;
}

interface Recipe {
  id: number;
  owner: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  name: string;
  ingredients: IngredientWithQuantity[];
  description: string;
}
