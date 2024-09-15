import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const BarChartDashboard = ({budgetList}) => {
	return (
		<div className="border rounded-lg mt-4 p-5">
			<ResponsiveContainer width={'100%'} height={300}>
				<BarChart
					data={budgetList}
					margin={{
						top: 7,
					}}
				>
					<XAxis dataKey="name"/>
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
					<Bar dataKey="amount" stackId="a" fill="#c3c2ff" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default BarChartDashboard
