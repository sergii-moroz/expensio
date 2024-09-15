import Link from "next/link"

const BudgetItem = ({budget}) => {

	const calculateProgressPerc = () => {
		const perc = (budget.totalSpend / budget.amount) * 100;
		return perc.toFixed(2);
	}

	return (
		<Link href={'/dashboard/expenses/' + budget.id} >
			<div className="p-5 border rounded-lg flex flex-col justify-between gap-2 cursor-pointer hover:shadow-md">
				<div className="flex gap-2 items-center justify-between w-full">
					<div className="flex gap-2 items-center">
						<h2 className="text-2xl p-3 bg-slate-100 rounded-full">{budget?.icon}</h2>
						<div>
							<h2 className="font-bold">{budget?.name}</h2>
							<h2 className="text-sm text-slate-400">{budget?.totalItems} Items</h2>
						</div>
					</div>
					<h2 className="font-bold text-primary text-3xl">{budget?.amount}€</h2>
				</div>

				{/* progress bar */}
				<div>
					<div className="flex justify-between mb-1">
						<h2 className="text-xs text-slate-400">
							Spend: {budget.totalSpend ? budget.totalSpend : 0}€
						</h2>
						<h2 className="text-xs text-slate-400">
							Remaining: {budget.amount - budget.totalSpend}€
						</h2>
					</div>

					<div className="w-full bg-slate-300 h-2 rounded-full">
						<div
							className="bg-primary h-2 rounded-full"
							style={{width: `${calculateProgressPerc()}%`}}
						></div>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default BudgetItem
