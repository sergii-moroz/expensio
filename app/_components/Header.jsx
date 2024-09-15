"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

const { Button } = require("@/components/ui/button")
const { default: Image } = require("next/image")

const Header = () => {

	const { user, isSignedIn } = useUser()

	return (
		<header className="py-4 flex justify-between items-center border shadow-sm px-4 lg:px-8">
			<div className="flex gap-3 items-baseline">
				<Image src={'./logo.svg'} width={30} height={30} />
				<div className="text-primary font-bold text-2xl lg:text-5xl">Expens.io</div>
			</div>
			{ isSignedIn ? <UserButton /> :
				<div className="flex gap-3">
					<Link href={'./sign-in'}>
						<Button variant="outline" className="text-primary border-primary">Sign In</Button>
					</Link>
					<Link href={'./sign-up'}>
						<Button>Sign Up</Button>
					</Link>
				</div>
			}
		</header>
	)
}

export default Header
