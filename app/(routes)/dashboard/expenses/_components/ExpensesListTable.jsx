import { db } from "@/db/dbConfig"
import { Expenses } from "@/db/schema"
import { cn } from "@/lib/utils"
import { eq } from "drizzle-orm"
import { Trash } from "lucide-react"
import { toast } from "sonner"

const ExpensesListTable = ({expensesList, refreshData}) => {

	const deleteExpense = async (expense) => {
		const result = await db
			.delete(Expenses)
			.where(eq(Expenses.id, expense.id))
			.returning()
		if (result)
		{
			refreshData()
			toast("Expense Deleted")
		}
	}

	return (
		<div className="mt-4">
			<div className="grid grid-cols-4 bg-slate-200 p-2">
				<h2 className="font-bold">Name</h2>
				<h2 className="font-bold">Amount</h2>
				<h2 className="font-bold">Date</h2>
				<h2 className="font-bold">Action</h2>
			</div>

			{expensesList.map((expense, index) => (
				<div
					className={
						cn("grid grid-cols-4 p-2",
							{
								"bg-slate-100": index % 2 != 0
							}
						)
					}
				>
					<h2>{expense.name}</h2>
					<h2>{expense.amount}</h2>
					<h2>{expense.createdAt}</h2>
					<h2>
						<Trash
							className="p-1 rounded-sm text-red-500 cursor-pointer hover:bg-red-500 hover:text-white"
							onClick={() => deleteExpense(expense)}
						/>
					</h2>
				</div>
			))}
		</div>
	)
}

export default ExpensesListTable
