"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { InputOtp } from "@heroui/input-otp";
import { Link } from "@heroui/link";

const recoverySteps = [
	"Enter your school email address",
	"Check your inbox for a secure reset link",
	"Create a new password and sign in",
];

export default function ForgotPasswordPage() {
	const [otp, setOtp] = useState("");
	const [email, setEmail] = useState("");
	const [isOtp, setIsOtp] = useState(false);

	const handleClick = () => {
		if (!isOtp) {

			try {
				alert("Sending otp to your email...");
			} catch (error) {
				console.log(error)
			} finally {
				setIsOtp(true);
			}
		} else {
			// Simulate OTP verification and password reset
			alert("OTP verified! You can now reset your password.");
		}
	};

	return (
		<section className="relative mx-auto w-full max-w-6xl overflow-x-clip px-4 pb-16 pt-8 sm:px-6 md:pt-12">
			<div className="pointer-events-none absolute left-[-70px] top-[-30px] -z-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
			<div className="pointer-events-none absolute right-[-90px] top-[240px] -z-10 h-56 w-56 rounded-full bg-orange-400/20 blur-3xl" />

			<div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
				<div className="relative overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),rgba(249,115,22,0.12),rgba(255,255,255,0.96))] p-6 shadow-[0_24px_80px_-40px_rgba(8,47,73,0.5)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(8,47,73,0.94),rgba(14,116,144,0.82),rgba(120,53,15,0.68))] md:p-8">
					<p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-800 dark:text-emerald-200">
						FUS-DITP
					</p>
					<h1 className="mt-4 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
						Forgot your password?
					</h1>
					<p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/75 md:text-base">
						No problem. We will send a secure password reset link to your school
						email so you can regain access quickly.
					</p>

					<div className="mt-6 space-y-3">
						{recoverySteps.map((step, index) => (
							<div
								key={step}
								className="flex items-center gap-3 rounded-2xl border border-white/50 bg-background/75 px-4 py-3 text-sm font-medium text-foreground/85 backdrop-blur dark:border-white/10 dark:bg-slate-950/35"
							>
								<span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
									{index + 1}
								</span>
								<span>{step}</span>
							</div>
						))}
					</div>
				</div>

				<Card className="rounded-[2rem] border border-default-200/70 bg-background/85 shadow-lg shadow-emerald-900/5 backdrop-blur">
					<CardHeader className="flex flex-col items-start gap-2 p-6 md:p-8">
						<p className="text-xs uppercase tracking-[0.24em] text-foreground/55">
							Password Reset
						</p>
						<h2 className="text-3xl font-semibold">Recover Account</h2>
						<p className="text-sm text-foreground/70">
							Enter your email and we will send a reset link.
						</p>
					</CardHeader>

					<CardBody className="gap-4 p-6 pt-0 md:p-8 md:pt-0">
						<Input
							isRequired
							label="School Email"
							placeholder="admin@school.edu"
							type="email"
							labelPlacement="outside"
							size="lg"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{isOtp && (<>
							<div>
								<p className="mb-1 text-sm text-foreground/70">
									To verify your identity, please enter the 8-digit OTP code sent to
									your email.
								</p>
								<p className="text-xs text-foreground/50">
									If you don't receive the code within a few minutes, please check
									your spam folder or request a new code.
								</p>
							</div>
							<InputOtp
								isRequired
								label="OTP Code"
								placeholder="Enter 8-digit code"
								length={8}
								size="lg"
								allowedKeys="^[A-Z0-9]*$"
								value={otp}
								onValueChange={(v) => setOtp(v.toUpperCase())}
								step={1}
							/> </>)}
						<Button className="mt-2 bg-emerald-600 text-white" radius="full" size="lg" onClick={handleClick}>
							Send Reset Link
						</Button>

						<Button as={Link} href="/auth/login" radius="full" variant="light">
							Back to Sign In
						</Button>
					</CardBody>
				</Card>
			</div>
		</section>
	);
}
