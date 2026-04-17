"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Input, Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import Link from "next/link";


const roomStatusOptions = ["Available", "Occupied", "Maintenance"];
const bedStatusOptions = ["Vacant", "Occupied"];
const blockOptions = ["Block A", "Block B", "Block C", "Block D"];

export default function HostelPage() {
	const [showAddRoom, setShowAddRoom] = useState(false);
	const [showAssignStudent, setShowAssignStudent] = useState(false);

	const [roomForm, setRoomForm] = useState({
		roomNumber: "",
		block: "Block A",
		capacity: "",
		occupied: "",
		warden: "",
		status: "Available",
	});

	const [assignForm, setAssignForm] = useState({
		studentName: "",
		admissionNumber: "",
		roomNumber: "",
		bedSpace: "",
		duration: "",
		note: "",
	});

	const [rooms, setRooms] = useState([
		{ roomNumber: "A-101", block: "Block A", capacity: 4, occupied: 3, warden: "Mr. Danjuma", status: "Occupied" },
		{ roomNumber: "B-204", block: "Block B", capacity: 6, occupied: 6, warden: "Mrs. Amina", status: "Occupied" },
		{ roomNumber: "C-110", block: "Block C", capacity: 4, occupied: 1, warden: "Mr. Ibrahim", status: "Available" },
		{ roomNumber: "D-008", block: "Block D", capacity: 8, occupied: 8, warden: "Mrs. Grace", status: "Maintenance" },
	]);

	const [residents, setResidents] = useState([
		{ studentName: "Aisha Bello", admissionNumber: "STU-001", roomNumber: "A-101", bedSpace: "Upper Bunk", duration: "1 Term", status: "Active" },
		{ studentName: "David Okafor", admissionNumber: "STU-014", roomNumber: "A-101", bedSpace: "Lower Bunk", duration: "1 Term", status: "Active" },
		{ studentName: "Chinedu Nnaji", admissionNumber: "STU-022", roomNumber: "B-204", bedSpace: "Bed 3", duration: "Full Session", status: "Active" },
	]);

	const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
	const totalOccupied = rooms.reduce((sum, room) => sum + room.occupied, 0);
	const totalVacant = totalCapacity - totalOccupied;
	const occupancyRate = totalCapacity ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

	const handleRoomChange = (key: keyof typeof roomForm, value: string) => {
		setRoomForm((prev) => ({ ...prev, [key]: value }));
	};

	const handleAssignChange = (key: keyof typeof assignForm, value: string) => {
		setAssignForm((prev) => ({ ...prev, [key]: value }));
	};

	const handleAddRoom = () => {
		if (!roomForm.roomNumber || !roomForm.capacity || !roomForm.occupied) {
			addToast({
				title: "Missing fields",
				description: "Room number, capacity, and occupied beds are required.",
				color: "warning",
				closeIcon: true,
			});
			return;
		}

		setRooms((prev) => [
			{
				roomNumber: roomForm.roomNumber,
				block: roomForm.block,
				capacity: Number(roomForm.capacity),
				occupied: Number(roomForm.occupied),
				warden: roomForm.warden || "-",
				status: roomForm.status,
			},
			...prev,
		]);

		addToast({
			title: "Room added",
			description: `${roomForm.roomNumber} has been added successfully.`,
			color: "success",
			closeIcon: true,
		});

		setRoomForm({ roomNumber: "", block: "Block A", capacity: "", occupied: "", warden: "", status: "Available" });
		setShowAddRoom(false);
	};

	const handleAssignStudent = () => {
		if (!assignForm.studentName || !assignForm.admissionNumber || !assignForm.roomNumber) {
			addToast({
				title: "Missing fields",
				description: "Student name, admission number, and room number are required.",
				color: "warning",
				closeIcon: true,
			});
			return;
		}

		setResidents((prev) => [
			{
				studentName: assignForm.studentName,
				admissionNumber: assignForm.admissionNumber,
				roomNumber: assignForm.roomNumber,
				bedSpace: assignForm.bedSpace || "-",
				duration: assignForm.duration || "-",
				status: "Active",
			},
			...prev,
		]);

		addToast({
			title: "Student assigned",
			description: `${assignForm.studentName} has been assigned a hostel room.`,
			color: "success",
			closeIcon: true,
		});

		setAssignForm({ studentName: "", admissionNumber: "", roomNumber: "", bedSpace: "", duration: "", note: "" });
		setShowAssignStudent(false);
	};

	return (
		<section className="space-y-5 py-4">
			<Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
				<CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
					<div>
						<p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Residential Life</p>
						<h2 className="text-2xl font-semibold">Hostel Management</h2>
						<p className="mt-1 text-sm text-foreground/70">Track rooms, occupancy, and student lodging in one place.</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button as={Link} href="/school/hostel/assign" className="border-emerald-600 text-emerald-700" variant="bordered" radius="full">
							Assign Student
						</Button>
						<Button as={Link} href="/school/hostel/add" className="bg-emerald-600 text-white" radius="full">
							Add Room
						</Button>
					</div>
				</CardHeader>

				<CardBody className="grid gap-4 px-6 pb-6">
					<div className="grid gap-4 md:grid-cols-4">
						<div className="rounded-2xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
							<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Total Rooms</p>
							<p className="mt-2 text-3xl font-semibold text-emerald-700">{rooms.length}</p>
						</div>
						<div className="rounded-2xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
							<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Occupied Beds</p>
							<p className="mt-2 text-3xl font-semibold text-emerald-700">{totalOccupied}</p>
						</div>
						<div className="rounded-2xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
							<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Vacant Beds</p>
							<p className="mt-2 text-3xl font-semibold text-emerald-700">{totalVacant}</p>
						</div>
						<div className="rounded-2xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
							<p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Occupancy Rate</p>
							<p className="mt-2 text-3xl font-semibold text-emerald-700">{occupancyRate}%</p>
						</div>
					</div>

					<Card className="border border-emerald-100/70 bg-white/95 dark:border-emerald-300/20">
						<CardHeader className="px-6 pt-6 pb-2">
							<h3 className="text-xl font-semibold">Room Allocation</h3>
						</CardHeader>
						<CardBody className="overflow-x-auto px-0 pb-6">
							<table className="w-full min-w-[900px] text-left text-sm">
								<thead>
									<tr className="border-y border-default-200/70 bg-default-100/40 text-foreground/60">
										<th className="px-6 py-3 font-medium">Room</th>
										<th className="px-4 py-3 font-medium">Block</th>
										<th className="px-4 py-3 font-medium">Capacity</th>
										<th className="px-4 py-3 font-medium">Occupied</th>
										<th className="px-4 py-3 font-medium">Warden</th>
										<th className="px-4 py-3 font-medium">Status</th>
									</tr>
								</thead>
								<tbody>
									{rooms.map((room) => (
										<tr key={room.roomNumber} className="border-b border-default-100">
											<td className="px-6 py-4 font-medium">{room.roomNumber}</td>
											<td className="px-4 py-4 text-foreground/75">{room.block}</td>
											<td className="px-4 py-4 text-foreground/75">{room.capacity}</td>
											<td className="px-4 py-4 text-foreground/75">{room.occupied}</td>
											<td className="px-4 py-4 text-foreground/75">{room.warden}</td>
											<td className="px-4 py-4">
												<Chip
													className="border-0"
													color={room.status === "Available" ? "success" : room.status === "Maintenance" ? "warning" : "primary"}
													size="sm"
													variant="flat"
												>
													{room.status}
												</Chip>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</CardBody>
					</Card>

					<Card className="border border-emerald-100/70 bg-white/95 dark:border-emerald-300/20">
						<CardHeader className="px-6 pt-6 pb-2">
							<h3 className="text-xl font-semibold">Resident List</h3>
						</CardHeader>
						<CardBody className="overflow-x-auto px-0 pb-6">
							<table className="w-full min-w-[900px] text-left text-sm">
								<thead>
									<tr className="border-y border-default-200/70 bg-default-100/40 text-foreground/60">
										<th className="px-6 py-3 font-medium">Student</th>
										<th className="px-4 py-3 font-medium">Admission No.</th>
										<th className="px-4 py-3 font-medium">Room</th>
										<th className="px-4 py-3 font-medium">Bed Space</th>
										<th className="px-4 py-3 font-medium">Duration</th>
										<th className="px-4 py-3 font-medium">Status</th>
									</tr>
								</thead>
								<tbody>
									{residents.map((resident) => (
										<tr key={`${resident.admissionNumber}-${resident.studentName}`} className="border-b border-default-100">
											<td className="px-6 py-4 font-medium">{resident.studentName}</td>
											<td className="px-4 py-4 text-foreground/75">{resident.admissionNumber}</td>
											<td className="px-4 py-4 text-foreground/75">{resident.roomNumber}</td>
											<td className="px-4 py-4 text-foreground/75">{resident.bedSpace}</td>
											<td className="px-4 py-4 text-foreground/75">{resident.duration}</td>
											<td className="px-4 py-4">
												<Chip className="border-0" color="success" size="sm" variant="flat">
													{resident.status}
												</Chip>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</CardBody>
					</Card>
				</CardBody>
			</Card>

			<Modal isOpen={showAddRoom} onClose={() => setShowAddRoom(false)} size="2xl">
				<ModalContent>
					<ModalHeader>Add Room</ModalHeader>
					<ModalBody>
						<div className="grid gap-4 md:grid-cols-2">
							<Input label="Room Number" value={roomForm.roomNumber} onChange={(e) => handleRoomChange("roomNumber", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
							<Select label="Block" selectedKeys={[roomForm.block]} onSelectionChange={(keys) => handleRoomChange("block", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
								{blockOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
							</Select>
							<Input label="Capacity" type="number" value={roomForm.capacity} onChange={(e) => handleRoomChange("capacity", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
							<Input label="Occupied Beds" type="number" value={roomForm.occupied} onChange={(e) => handleRoomChange("occupied", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
							<Input className="md:col-span-2" label="Warden" value={roomForm.warden} onChange={(e) => handleRoomChange("warden", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
							<Select label="Status" selectedKeys={[roomForm.status]} onSelectionChange={(keys) => handleRoomChange("status", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
								{roomStatusOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
							</Select>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button variant="bordered" radius="full" onPress={() => setShowAddRoom(false)}>Cancel</Button>
						<Button className="bg-emerald-600 text-white" radius="full" onPress={handleAddRoom}>Add Room</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal isOpen={showAssignStudent} onClose={() => setShowAssignStudent(false)} size="2xl">
				<ModalContent>
					<ModalHeader>Assign Student to Hostel</ModalHeader>
					<ModalBody>
						<div className="grid gap-4 md:grid-cols-2">
							<Input label="Student Name" value={assignForm.studentName} onChange={(e) => handleAssignChange("studentName", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
							<Input label="Admission Number" value={assignForm.admissionNumber} onChange={(e) => handleAssignChange("admissionNumber", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
							<Input label="Room Number" value={assignForm.roomNumber} onChange={(e) => handleAssignChange("roomNumber", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
							<Select label="Bed Space" selectedKeys={[assignForm.bedSpace]} onSelectionChange={(keys) => handleAssignChange("bedSpace", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
								{bedStatusOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
							</Select>
							<Input label="Duration" placeholder="e.g. 1 Term" value={assignForm.duration} onChange={(e) => handleAssignChange("duration", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
							<Textarea label="Note" value={assignForm.note} onChange={(e) => handleAssignChange("note", e.target.value)} minRows={4} variant="bordered" labelPlacement="outside" />
						</div>
					</ModalBody>
					<ModalFooter>
						<Button variant="bordered" radius="full" onPress={() => setShowAssignStudent(false)}>Cancel</Button>
						<Button className="bg-emerald-600 text-white" radius="full" onPress={handleAssignStudent}>Assign Student</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</section>
	);
}
