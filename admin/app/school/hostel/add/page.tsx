"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

const blockOptions = ["Block A", "Block B", "Block C", "Block D"];
const hostelTypeOptions = ["Boys", "Girls", "Mixed"];
const statusOptions = ["Available", "Occupied", "Maintenance"];

export default function AddHostelPage() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		hostelName: "",
		hostelCode: "",
		block: "Block A",
		hostelType: "Boys",
		roomNumber: "",
		capacity: "",
		occupied: "",
		warden: "",
		contact: "",
		status: "Available",
		note: "",
	});

	const handleChange = (key: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = () => {
		if (!formData.hostelName || !formData.roomNumber || !formData.capacity) {
			addToast({
				title: "Missing fields",
				description: "Hostel name, room number, and capacity are required.",
				color: "warning",
				closeIcon: true,
			});
			return;
		}

		addToast({
			title: "Success",
			description: "Hostel added successfully.",
			color: "success",
			closeIcon: true,
		});
	};

	const handleClear = () => {
		setFormData({
			hostelName: "",
			hostelCode: "",
			block: "Block A",
			hostelType: "Boys",
			roomNumber: "",
			capacity: "",
			occupied: "",
			warden: "",
			contact: "",
			status: "Available",
			note: "",
		});

		addToast({
			title: "Clear Form",
			description: "Hostel form cleared successfully.",
			color: "success",
			closeIcon: true,
		});
	};

	const handleCancel = () => {
		router.back();
		addToast({
			title: "Cancelled",
			description: "Hostel creation cancelled.",
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
						<h2 className="text-xl font-semibold">Add Hostel</h2>
					</div>
				</CardHeader>

				<CardBody className="px-6 pb-2">
					<form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
						<Input
							label="Hostel Name"
							value={formData.hostelName}
							onChange={(e) => handleChange("hostelName", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Hostel Code"
							value={formData.hostelCode}
							onChange={(e) => handleChange("hostelCode", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Select
							label="Block"
							selectedKeys={[formData.block]}
							onSelectionChange={(keys) => handleChange("block", Array.from(keys)[0] as string)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						>
							{blockOptions.map((item) => (
								<SelectItem key={item}>{item}</SelectItem>
							))}
						</Select>
						<Select
							label="Hostel Type"
							selectedKeys={[formData.hostelType]}
							onSelectionChange={(keys) => handleChange("hostelType", Array.from(keys)[0] as string)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						>
							{hostelTypeOptions.map((item) => (
								<SelectItem key={item}>{item}</SelectItem>
							))}
						</Select>
						<Input
							label="Room Number"
							value={formData.roomNumber}
							onChange={(e) => handleChange("roomNumber", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Capacity"
							type="number"
							value={formData.capacity}
							onChange={(e) => handleChange("capacity", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Occupied Beds"
							type="number"
							value={formData.occupied}
							onChange={(e) => handleChange("occupied", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Select
							label="Status"
							selectedKeys={[formData.status]}
							onSelectionChange={(keys) => handleChange("status", Array.from(keys)[0] as string)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						>
							{statusOptions.map((item) => (
								<SelectItem key={item}>{item}</SelectItem>
							))}
						</Select>
						<Input
							label="Warden"
							value={formData.warden}
							onChange={(e) => handleChange("warden", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Warden Contact"
							value={formData.contact}
							onChange={(e) => handleChange("contact", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Textarea
							className="md:col-span-2"
							label="Note"
							placeholder="Additional hostel notes"
							value={formData.note}
							onChange={(e) => handleChange("note", e.target.value)}
							minRows={4}
							variant="bordered"
							labelPlacement="outside"
						/>
					</form>
				</CardBody>

				<CardFooter className="flex flex-col gap-3 px-6 pb-6 md:flex-row">
					<Button className="w-full border-emerald-600 text-emerald-700" variant="bordered" radius="full" size="lg" onPress={handleClear}>
						Clear
					</Button>
					<Button className="w-full bg-emerald-600 text-white" radius="full" size="lg" onPress={handleSubmit}>
						Add Hostel
					</Button>
					<Button className="w-full border-emerald-600 text-emerald-700" variant="bordered" radius="full" size="lg" onPress={handleCancel}>
						Cancel
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
}
