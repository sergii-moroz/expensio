"use client"
import { useUser } from "@clerk/nextjs"
import DashboardHeader from "./_components/DashboardHeader"
import SideBar from "./_components/SideBar"
import { db } from "@/db/dbConfig"
import { Budgets } from "@/db/schema"
import { eq } from "drizzle-orm"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const DashboardLayout = ({children}) => {

	const {user} = useUser()
	const router = useRouter()

	useEffect(() => {
		user && checkUserBudgets()
	}, [user])

	const checkUserBudgets = async () => {
		const result = await db
			.select()
			.from(Budgets)
			.where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
		if (result?.length == 0)
			router.replace('/dashboard/budgets')
	}

	return (
		<div>
			<div className="fixed md:w-64 hidden md:block">
				<SideBar />
			</div>
			<div className="md:ml-64">
				<DashboardHeader />
				{children}
			</div>
		</div>
	)
}

export default DashboardLayout
