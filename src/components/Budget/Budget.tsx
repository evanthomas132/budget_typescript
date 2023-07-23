import React, {
    FormEventHandler,
    MouseEventHandler,
    useEffect,
    useState,
} from "react";
import Expense from "../Expense/Expense";
import { ExpenseProps } from "../../Interface";
import "./budget.css";


const Budget = () => {
    const [budget, setBudget] = useState<number>(() => {
        const storedBudget = localStorage.getItem("budget");
        return storedBudget ? JSON.parse(storedBudget) : 0;
    });

    const [expenses, setExpenses] = useState<ExpenseProps[]>([])
    console.log(expenses)
    const [editMode, setEditMode] = useState<boolean>(false);

    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const remaining: number = budget - totalExpenses;
    const spent: number = budget - remaining;

    const handleEdit: MouseEventHandler<HTMLButtonElement> = (
        e: React.MouseEvent
    ) => {
        setEditMode(!editMode);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setEditMode(false);
    };

    useEffect(() => {
        localStorage.setItem("budget", JSON.stringify(budget));
    }, [budget, expenses]);

    return (
        <>
            <div className="budget_component">
                <div className="budget_option">
                    {editMode ? (
                        <form onSubmit={handleSubmit}>
                            Budget: £
                            <input
                                type="number"
                                value={budget || ""}
                                onChange={(e) => setBudget(Number(e.target.value))}
                            />
                            <button type="submit" onClick={() => setEditMode(true)}>
                                Save
                            </button>
                        </form>
                    ) : (
                        <div className="budget">
                            Budget: £{budget}
                            <button onClick={handleEdit}>Edit</button>
                        </div>
                    )}
                </div>
                <div className="remaining">Remaining: £{remaining}</div>
                <div className="spent">Spent so far : {spent}</div>
            </div>
            <Expense expense={expenses} setExpense={setExpenses} />
        </>
    );
};

export default Budget;