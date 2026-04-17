import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { Link } from "@heroui/link";
import {
	Bell,
	BookMarked,
	CalendarClock,
	CircleAlert,
	Clock3,
	GraduationCap,
	TrendingUp,
	UserRound,
	Wallet,
} from "lucide-react";

const quickStats = [
	{
		title: "Total Students",
		value: "1,248",
		delta: "+42 this term",
		icon: UserRound,
		tone: "text-emerald-700 dark:text-emerald-300",
	},
	{
		title: "Staff Strength",
		value: "96",
		delta: "3 new hires",
		icon: GraduationCap,
		tone: "text-emerald-700 dark:text-emerald-300",
	},
	{
		title: "Fee Collection",
		value: "NGN 24.8M",
		delta: "84% paid",
		icon: Wallet,
		tone: "text-emerald-700 dark:text-emerald-300",
	},
	{
		title: "Result Completion",
		value: "91%",
		delta: "Awaiting 7 classes",
		icon: BookMarked,
		tone: "text-emerald-700 dark:text-emerald-300",
	},
];

const classPerformance = [
	{ name: "JSS 1 Gold", attendance: 96, averageScore: 74, teacher: "Mrs. A. Yusuf" },
	{ name: "JSS 2 Ruby", attendance: 92, averageScore: 69, teacher: "Mr. D. Ibrahim" },
	{ name: "SS 1 Emerald", attendance: 89, averageScore: 77, teacher: "Mrs. K. Ade" },
	{ name: "SS 3 Platinum", attendance: 94, averageScore: 81, teacher: "Mr. T. Okafor" },
];

const schedule = [
	{
		title: "Morning Assembly",
		time: "08:00 AM",
		description: "All classes at central court",
		label: "School-wide",
	},
	{
		title: "Mid-term Mathematics Test",
		time: "10:30 AM",
		description: "JSS 2 and SS 1 in exam hall",
		label: "Assessment",
	},
	{
		title: "Parent Engagement Meeting",
		time: "01:15 PM",
		description: "Grade 6 guardians with class teachers",
		label: "Parents",
	},
	{
		title: "Staff Review Session",
		time: "03:30 PM",
		description: "Subject heads and principal",
		label: "Leadership",
	},
];

const alerts = [
	{
		title: "Outstanding fees in SS 2",
		details: "18 students have pending tuition above 30 days.",
		priority: "High",
	},
	{
		title: "Attendance anomaly detected",
		details: "JSS 1 Ruby dropped below 85% this week.",
		priority: "Medium",
	},
	{
		title: "Result publishing deadline",
		details: "Science department submission closes in 2 days.",
		priority: "High",
	},
];

