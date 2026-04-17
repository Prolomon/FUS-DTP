"use client";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";

const highlights = [
	"Student management",
	"Staff management",
	"Result checker",
	"Attendance tracking",
];

export default function LoginPage() {

	const router = useRouter();

	const handleLogin = () => {
		router.replace("/school")
	}

	return (
		<section className="relative mx-auto w-full max-w-6xl overflow-x-clip px-4 pb-16 pt-8 sm:px-6 md:pt-12">
			<div className="pointer-events-none absolute left-[-70px] top-[-30px] -z-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
			<div className="pointer-events-none absolute right-[-90px] top-[240px] -z-10 h-56 w-56 rounded-full bg-orange-400/20 blur-3xl" />

			<div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
				<div className="relative overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(249,115,22,0.12),rgba(255,255,255,0.96))] p-6 shadow-[0_24px_80px_-40px_rgba(8,47,73,0.5)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(8,47,73,0.94),rgba(14,116,144,0.82),rgba(120,53,15,0.68))] md:p-8">
					<p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-800 dark:text-emerald-200">
						FUS-DTP
					</p>
					<h1 className="mt-4 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
						Welcome back to your school dashboard.
					</h1>
					<p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/75 md:text-base">
						Log in to continue managing students, staff, attendance, and
						results from one secure workspace.
					</p>

					<div className="mt-6 grid gap-2 sm:grid-cols-2">
						{highlights.map((item) => (
							<div
								key={item}
								className="rounded-2xl border border-white/50 bg-background/75 px-4 py-3 text-sm font-medium text-foreground/85 backdrop-blur dark:border-white/10 dark:bg-slate-950/35"
							>
								{item}
							</div>
						))}
					</div>
				</div>

				<Card className="border border-default-200/70 bg-background/85 shadow-lg shadow-emerald-900/5 backdrop-blur rounded-[2rem]">
					<CardHeader className="flex flex-col items-start gap-2 p-6 md:p-8">
						<p className="text-xs uppercase tracking-[0.24em] text-foreground/55">
							Sign In
						</p>
						<h2 className="text-3xl font-semibold">Account Login</h2>
						<p className="text-sm text-foreground/70">
							Enter your school email and password to continue.
						</p>
					</CardHeader>

					<CardBody className="gap-4 p-6 pt-0 md:p-8 md:pt-0">
						<Input
							isRequired
							label="Email"
							placeholder="admin@school.edu"
							type="email"
							labelPlacement="outside"
							size="lg"
						/>
						<Input
							isRequired
							label="Password"
							placeholder="Enter your password"
							type="password"
							labelPlacement="outside"
							size="lg"
						/>

						<div className="flex items-center justify-between text-sm">
							<Link className="text-foreground/75" href="#">
								Remember this device
							</Link>
							<Link className="text-emerald-600" href="/auth/forget-password">
								Forgot password?
							</Link>
						</div>

						<Button onPress={handleLogin} className="mt-2 bg-emerald-600 text-white" radius="full" size="lg">
							Continue
						</Button>

						<Button as={Link} href="/#home" radius="full" variant="light">
							Back to Home
						</Button>
					</CardBody>
				</Card>
			</div>
		</section>
	);
}
