import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";

export const sidebarLinks = [
	{
		id: 1,
		label: 'Dashboard',
		route: '/dashboard',
		icon: LayoutGrid
	},
	{
		id: 2,
		label: 'Budgets',
		route: '/dashboard/budgets',
		icon: PiggyBank
	},
	{
		id: 3,
		label: 'Expenses',
		route: '/dashboard/expenses',
		icon: ReceiptText
	},
	{
		id: 4,
		label: 'Upgrade',
		route: '/dashboard/upgrade',
		icon: ShieldCheck
	},
]