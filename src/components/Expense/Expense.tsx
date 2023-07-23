import React, { useEffect, useReducer, useState } from "react";
import { IExpense } from "../../Interface";
import { ExpenseEnum } from "../../enums";
import { expenseReducer } from "../Reducer";
import "./expense.css";
const Expense = ({ expense, setExpense }: IExpense) => {
  const [nameInput, setNameInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<number>(0);
  const [editingId, setEditingId] = useState<number | null>(null); // Track the currently edited expense ID
  const [editedName, setEditedName] = useState<string>(""); // Hold the edited name
  const [editedAmount, setEditedAmount] = useState<number>(0); // Hold the edited amount

  const [state, dispatch] = useReducer(expenseReducer, expense, () => {
    const savedExpense = localStorage.getItem("expenses");
    return savedExpense ? JSON.parse(savedExpense) : [];
  });

  const addExpense = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch({
      type: ExpenseEnum.ADD_EXPENSE,
      payload: {
        name: nameInput,
        amount: amountInput,
        id: Math.round(Math.random() * 1000),
      },
    });
    setNameInput("");
    setAmountInput(0);
    localStorage.setItem("expenses", JSON.stringify(state));
  };

  const handleDelete = (id: number) => {
    dispatch({ type: ExpenseEnum.DELETE_EXPENSE, payload: id });
  };

  const handleEdit = (id: number, name: string, amount: number) => {
    setEditingId(id);
    setEditedName(name);
    setEditedAmount(amount);
  };

  const handleSave = () => {
    if (editingId !== null) {
      dispatch({
        type: ExpenseEnum.EDIT_EXPENSE,
        payload: {
          id: editingId,
          name: editedName,
          amount: editedAmount,
        },
      });
      setEditingId(null);
      setEditedName("");
      setEditedAmount(0);
      localStorage.setItem("expenses", JSON.stringify(state));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedName("");
    setEditedAmount(0);
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state));
    setExpense(state);
  }, [state, setExpense]);

  return (
    <div className="expenses">
      <div className="expenses_title">
        <h1>Expenses</h1>
      </div>
      <div className="add_expense">
        <form onSubmit={addExpense}>
          <h2>Add Expense:</h2>
          <div className="add_expense_input">
            <label>
              Name:
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={amountInput || ""}
                name="expenseAmount"
                onChange={(e) => setAmountInput(Number(e.target.value))}
              />
            </label>
          </div>
          <button type="submit" className="submit_button">
            Add Expense
          </button>
        </form>
      </div>
      <div className="expenses_table">
        {state.map((expense) => (
          <table key={expense.id}>
            <tbody>
              <tr>
                {editingId === expense.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editedAmount}
                        onChange={(e) =>
                          setEditedAmount(Number(e.target.value))
                        }
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{expense.name.toUpperCase()}</td>
                    <td className="amount">£{expense.amount}</td>
                  </>
                )}
                <td className="amount_button">
                  {editingId === expense.id ? (
                    <>
                      <button onClick={handleSave} className="button">
                        Save
                      </button>{" "}
                      <button onClick={handleCancel} className="button">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        handleEdit(expense.id, expense.name, expense.amount)
                      }
                      className="button"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="button"
                    onClick={() => handleDelete(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default Expense;
