import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/db/dbConfig"
import { Budgets, Expenses } from "@/db/schema"
import { Loader } from "lucide-react"
import moment from "moment"
import { useState } from "react"
import { toast } from "sonner"

const AddExpense = ({budgetId, user, refreshData}) => {

	const [name, setName] = useState()
	const [amount, setAmount] = useState()
	const [loading, setLoading] = useState(false)

	const addNewExpense = async () => {
		setLoading(true)
		const result = await db
			.insert(Expenses)
			.values({
				name: name,
				amount: amount,
				budgetId: budgetId,
				createdAt: moment().format("yyyy-MM-DD")
			})
			.returning({insertedId: Budgets.id})

		setAmount('')
		setName('')
		if (result)
		{
			setLoading(false)
			refreshData()
			toast("New Expense Added")
		}
		setLoading(false)
	}

	return (
		<div className="border p-5 rounded-lg">
			<h2 className="font-bold text-3xl text-primary">Add Expense</h2>
			<div className="mt-2">
				<h2 className="text-black font-medium my-1">Name</h2>
				<Input
					value={name}
					placeholder="e.g. Home, Food, Decor ..."
					onChange={(event) => setName(event.target.value)}
				/>
			</div>
			<div className="mt-2">
				<h2 className="text-black font-medium my-1">Amount</h2>
				<Input
					type="number"
					placeholder="e.g. 50€ ..."
					value={amount}
					onChange={(event) => setAmount(event.target.value)}
				/>
			</div>
			<Button
				disabled={!(name && amount) || loading}
				onClick={() => addNewExpense()}
				className="mt-3 w-full"
			>
				{loading ? <Loader className="animate-spin" /> : "Add New"}
			</Button>
		</div>
	)
}

export default AddExpense