export default function SchoolDashboardPage() {
	return (
		<section className="mx-auto w-full space-y-6">

			<div className="relative overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-[linear-gradient(120deg,rgba(59,130,246,0.14),rgba(255,255,255,0.98),rgba(219,234,254,0.75))] p-6 shadow-[0_30px_90px_-45px_rgba(30,64,175,0.45)] dark:border-emerald-300/20 dark:bg-[linear-gradient(120deg,rgba(30,58,138,0.92),rgba(30,64,175,0.74),rgba(15,23,42,0.96))] md:p-8">
				<div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />
				<div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />

				<div className="relative z-10 flex flex-wrap items-start justify-between gap-5">
					<div className="max-w-3xl">
						<p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900/80 dark:text-emerald-100/80">
							School Dashboard
						</p>
						<h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
							Good morning, Hillside College Admin Team.
						</h1>
						<p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/75 md:text-base">
							Monitor student records, staff operations, finance, and academic delivery from
							one control center designed for daily school management.
						</p>
					</div>

					<div className="flex w-full flex-wrap gap-3 sm:w-auto">
						<Button className="bg-emerald-600 px-5 text-white" radius="full" startContent={<TrendingUp size={16} />}>
							Generate Report
						</Button>
						<Button as={Link} href="/auth/login" radius="full" variant="bordered">
							Switch Account
						</Button>
					</div>
				</div>

				<div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{quickStats.map((stat) => {
						const StatIcon = stat.icon;

						return (
							<Card
								key={stat.title}
								className="border border-emerald-100/70 bg-white/85 shadow-[0_10px_35px_-20px_rgba(29,78,216,0.6)] backdrop-blur dark:border-emerald-300/20 dark:bg-slate-950/40"
							>
								<CardBody className="p-5">
									<div className="flex items-start justify-between gap-3">
										<div>
											<p className="text-xs uppercase tracking-[0.2em] text-foreground/55">
												{stat.title}
											</p>
											<p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
										</div>
										<div className="rounded-full border border-emerald-200/70 bg-emerald-50/70 p-2.5 dark:border-emerald-300/25 dark:bg-slate-900/70">
											<StatIcon className={stat.tone} size={18} />
										</div>
									</div>
									<p className="mt-4 text-sm text-foreground/70">{stat.delta}</p>
								</CardBody>
							</Card>
						);
					})}
				</div>
			</div>

			<Card className="overflow-hidden border border-emerald-100/70 bg-white/90 backdrop-blur dark:border-emerald-300/20">
				<CardHeader className="flex flex-col items-start gap-1 px-6 pt-6">
					<p className="text-xs uppercase tracking-[0.2em] text-foreground/55">Class Performance</p>
					<h2 className="text-2xl font-semibold">Attendance and Academic Snapshot</h2>
				</CardHeader>
				<CardBody className="p-0">
					<div className="overflow-x-auto">
						<table className="w-full min-w-[650px] text-left text-sm">
							<thead>
								<tr className="border-y border-default-200/70 bg-default-100/40 text-foreground/65">
									<th className="px-6 py-3 font-medium">Class</th>
									<th className="px-4 py-3 font-medium">Teacher</th>
									<th className="px-4 py-3 font-medium">Attendance</th>
									<th className="px-4 py-3 font-medium">Average Score</th>
									<th className="px-4 py-3 font-medium">Status</th>
								</tr>
							</thead>
							<tbody>
								{classPerformance.map((item) => (
									<tr key={item.name} className="border-b border-default-100 last:border-b-0">
										<td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
										<td className="px-4 py-4 text-foreground/75">{item.teacher}</td>
										<td className="px-4 py-4">
											<div className="w-40 flex gap-2 items-center">
												<Progress
													aria-label={`${item.name} attendance`}
													className="max-w-full"
													color="primary"
													size="sm"
													value={item.attendance}
												/>
												<p className="text-xs text-foreground/60">{item.attendance}%</p>
											</div>
										</td>
										<td className="px-4 py-4 text-foreground/75">{item.averageScore}%</td>
										<td className="px-4 py-4">
											<Chip className="border-0" color="primary" size="sm" variant="flat">
												{item.averageScore >= 75 ? "On Track" : "Watchlist"}
											</Chip>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardBody>
			</Card>

			<div className="grid gap-5">
				<Card className="border border-emerald-100/70 bg-white/90 backdrop-blur dark:border-emerald-300/20">
					<CardHeader className="flex items-start justify-between gap-2 px-6 pt-6 pb-2">
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-foreground/55">Today</p>
							<h2 className="text-xl font-semibold">Schedule</h2>
						</div>
						<CalendarClock className="text-foreground/50" size={18} />
					</CardHeader>
					<CardBody className="gap-3 px-6 pb-6 pt-2">
						{schedule.map((item) => (
							<div
								key={`${item.title}-${item.time}`}
								className="rounded-2xl border border-emerald-100/70 bg-emerald-50/35 p-3 dark:border-emerald-300/20 dark:bg-slate-900/45"
							>
								<div className="flex items-center justify-between gap-2">
									<p className="text-sm font-medium text-foreground">{item.title}</p>
									<Chip size="sm" variant="flat">
										{item.label}
									</Chip>
								</div>
								<p className="mt-1 flex items-center gap-1.5 text-xs text-foreground/60">
									<Clock3 size={13} />
									{item.time}
								</p>
								<p className="mt-2 text-sm text-foreground/70">{item.description}</p>
							</div>
						))}
					</CardBody>
				</Card>
			</div>

			<div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
				<Card className="border border-emerald-100/70 bg-white/90 backdrop-blur dark:border-emerald-300/20">
					<CardHeader className="flex flex-col items-start gap-1 px-6 pt-6">
						<p className="text-xs uppercase tracking-[0.2em] text-foreground/55">Action Center</p>
						<h2 className="text-2xl font-semibold">Critical Alerts</h2>
					</CardHeader>
					<CardBody className="gap-3 px-6 pb-6 pt-2">
						{alerts.map((alert) => (
							<div
								key={alert.title}
								className="rounded-2xl border border-emerald-200/70 bg-emerald-50/45 p-4 dark:border-emerald-400/20 dark:bg-emerald-950/20"
							>
								<div className="flex items-center justify-between gap-2">
									<p className="flex items-center gap-2 text-sm font-semibold text-foreground">
										<CircleAlert className="text-emerald-600 dark:text-emerald-300" size={16} />
										{alert.title}
									</p>
									<Chip className="border-0" color="primary" size="sm" variant="flat">
										{alert.priority}
									</Chip>
								</div>
								<p className="mt-2 text-sm text-foreground/75">{alert.details}</p>
							</div>
						))}
					</CardBody>
				</Card>

				<Card className="border border-emerald-100/70 bg-white/90 backdrop-blur dark:border-emerald-300/20">
					<CardHeader className="flex items-start justify-between gap-2 px-6 pt-6 pb-2">
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-foreground/55">Live Feed</p>
							<h2 className="text-2xl font-semibold">Recent Activity</h2>
						</div>
						<Bell className="text-foreground/50" size={18} />
					</CardHeader>
					<CardBody className="gap-3 px-6 pb-6 pt-2">
						<div className="rounded-2xl border border-emerald-100/70 bg-white/80 p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
							<p className="text-sm font-medium">11 new student registrations approved</p>
							<p className="mt-1 text-xs text-foreground/60">Admissions desk • 35 minutes ago</p>
						</div>
						<div className="rounded-2xl border border-emerald-100/70 bg-white/80 p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
							<p className="text-sm font-medium">First term result sheet uploaded for SS 3 Arts</p>
							<p className="mt-1 text-xs text-foreground/60">Exams office • 1 hour ago</p>
						</div>
						<div className="rounded-2xl border border-emerald-100/70 bg-white/80 p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
							<p className="text-sm font-medium">3 staff accounts updated with new subject allocations</p>
							<p className="mt-1 text-xs text-foreground/60">HR portal • 2 hours ago</p>
						</div>
						<div className="rounded-2xl border border-emerald-100/70 bg-white/80 p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
							<p className="text-sm font-medium">PTA broadcast sent to 524 guardians</p>
							<p className="mt-1 text-xs text-foreground/60">Communication center • 3 hours ago</p>
						</div>
					</CardBody>
				</Card>
			</div>
		</section>
	);
}
