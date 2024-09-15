"use client"

import { db } from "@/db/dbConfig"
import { useUser } from "@clerk/nextjs"
import { desc, eq } from "drizzle-orm"
import ExpensesListTable from "./_components/ExpensesListTable"
import { Budgets, Expenses } from "@/db/schema"
import { useEffect, useState } from "react"

const	ExpensesScreen = () => {

	const [expensesList, setExpensesList] = useState([])
	const {user} = useUser();

	useEffect(() => {
		user && getAllExpenses();
	}, [user]);

	const getAllExpenses = async () => {
		const result = await db
			.select({
				id: Expenses.id,
				name: Expenses.name,
				amount: Expenses.amount,
				createdAt: Expenses.createdAt
			})
			.from(Budgets)
			.rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
			.where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
			.orderBy(desc(Expenses.id));
		setExpensesList(result);
	}

	return (
		<div className="p-10">
			<h2 className="font-bold text-3xl">My Expenses</h2>
			<ExpensesListTable
				expensesList={expensesList}
				refreshData={() => getAllExpenses()}
			/>
		</div>
	)
}

export default ExpensesScreen
