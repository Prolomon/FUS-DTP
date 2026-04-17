import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import Link from "next/link";

const attendanceMetrics = [
	{ label: "Weekly Attendance", value: 93, detail: "+4% vs last week", tone: "success" },
	{ label: "Late Arrivals", value: 18, detail: "Mostly between 8:15-8:30 AM", tone: "warning" },
	{ label: "Chronic Absences", value: 7, detail: "Needs parent follow-up", tone: "danger" },
	{ label: "Classes Above Target", value: 4, detail: "Out of 4 tracked classes", tone: "primary" },
];

const classAnalytics = [
	{ name: "JSS 1 Gold", attendance: 96, trend: "Improving", absenteeism: "Low" },
	{ name: "JSS 2 Ruby", attendance: 88, trend: "Declining", absenteeism: "Moderate" },
	{ name: "SS 1 Emerald", attendance: 91, trend: "Improving", absenteeism: "Low" },
	{ name: "SS 3 Platinum", attendance: 97, trend: "Improving", absenteeism: "Low" },
];

const attendanceDrivers = [
	"Transport delays during morning assembly",
	"Assessment week reduced late arrivals after 9:00 AM",
	"Parent reminders improved JSS 2 pickup compliance",
	"Rainy weather affected Friday attendance across junior classes",
];

export default function AttendanceAnalyticsPage() {
	return (
		<section className="space-y-6 py-4">
			<Card className="overflow-hidden border border-default-200/70 bg-background/90">
				<CardHeader className="flex flex-col items-start gap-4 px-6 pt-6 md:flex-row md:items-center md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.24em] text-foreground/50">Attendance Analytics</p>
						<h1 className="mt-2 text-3xl font-semibold tracking-tight">Attendance Trends and Risk Signals</h1>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/65">
							Track attendance quality, spot patterns in absenteeism, and prioritize follow-up actions for classes that are drifting below target.
						</p>
					</div>

					<Button as={Link} href="/school/attendance" radius="full" variant="bordered">
						Back to Attendance
					</Button>
				</CardHeader>

				<CardBody className="grid gap-4 px-6 pb-6 pt-0 sm:grid-cols-2 xl:grid-cols-4">
					{attendanceMetrics.map((metric) => (
						<div key={metric.label} className="rounded-2xl border border-default-200/70 bg-default-50/60 p-4">
							<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">{metric.label}</p>
							<p className="mt-3 text-3xl font-semibold text-foreground">
								{metric.value}
								{metric.label === "Late Arrivals" || metric.label === "Chronic Absences" ? "" : "%"}
							</p>
							<div className="mt-3">
								<Chip color={metric.tone as "success" | "warning" | "danger" | "primary"} size="sm" variant="flat">
									{metric.detail}
								</Chip>
							</div>
						</div>
					))}
				</CardBody>
			</Card>

			<div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
				<Card className="border border-default-200/70 bg-background/90">
					<CardHeader className="px-6 pt-6">
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Class Breakdown</p>
							<h2 className="text-2xl font-semibold">Current Attendance by Class</h2>
						</div>
					</CardHeader>
					<CardBody className="space-y-4 px-6 pb-6 pt-0">
						{classAnalytics.map((item) => (
							<div key={item.name} className="rounded-2xl border border-default-200/70 bg-default-50/50 p-4">
								<div className="flex flex-wrap items-center justify-between gap-3">
									<div>
										<p className="font-medium text-foreground">{item.name}</p>
										<p className="text-sm text-foreground/55">Absenteeism: {item.absenteeism}</p>
									</div>
									<Chip color={item.trend === "Improving" ? "success" : "warning"} size="sm" variant="flat">
										{item.trend}
									</Chip>
								</div>

								<div className="mt-4 flex items-center gap-3">
									<Progress aria-label={`${item.name} attendance`} className="flex-1" color="primary" size="sm" value={item.attendance} />
									<p className="min-w-12 text-right text-sm font-medium text-foreground/75">{item.attendance}%</p>
								</div>
							</div>
						))}
					</CardBody>
				</Card>

				<Card className="border border-default-200/70 bg-background/90">
					<CardHeader className="px-6 pt-6">
						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Signals</p>
							<h2 className="text-2xl font-semibold">Attendance Drivers</h2>
						</div>
					</CardHeader>
					<CardBody className="space-y-3 px-6 pb-6 pt-0">
						{attendanceDrivers.map((item, index) => (
							<div key={item} className="flex items-start gap-3 rounded-2xl border border-default-200/70 bg-default-50/50 p-4">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
									{index + 1}
								</div>
								<p className="text-sm leading-6 text-foreground/70">{item}</p>
							</div>
						))}

						<div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
							<p className="text-sm font-medium text-foreground">Recommended action</p>
							<p className="mt-2 text-sm leading-6 text-foreground/70">
								Send parent notifications for JSS 2 Ruby, review transport timing before assembly, and monitor Friday attendance for weather-related drops.
							</p>
						</div>
					</CardBody>
				</Card>
			</div>
		</section>
	);
}
