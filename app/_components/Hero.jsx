import Image from "next/image"

const Hero = () => {
	return (
		<section className="bg-gray-50 flex items-center flex-col">
			<div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
				<div className="mx-auto max-w-xl text-center">
					<h1 className="text-3xl font-extrabold sm:text-5xl">
						Manage Your Expenses
						<strong className="font-extrabold text-primary sm:block mt-3"> Control your money</strong>
					</h1>

					<p className="mt-3 sm:text-xl/relaxed text-slate-400">
						Start creating your budget and save ton of money
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<a
							className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
							href="/sign-up"
						>
							Get Started
						</a>

					</div>
				</div>
			</div>
			<Image src={'/Dashboard-1.png'} alt="dashboard" width={1363} height={1086} className="mt-5 rounded-xl border-2 p-10"/>
			<Image src={'/Dashboard-2.png'} alt="budgets" width={1380} height={800} className="mt-5 rounded-xl border-2 p-10"/>
			<Image src={'/Dashboard-3.png'} alt="budget-food" width={1363} height={857} className="mt-5 rounded-xl border-2 p-10"/>
		</section>
	)
}

export default Hero
