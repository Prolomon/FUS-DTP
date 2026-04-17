"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

const roomOptions = ["A-101", "A-102", "B-201", "B-202", "C-110", "D-008"];
const bedOptions = ["Upper Bunk", "Lower Bunk", "Bed 1", "Bed 2", "Bed 3", "Bed 4"];
const durationOptions = ["1 Term", "2 Terms", "Full Session", "Custom"];
const assignmentStatusOptions = ["Active", "Pending", "Transferred"];

export default function AssignHostelPage() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		studentName: "",
		admissionNumber: "",
		className: "",
		roomNumber: "",
		bedSpace: "Upper Bunk",
		duration: "1 Term",
		assignmentStatus: "Active",
		guardianPhone: "",
		dateAssigned: "",
		note: "",
	});

	const handleChange = (key: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = () => {
		if (!formData.studentName || !formData.admissionNumber || !formData.roomNumber) {
			addToast({
				title: "Missing fields",
				description: "Student name, admission number, and room number are required.",
				color: "warning",
				closeIcon: true,
			});
			return;
		}

		addToast({
			title: "Success",
			description: "Room assigned to student successfully.",
			color: "success",
			closeIcon: true,
		});
	};

	const handleClear = () => {
		setFormData({
			studentName: "",
			admissionNumber: "",
			className: "",
			roomNumber: "",
			bedSpace: "Upper Bunk",
			duration: "1 Term",
			assignmentStatus: "Active",
			guardianPhone: "",
			dateAssigned: "",
			note: "",
		});

		addToast({
			title: "Clear Form",
			description: "Assignment form cleared successfully.",
			color: "success",
			closeIcon: true,
		});
	};

	const handleCancel = () => {
		router.back();
		addToast({
			title: "Cancelled",
			description: "Room assignment cancelled.",
			color: "warning",
			closeIcon: true,
		});
	};

	return (
		<section className="flex min-h-[60vh] items-center justify-center py-8">
			<Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
				<CardHeader className="px-6 pt-6 pb-2">
					<div>
						<p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Residential Life</p>
						<h2 className="text-xl font-semibold">Assign Room to Student</h2>
					</div>
				</CardHeader>

				<CardBody className="px-6 pb-2">
					<form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
						<Input label="Student Name" value={formData.studentName} onChange={(e) => handleChange("studentName", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="Admission Number" value={formData.admissionNumber} onChange={(e) => handleChange("admissionNumber", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="Class" value={formData.className} onChange={(e) => handleChange("className", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="Guardian Phone" type="tel" value={formData.guardianPhone} onChange={(e) => handleChange("guardianPhone", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
						<Select label="Room Number" selectedKeys={[formData.roomNumber]} onSelectionChange={(keys) => handleChange("roomNumber", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
							{roomOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
						</Select>
						<Select label="Bed Space" selectedKeys={[formData.bedSpace]} onSelectionChange={(keys) => handleChange("bedSpace", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
							{bedOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
						</Select>
						<Select label="Duration" selectedKeys={[formData.duration]} onSelectionChange={(keys) => handleChange("duration", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
							{durationOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
						</Select>
						<Select label="Status" selectedKeys={[formData.assignmentStatus]} onSelectionChange={(keys) => handleChange("assignmentStatus", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
							{assignmentStatusOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
						</Select>
						<Input label="Date Assigned" type="date" value={formData.dateAssigned} onChange={(e) => handleChange("dateAssigned", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
						<Textarea className="md:col-span-2" label="Note" placeholder="Additional assignment notes" value={formData.note} onChange={(e) => handleChange("note", e.target.value)} minRows={4} variant="bordered" labelPlacement="outside" />
					</form>
				</CardBody>

				<CardFooter className="flex flex-col gap-3 px-6 pb-6 md:flex-row">
					<Button className="w-full border-emerald-600 text-emerald-700" variant="bordered" radius="full" size="lg" onPress={handleClear}>
						Clear
					</Button>
					<Button className="w-full bg-emerald-600 text-white" radius="full" size="lg" onPress={handleSubmit}>
						Assign Room
					</Button>
					<Button className="w-full border-emerald-600 text-emerald-700" variant="bordered" radius="full" size="lg" onPress={handleCancel}>
						Cancel
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
}
