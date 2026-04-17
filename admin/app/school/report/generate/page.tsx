"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";

const reportTypes = [
	"Term Performance Report",
	"Attendance Summary",
	"Finance Collection Analysis",
	"Staff Productivity Snapshot",
	"Custom Report",
];

const reportFormats = ["PDF", "Excel", "CSV"];
const terms = ["First Term", "Second Term", "Third Term"];
const classes = ["All Classes", "JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

export default function GenerateReportPage() {
	const [formData, setFormData] = useState({
		reportName: "",
		reportType: "Term Performance Report",
		term: "First Term",
		className: "All Classes",
		startDate: "",
		endDate: "",
		format: "PDF",
		recipients: "",
		note: "",
	});

	const handleChange = (key: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	const handleGenerate = () => {
		if (!formData.reportName || !formData.startDate || !formData.endDate) {
			addToast({
				title: "Missing fields",
				description: "Please fill report name, start date, and end date.",
				color: "warning",
				closeIcon: true,
			});
			return;
		}

		addToast({
			title: "Report queued",
			description: `${formData.reportName} is being generated in ${formData.format}.`,
			color: "success",
			closeIcon: true,
		});
	};

	const handleReset = () => {
		setFormData({
			reportName: "",
			reportType: "Term Performance Report",
			term: "First Term",
			className: "All Classes",
			startDate: "",
			endDate: "",
			format: "PDF",
			recipients: "",
			note: "",
		});
	};

	return (
		<section className="space-y-5 py-4">
			<Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
				<CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
					<div>
						<p className="text-xs uppercase tracking-[0.2em] text-emerald-700/70 dark:text-emerald-300/80">Analytics Desk</p>
						<h2 className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">Generate Report</h2>
					</div>
					<Button className="bg-emerald-600 text-white" radius="full" size="lg" onPress={handleGenerate}>
						Generate Now
					</Button>
				</CardHeader>

				<CardBody className="grid grid-cols-1 gap-4 px-6 pb-4 md:grid-cols-2">
					<Input
						label="Report Name"
						placeholder="e.g. 2026 First Term Performance"
						value={formData.reportName}
						onChange={(e) => handleChange("reportName", e.target.value)}
						variant="bordered"
						labelPlacement="outside"
						size="lg"
					/>

					<Select
						label="Report Type"
						selectedKeys={[formData.reportType]}
						onSelectionChange={(keys) => handleChange("reportType", Array.from(keys)[0] as string)}
						variant="bordered"
						labelPlacement="outside"
						size="lg"
					>
						{reportTypes.map((item) => (
							<SelectItem key={item}>{item}</SelectItem>
						))}
					</Select>

					<Select
						label="Term"
						selectedKeys={[formData.term]}
						onSelectionChange={(keys) => handleChange("term", Array.from(keys)[0] as string)}
						variant="bordered"
						labelPlacement="outside"
						size="lg"
					>
						{terms.map((item) => (
							<SelectItem key={item}>{item}</SelectItem>
						))}
					</Select>

					<Select
						label="Class"
						selectedKeys={[formData.className]}
						onSelectionChange={(keys) => handleChange("className", Array.from(keys)[0] as string)}
						variant="bordered"
						labelPlacement="outside"
						size="lg"
					>
						{classes.map((item) => (
							<SelectItem key={item}>{item}</SelectItem>
						))}
					</Select>

					<Input
						label="Start Date"
						type="date"
						value={formData.startDate}
						onChange={(e) => handleChange("startDate", e.target.value)}
						variant="bordered"
						labelPlacement="outside"
						size="lg"
					/>

					<Input
						label="End Date"
						type="date"
						value={formData.endDate}
						onChange={(e) => handleChange("endDate", e.target.value)}
						variant="bordered"
						labelPlacement="outside"
						size="lg"
					/>

					<Select
						label="Export Format"
						selectedKeys={[formData.format]}
						onSelectionChange={(keys) => handleChange("format", Array.from(keys)[0] as string)}
						variant="bordered"
						labelPlacement="outside"
						size="lg"
					>
						{reportFormats.map((item) => (
							<SelectItem key={item}>{item}</SelectItem>
						))}
					</Select>

					<Input
						label="Recipients"
						placeholder="emails separated by commas"
						value={formData.recipients}
						onChange={(e) => handleChange("recipients", e.target.value)}
						variant="bordered"
						labelPlacement="outside"
						size="lg"
					/>

					<Textarea
						className="md:col-span-2"
						label="Note"
						placeholder="Add notes or special instructions for this report"
						value={formData.note}
						onChange={(e) => handleChange("note", e.target.value)}
						variant="bordered"
						labelPlacement="outside"
						minRows={4}
					/>
				</CardBody>

				<CardFooter className="flex flex-col gap-3 px-6 pb-6 md:flex-row">
					<Button className="w-full border-emerald-600 text-emerald-700" variant="bordered" radius="full" size="lg" onPress={handleReset}>
						Reset Form
					</Button>
					<Button className="w-full bg-emerald-600 text-white" radius="full" size="lg" onPress={handleGenerate}>
						Generate Report
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
}
