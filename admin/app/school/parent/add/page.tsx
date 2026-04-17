"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

const relationOptions = ["Father", "Mother", "Guardian", "Uncle", "Aunt", "Other"];
const statusOptions = ["Active", "Inactive"];

export default function AddParentPage() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		middleName: "",
		relation: "Father",
		phone: "",
		alternatePhone: "",
		email: "",
		occupation: "",
		workplace: "",
		status: "Active",
		studentAdmissionNumber: "",
		studentName: "",
		address: {
			state: "",
			lga: "",
			street: "",
			postalCode: "",
		},
		note: "",
	});

	const [nigeriaStates, setNigeriaStates] = useState<{ state: string; lgas: string[] }[]>([]);

	useEffect(() => {
		fetch("/Json/nigeria-state-and-lgas.json")
			.then((res) => res.json())
			.then((data) => setNigeriaStates(data));
	}, []);

	const stateOptions: string[] = useMemo(() => nigeriaStates.map((s) => s.state), [nigeriaStates]);

	const lgaOptions: string[] = useMemo(() => {
		const found = nigeriaStates.find((s) => s.state === formData.address.state);
		return found ? found.lgas : [];
	}, [formData.address.state, nigeriaStates]);

	const handleChange = (key: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	const handleAddressChange = (key: keyof typeof formData.address, value: string) => {
		setFormData((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
	};

	const handleSubmit = () => {
		if (!formData.firstName || !formData.lastName || !formData.phone) {
			addToast({
				title: "Missing fields",
				description: "First name, last name, and phone are required.",
				color: "warning",
				closeIcon: true,
			});
			return;
		}

		addToast({
			title: "Success",
			description: "Parent added successfully.",
			color: "success",
			closeIcon: true,
		});
	};

	const handleClear = () => {
		setFormData({
			firstName: "",
			lastName: "",
			middleName: "",
			relation: "Father",
			phone: "",
			alternatePhone: "",
			email: "",
			occupation: "",
			workplace: "",
			status: "Active",
			studentAdmissionNumber: "",
			studentName: "",
			address: {
				state: "",
				lga: "",
				street: "",
				postalCode: "",
			},
			note: "",
		});

		addToast({
			title: "Clear Form",
			description: "Form cleared successfully.",
			color: "success",
			closeIcon: true,
		});
	};

	const handleCancel = () => {
		router.back();
		addToast({
			title: "Cancelled",
			description: "Parent addition cancelled.",
			color: "warning",
			closeIcon: true,
		});
	};

	return (
		<section className="flex min-h-[60vh] items-center justify-center py-8">
			<Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
				<CardHeader className="px-6 pt-6 pb-2">
					<h2 className="text-xl font-semibold">Add Parent</h2>
				</CardHeader>
				<CardBody className="px-6 pb-2">
					<form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
						<Input
							label="First Name"
							value={formData.firstName}
							onChange={(e) => handleChange("firstName", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Last Name"
							value={formData.lastName}
							onChange={(e) => handleChange("lastName", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Middle Name"
							value={formData.middleName}
							onChange={(e) => handleChange("middleName", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Select
							label="Relationship"
							selectedKeys={[formData.relation]}
							onSelectionChange={(keys) => handleChange("relation", Array.from(keys)[0] as string)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						>
							{relationOptions.map((opt) => (
								<SelectItem key={opt}>{opt}</SelectItem>
							))}
						</Select>
						<Input
							label="Phone"
							type="tel"
							value={formData.phone}
							onChange={(e) => handleChange("phone", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Alternate Phone"
							type="tel"
							value={formData.alternatePhone}
							onChange={(e) => handleChange("alternatePhone", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Email"
							type="email"
							value={formData.email}
							onChange={(e) => handleChange("email", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Occupation"
							value={formData.occupation}
							onChange={(e) => handleChange("occupation", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Workplace"
							value={formData.workplace}
							onChange={(e) => handleChange("workplace", e.target.value)}
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
							{statusOptions.map((opt) => (
								<SelectItem key={opt}>{opt}</SelectItem>
							))}
						</Select>
						<Input
							label="Student Admission Number"
							value={formData.studentAdmissionNumber}
							onChange={(e) => handleChange("studentAdmissionNumber", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Student Name"
							value={formData.studentName}
							onChange={(e) => handleChange("studentName", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Select
							label="State"
							selectedKeys={[formData.address.state]}
							onSelectionChange={(keys) => handleAddressChange("state", Array.from(keys)[0] as string)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						>
							{stateOptions.map((opt) => (
								<SelectItem key={opt}>{opt}</SelectItem>
							))}
						</Select>
						<Select
							label="LGA"
							selectedKeys={[formData.address.lga]}
							onSelectionChange={(keys) => handleAddressChange("lga", Array.from(keys)[0] as string)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
							isDisabled={!formData.address.state}
						>
							{lgaOptions.map((opt) => (
								<SelectItem key={opt}>{opt}</SelectItem>
							))}
						</Select>
						<Input
							label="Street Address"
							value={formData.address.street}
							onChange={(e) => handleAddressChange("street", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Input
							label="Postal Code"
							value={formData.address.postalCode}
							onChange={(e) => handleAddressChange("postalCode", e.target.value)}
							size="lg"
							variant="bordered"
							labelPlacement="outside"
						/>
						<Textarea
							className="md:col-span-2"
							label="Note"
							placeholder="Any additional information"
							value={formData.note}
							onChange={(e) => handleChange("note", e.target.value)}
							minRows={4}
							variant="bordered"
							labelPlacement="outside"
						/>
					</form>
				</CardBody>
				<CardFooter className="flex flex-col gap-4 px-6 pb-6 md:flex-row">
					<Button className="w-full border-emerald-600 text-emerald-600" variant="bordered" size="lg" radius="full" onPress={handleClear}>
						Clear
					</Button>
					<Button className="w-full bg-emerald-600 text-white" size="lg" radius="full" onPress={handleSubmit}>
						Add Parent
					</Button>
					<Button className="w-full border-emerald-600 text-emerald-600" variant="bordered" size="lg" radius="full" onPress={handleCancel}>
						Cancel
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
}
