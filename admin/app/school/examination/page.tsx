import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Link from "next/link";

const examinations = [
	{ id: "math-midterm-jss2", name: "Mathematics Midterm - JSS2", className: "JSS2", subject: "Mathematics", questionCount: 40, status: "Published" },
	{ id: "english-final-ss1", name: "English Final - SS1", className: "SS1", subject: "English", questionCount: 55, status: "Draft" },
	{ id: "biology-ca-ss2", name: "Biology CA - SS2", className: "SS2", subject: "Biology", questionCount: 30, status: "Published" },
	{ id: "civic-test-jss3", name: "Civic Weekly Test - JSS3", className: "JSS3", subject: "Civic Education", questionCount: 20, status: "Review" },
];

export default function ExaminationPage() {
	return (
		<section className="space-y-5 py-4">
			<Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
				<CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
					<div>
						<p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Academic Assessment</p>
						<h2 className="text-2xl font-semibold">Examinations</h2>
						<p className="mt-1 text-sm text-foreground/70">Manage exam papers and open each exam to view details.</p>
					</div>
					<Button as={Link} href="/school/examination/add" className="bg-emerald-600 text-white" radius="full">
						Add Examination
					</Button>
				</CardHeader>
				<CardBody className="grid gap-3 px-6 pb-6">
					{examinations.map((exam) => (
						<div key={exam.id} className="rounded-2xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
							<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
								<div>
									<Link
										href={`/school/examination/${exam.id}`}
										className="text-sm font-semibold text-emerald-700 transition hover:underline dark:text-emerald-300"
										title="Open examination details"
									>
										{exam.name}
									</Link>
									<p className="mt-1 text-sm text-foreground/70">Class: {exam.className}</p>
									<p className="mt-1 text-sm text-foreground/70">Subject: {exam.subject}</p>
									<p className="mt-1 text-xs text-foreground/60">Questions: {exam.questionCount}</p>
								</div>
								<Chip className="border-0" color={exam.status === "Published" ? "success" : exam.status === "Draft" ? "warning" : "primary"} size="sm" variant="flat">
									{exam.status}
								</Chip>
							</div>
						</div>
					))}
				</CardBody>
			</Card>
		</section>
	);
}

