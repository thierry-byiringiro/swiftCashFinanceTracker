export type TransactionsType = "income" | "expense";
export type Category = "Salary" | "Food" | "Rent" | "Leisure" | "Other";

export type Transactions = {
  id: string;
  description: string;
  amount: number;
  type: TransactionsType;
  category: Category;
  date: string;
};
