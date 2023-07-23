export interface ExpenseProps {
    name: string,
    amount: number
    id: number
}

export interface IExpense {
    expense: ExpenseProps[];
    setExpense: React.Dispatch<React.SetStateAction<ExpenseProps[]>>;
}
