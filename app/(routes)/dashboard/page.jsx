"use client"

import { useUser } from "@clerk/nextjs"
import CardInfo from "./_components/CardInfo";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/db/schema";
import { db } from "@/db/dbConfig";
import { useEffect, useState } from "react";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpensesListTable from "./expenses/_components/ExpensesListTable";

const Dashboard = () => {

	const [budgetList, setBudgetList] = useState([])
	const [expensesList, setExpensesList] = useState([])
	const {user} = useUser()

	useEffect(() => {
		user && getBudgetList();
	}, [user])

	const getBudgetList = async () => {

		const result = await db
			.select({
				...getTableColumns(Budgets),
				totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
				totalItems: sql `count(${Expenses.id})`.mapWith(Number)
			})
			.from(Budgets)
			.leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
			.where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
			.groupBy(Budgets.id)
			.orderBy(desc(Budgets.id))

		setBudgetList(result);
		getAllExpenses();
	}

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
			<h2 className="font-bold text-3xl">
				Hi, {user?.firstName}
			</h2>
			<p className="text-gray-500">Here's what happenning with your money. Lets manage your expenses together!</p>
			<CardInfo budgetList={budgetList} />
			<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

				<div className="md:col-span-2">
					<div className="">
						<h2 className="font-bold text-lg">Activity</h2>
						<BarChartDashboard budgetList={budgetList} />
					</div>
					<div className="mt-4">
						<h2 className="font-bold text-lg">Latest Expenses</h2>
						<ExpensesListTable
							expensesList={expensesList}
							refreshData={() => getBudgetList()}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-5">
					<h2 className="font-bold text-lg">Latest Budgets</h2>
					{budgetList.map((budget, index) => (
						<BudgetItem budget={budget} key={index} />
					))}
				</div>

			</div>
		</div>
	)
}

export default Dashboard