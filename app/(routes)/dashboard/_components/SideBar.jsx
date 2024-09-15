import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SideBar = () => {

	const pathname = usePathname()

	return (
		<div className="h-screen px-2 py-4 border shadow-sm">
			<div className="px-4 flex gap-3 items-baseline">
				<Image src={'./logo.svg'} alt="logo" width={30} height={30}/>
				<div className="text-primary text-3xl font-bold">Expens.io</div>
			</div>
			<div className="mt-4">
				{sidebarLinks.map((menu) => {

					const isActive = pathname === menu.route;

					return <Link
						key={menu.id}
						href={menu.route}
						className={
							cn("mt-2 flex gap-2 items-center text-gray-500 font-medium p-4 cursor-pointer rounded-md border border-transparent hover:text-primary hover:border hover:border-slate-200",
								{
									"text-primary bg-slate-100": isActive
								}
							)
						}
					>
						<menu.icon />
						<p>{menu.label}</p>
					</Link>
				})}
			</div>
		</div>
	)
}

export default SideBar
