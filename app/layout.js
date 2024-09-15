import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });
// const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
  title: "Expensio",
  description: "Manage your expenses",
  icons: {
	icon: './logo.svg'
  }
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={outfit.className}
				>
					<Toaster />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}

// `${geistSans.variable} ${geistMono.variable} antialiased`