import { UserButton } from "@clerk/nextjs"

const DashboardHeader = () => {
	return (
		<div className="px-8 py-4 shadow-sm border-b flex justify-between items-center">
			<div>

			</div>
			<div>
				<UserButton />
			</div>
		</div>
	)
}

export default DashboardHeader
