"use client"

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/db/dbConfig";
import { Budgets } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CreateBudget = ({refreshData}) => {

	const [emojiIcon, setEmojiIcon] = useState("😀");
	const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

	const [name, setName] = useState();
	const [amount, setAmount] = useState();

	const {user} = useUser();

	const onCreateBudget = async () => {
		const result = await db
			.insert(Budgets)
			.values({
				name: name,
				amount: amount,
				createdBy: user?.primaryEmailAddress?.emailAddress,
				icon: emojiIcon
			})
			.returning({insertedId: Budgets.id})

		if (result) {
			refreshData()
			toast("New Budget Created!")
		}
	}

	return (
		<div>
			<Dialog>

				<DialogTrigger asChild>
					<div className="bg-slate-100 p-5 rounded-md items-center flex flex-col border cursor-pointer hover:shadow-md">
						<h2 className="font-bold text-3xl p-4 text-white bg-slate-300 rounded-full"><Plus /></h2>
						<h2 className="mt-3 text-slate-400">Create New Budget</h2>
					</div>
				</DialogTrigger>

				<DialogContent>
					<DialogHeader>
					<DialogTitle>Create New Budget</DialogTitle>
					<DialogDescription>

						<div className="mt-5">
							<Button
								variant="outline"
								size="icon"
								className="text-lg"
								onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
							>
								{emojiIcon}
							</Button>
						</div>
						<div className="absolute z-10">
							<EmojiPicker
								open={openEmojiPicker}
								onEmojiClick={(event) => {
									setEmojiIcon(event.emoji);
									setOpenEmojiPicker(false);
								}}
							/>
						</div>
						<div className="mt-2">
							<h2 className="text-black font-medium my-1">Budget Name</h2>
							<Input
								placeholder="e.g. Home, Food, Decor ..."
								onChange={(event) => setName(event.target.value)}
							/>
						</div>
						<div className="mt-2">
							<h2 className="text-black font-medium my-1">Budget Amount</h2>
							<Input
								type="number"
								placeholder="e.g. 50€ ..."
								onChange={(event) => setAmount(event.target.value)}
							/>
						</div>

					</DialogDescription>
					</DialogHeader>

					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button
								className="mt-5 w-full"
								disabled={!(name && amount)}
								onClick={() => onCreateBudget()}
							>
								Create Budget
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>

			</Dialog>
		</div>
	)
}

export default CreateBudget
