"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { addToast } from "@heroui/toast";

const relationOptions = ["Father", "Mother", "Guardian", "Uncle", "Aunt", "Other"];
const statusOptions = ["Active", "Inactive"];
const disabilityOptions = [
	"None",
	"Visual Impairment",
	"Hearing Impairment",
	"Speech Impairment",
	"Physical Disability",
	"Learning Disability",
	"Intellectual Disability",
	"Autism Spectrum Disorder",
	"Chronic Health Condition",
	"Other",
];
const reportTypeOptions = ["Academic Report", "Attendance Report", "Behavior Report", "Fee Report", "General Update"];

export default function ParentDetailPage() {
	const router = useRouter();
	const params = useParams();
	const parentId = params?.id as string;

	const [loading, setLoading] = useState(true);
	const [editMode, setEditMode] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [showReport, setShowReport] = useState(false);

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
		disabilities: "None",
		studentName: "",
		address: {
			state: "",
			lga: "",
			street: "",
			postalCode: "",
		},
		note: "",
	});

	const [reportForm, setReportForm] = useState({
		reportType: "General Update",
		subject: "",
		message: "",
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setFormData({
				firstName: "Bello",
				lastName: "Aminu",
				middleName: "J.",
				relation: "Father",
				phone: "+234 801 111 2233",
				alternatePhone: "+234 803 555 8899",
				email: "bello.aminu@email.com",
				occupation: "Civil Servant",
				workplace: "Ministry of Education",
				status: "Active",
				disabilities: "None",
				studentName: "Aisha Bello",
				address: {
					state: "Kaduna",
					lga: "Kaduna North",
					street: "12 Unity Avenue",
					postalCode: "800001",
				},
				note: "Primary contact for school communications.",
			});
			setReportForm({
				reportType: "General Update",
				subject: "Parent Communication Update",
				message: "This is a sample report message to the parent regarding student progress and school communication.",
			});
			setLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, [parentId]);

	const handleChange = (key: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	const handleAddressChange = (key: keyof typeof formData.address, value: string) => {
		setFormData((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
	};

	const handleUpdate = () => {
		addToast({
			title: "Updated",
			description: "Parent information updated successfully.",
			color: "success",
			closeIcon: true,
		});
		setEditMode(false);
	};

	const handleDelete = () => {
		addToast({
			title: "Deleted",
			description: "Parent record deleted successfully.",
			color: "success",
			closeIcon: true,
		});
		setShowDelete(false);
		router.back();
	};

	const handleSendReport = () => {
		if (!reportForm.subject || !reportForm.message) {
			addToast({
				title: "Missing fields",
				description: "Subject and message are required.",
				color: "warning",
				closeIcon: true,
			});
			return;
		}

		addToast({
			title: "Report sent",
			description: `Report sent to ${formData.firstName} ${formData.lastName}.`,
			color: "success",
			closeIcon: true,
		});
		setShowReport(false);
	};

	if (loading) {
		return (
			<section className="flex min-h-[60vh] items-center justify-center py-8">
				<div className="text-lg text-emerald-600">Loading parent data...</div>
			</section>
		);
	}

	return (
		<section className="space-y-5 py-4">
			<Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
				<CardHeader className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6">
					<div>
						<p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Community</p>
						<h2 className="text-2xl font-semibold">Parent Profile</h2>
						<p className="mt-1 text-sm text-foreground/70">View, edit, manage, and send reports to a parent.</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button className="border-emerald-600 text-emerald-700" variant="bordered" radius="full" onPress={() => setShowReport(true)}>
							Send Report
						</Button>
						{!editMode ? (
							<Button className="bg-emerald-600 text-white" radius="full" onPress={() => setEditMode(true)}>
								Edit Parent
							</Button>
						) : (
							<Button className="bg-emerald-600 text-white" radius="full" onPress={handleUpdate}>
								Save Changes
							</Button>
						)}
						<Button color="danger" radius="full" variant="flat" onPress={() => setShowDelete(true)}>
							Delete
						</Button>
					</div>
				</CardHeader>

				<CardBody className="px-6 pb-2 space-y-6">
					<Card className="border border-emerald-100/70 bg-white/95 dark:border-emerald-300/20">
						<CardBody className="grid gap-3 px-6 py-6 md:grid-cols-3">
							<div>
								<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Parent Name</p>
								<p className="mt-1 text-lg font-semibold">{formData.firstName} {formData.middleName} {formData.lastName}</p>
							</div>
							<div>
								<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Relation</p>
								<Chip className="mt-1 border-0" color="success" variant="flat">{formData.relation}</Chip>
							</div>
							<div>
								<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Status</p>
								<Chip className="mt-1 border-0" color={formData.status === "Active" ? "success" : "warning"} variant="flat">
									{formData.status}
								</Chip>
							</div>
						</CardBody>
					</Card>

					<form className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<Input label="First Name" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="Last Name" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="Middle Name" value={formData.middleName} onChange={(e) => handleChange("middleName", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Select label="Relationship" selectedKeys={[formData.relation]} onSelectionChange={(keys) => handleChange("relation", Array.from(keys)[0] as string)} isDisabled={!editMode} size="lg" variant="bordered" labelPlacement="outside">
							{relationOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
						</Select>
						<Input label="Phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="Alternate Phone" value={formData.alternatePhone} onChange={(e) => handleChange("alternatePhone", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="Email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Select label="Status" selectedKeys={[formData.status]} onSelectionChange={(keys) => handleChange("status", Array.from(keys)[0] as string)} isDisabled={!editMode} size="lg" variant="bordered" labelPlacement="outside">
							{statusOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
						</Select>
						<Input label="Occupation" value={formData.occupation} onChange={(e) => handleChange("occupation", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="Workplace" value={formData.workplace} onChange={(e) => handleChange("workplace", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Select label="Disabilities" selectedKeys={[formData.disabilities]} onSelectionChange={(keys) => handleChange("disabilities", Array.from(keys)[0] as string)} isDisabled={!editMode} size="lg" variant="bordered" labelPlacement="outside">
							{disabilityOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
						</Select>
						<Input label="Student Name" value={formData.studentName} onChange={(e) => handleChange("studentName", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="State" value={formData.address.state} onChange={(e) => handleAddressChange("state", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="LGA" value={formData.address.lga} onChange={(e) => handleAddressChange("lga", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="Street Address" value={formData.address.street} onChange={(e) => handleAddressChange("street", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Input label="Postal Code" value={formData.address.postalCode} onChange={(e) => handleAddressChange("postalCode", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
						<Textarea className="md:col-span-2" label="Note" value={formData.note} onChange={(e) => handleChange("note", e.target.value)} readOnly={!editMode} minRows={4} variant="bordered" labelPlacement="outside" />
					</form>
				</CardBody>

				<CardFooter className="flex flex-col gap-3 px-6 pb-6 md:flex-row">
					{editMode && (
						<>
							<Button className="w-full bg-emerald-600 text-white" radius="full" onPress={handleUpdate}>Save Changes</Button>
							<Button className="w-full border-emerald-600 text-emerald-700" variant="bordered" radius="full" onPress={() => setEditMode(false)}>Cancel Edit</Button>
						</>
					)}
				</CardFooter>
			</Card>

			<Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
				<CardHeader className="px-6 pt-6 pb-2">
					<h3 className="text-xl font-semibold">Communication Summary</h3>
				</CardHeader>
				<CardBody className="grid gap-3 px-6 pb-6 md:grid-cols-3">
					<div className="rounded-2xl border border-emerald-100/70 p-4 dark:border-emerald-300/20">
						<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Linked Student</p>
						<p className="mt-1 text-base font-medium">{formData.studentName || "N/A"}</p>
					</div>
					<div className="rounded-2xl border border-emerald-100/70 p-4 dark:border-emerald-300/20">
						<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Disabilities</p>
						<p className="mt-1 text-base font-medium">{formData.disabilities}</p>
					</div>
					<div className="rounded-2xl border border-emerald-100/70 p-4 dark:border-emerald-300/20">
						<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Primary Contact</p>
						<p className="mt-1 text-base font-medium">{formData.phone}</p>
					</div>
					<div className="rounded-2xl border border-emerald-100/70 p-4 dark:border-emerald-300/20">
						<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Communication Status</p>
						<p className="mt-1 text-base font-medium">{formData.status}</p>
					</div>
				</CardBody>
			</Card>

			<Modal isOpen={showDelete} onClose={() => setShowDelete(false)} size="2xl">
				<ModalContent>
					<ModalHeader>Delete Parent Record</ModalHeader>
					<ModalBody>
						<p>This action will permanently remove this parent record. This cannot be undone.</p>
					</ModalBody>
					<ModalFooter>
						<Button variant="bordered" radius="full" onPress={() => setShowDelete(false)}>Cancel</Button>
						<Button color="danger" radius="full" onPress={handleDelete}>Yes, Delete</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal isOpen={showReport} onClose={() => setShowReport(false)} size="2xl">
				<ModalContent>
					<ModalHeader>Send Report to Parent</ModalHeader>
					<ModalBody>
						<div className="space-y-4">
							<Select label="Report Type" selectedKeys={[reportForm.reportType]} onSelectionChange={(keys) => setReportForm((prev) => ({ ...prev, reportType: Array.from(keys)[0] as string }))} size="lg" variant="bordered" labelPlacement="outside">
								{reportTypeOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
							</Select>
							<Input label="Subject" value={reportForm.subject} onChange={(e) => setReportForm((prev) => ({ ...prev, subject: e.target.value }))} size="lg" variant="bordered" labelPlacement="outside" />
							<Textarea label="Message" value={reportForm.message} onChange={(e) => setReportForm((prev) => ({ ...prev, message: e.target.value }))} minRows={6} variant="bordered" labelPlacement="outside" />
						</div>
					</ModalBody>
					<ModalFooter>
						<Button variant="bordered" radius="full" onPress={() => setShowReport(false)}>Cancel</Button>
						<Button className="bg-emerald-600 text-white" radius="full" onPress={handleSendReport}>Send Report</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</section>
	);
}
