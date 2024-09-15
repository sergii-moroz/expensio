"use client"
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
import { db } from "@/db/dbConfig";
import { eq } from "drizzle-orm";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PenBox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Budgets } from "@/db/schema";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const EditBudget = ({budgetInfo, refreshData}) => {

	const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
	const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

	const [name, setName] = useState(budgetInfo?.name);
	const [amount, setAmount] = useState(budgetInfo?.amount);

	const {user} = useUser();

	useEffect(() => {
		if (budgetInfo)
		{
			setEmojiIcon(budgetInfo?.icon);
			setAmount(budgetInfo?.amount);
			setName(budgetInfo?.name);
		}
	}, [budgetInfo]);

	const onUpdateBudget = async () => {
		const result = await db
			.update(Budgets)
			.set({
				name: name,
				amount: amount,
				icon: emojiIcon
			})
			.where(eq(Budgets.id, budgetInfo?.id))
			.returning()
		if (result)
		{
			refreshData();
			toast("Budget updated");
		}
	}

	return (
		<Dialog>

			<DialogTrigger asChild>
				<Button className="flex gap-2">
					<PenBox />Edit
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
				<DialogTitle>Edit Budget</DialogTitle>
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
							defaultValue={budgetInfo?.name}
							onChange={(event) => setName(event.target.value)}
						/>
					</div>
					<div className="mt-2">
						<h2 className="text-black font-medium my-1">Budget Amount</h2>
						<Input
							type="number"
							defaultValue={budgetInfo?.amount}
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
							onClick={() => onUpdateBudget()}
						>
							Update Budget
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>

		</Dialog>
	)
}

export default EditBudget
