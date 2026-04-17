"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalContent } from "@heroui/modal";
import { Textarea, Input } from "@heroui/input";

import { useRouter, useParams } from "next/navigation";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import { MoreVertical, File, UploadCloud } from "lucide-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";


const titleOptions = ["Mr", "Mrs", "Miss", "Master"];
const subjectOptions = [
    "Mathematics", "English", "Biology", "Chemistry", "Physics", "Economics", "Geography", "History", "Civic Education", "Physical Education", "Computer Science", "Agricultural Science", "French", "Literature"
];
const relationshipOptions = ["Single", "Married", "Divorced"];
const subjectGroupOptions = ["Science", "Arts", "Physical Education"];
const genderOptions = ["Male", "Female", "Other"];
const staffGroupOptions = ["Driver", "Security", "Teacher"];
const allergyOptions = ["None", "Peanuts", "Seafood", "Milk", "Eggs", "Dust", "Pollen", "Drug Allergy", "Other"];

export default function StaffDetailPage() {
    const router = useRouter();
    const params = useParams();
    const staffId = params?.id as string;
    const [nigeriaStates, setNigeriaStates] = useState<{ state: string; lgas: string[] }[]>([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        title: "Mr",
        firstName: "",
        lastName: "",
        middleName: "",
        gender: "Male",
        dateOfBirth: "",
        relationship: "Single",
        email: "",
        phone: "",
        subjectGroup: "Science",
        subjects: [] as string[],
        staffGroup: "Teacher",
        staffId: staffId || "",
        address: {
            state: "",
            lga: "",
            street: "",
            postalCode: "",
        },
    });
    const [uploadFormData, setUploadFormData] = useState({
        documentType: "",
        file: null as File | null,
    });
    const [medicalForm, setMedicalForm] = useState({ date: "", bloodGroup: "", genotype: "", allergy: "None", note: "" });
    const [medicalRecords, setMedicalRecords] = useState([
        { date: "2026-02-11", bloodGroup: "O+", genotype: "AA", allergy: "None", note: "No known allergies" },
    ]);
    // Modal state
    const [showDelete, setShowDelete] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showLeave, setShowLeave] = useState(false);
    const [showEditImage, setShowEditImage] = useState(false);
    const [reason, setReason] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("https://i.pravatar.cc/150?u=a04258114e29026708c");

    // Simulate fetch staff data (replace with real API call)
    useEffect(() => {
        // Simulate API call delay
        setTimeout(() => {
            // Example: Replace with real fetch by staffId
            setFormData({
                title: "Mr",
                firstName: "John",
                lastName: "Doe",
                middleName: "A.",
                gender: "Male",
                dateOfBirth: "1990-01-01",
                relationship: "Single",
                email: "john.doe@email.com",
                phone: "08012345678",
                subjectGroup: "Science",
                subjects: ["Mathematics", "Physics"],
                staffGroup: "Teacher",
                staffId: staffId || "STF001",
                address: {
                    state: "Lagos",
                    lga: "Ikeja",
                    street: "123 Example St",
                    postalCode: "100001",
                },
            });
            setLoading(false);
        }, 600);
    }, [staffId]);

    // Load Nigeria states/LGAs
    useEffect(() => {
        fetch("/Json/nigeria-state-and-lgas.json")
            .then(res => res.json())
            .then(data => setNigeriaStates(data));
    }, []);

    const handleChange = (key: keyof typeof formData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleAddressChange = (key: keyof typeof formData.address, value: any) => {
        setFormData((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    };

    const stateOptions: string[] = useMemo(() => nigeriaStates.map((s) => s.state), [nigeriaStates]);
    const lgaOptions: string[] = useMemo(() => {
        const found = nigeriaStates.find((s) => s.state === formData.address.state);
        return found ? found.lgas : [];
    }, [formData.address.state, nigeriaStates]);

    const handleUpdate = () => {
        // Simulate update
        addToast({
            title: "Updated!",
            description: "Staff data updated successfully.",
            color: "success",
            closeIcon: true,
        });
        setEditMode(false);
    };

    const handleDownload = () => {
        // Download as JSON (replace with PDF/CSV as needed)
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
        const dlAnchor = document.createElement("a");
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `staff_${formData.staffId}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
    };

    // Handlers for modals
    const handleDelete = async () => {
        try {
            addToast({
                title: "Deleted!",
                description: "Staff deleted successfully.",
                color: "success",
                closeIcon: true,
            });
            setShowDelete(false);
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to delete staff.",
                color: "danger",
                closeIcon: true,
            });
        }
    };
    const handleDeactivate = async () => {
        try {
            addToast({
                title: "Deactivated!",
                description: `Staff deactivated. Reason: ${reason}`,
                color: "warning",
                closeIcon: true,
            });
            setShowDeactivate(false);
            setReason("");
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to deactivate staff.",
                color: "danger",
                closeIcon: true,
            });
        }
    };
    const handleLeave = async () => {
        try {
            addToast({
                title: "Placed on Leave!",
                description: `Staff placed on leave. Reason: ${reason}`,
                color: "primary",
                closeIcon: true,
            });
            setShowLeave(false);
            setReason("");
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to place staff on leave.",
                color: "danger",
                closeIcon: true,
            });
        }
    };

    const handleImageUpload = async () => {
        try {
            if (imageFile) {
                const url = URL.createObjectURL(imageFile);
                setImageUrl(url);
            }
            addToast({
                title: "Image Updated!",
                description: "Staff image updated successfully.",
                color: "success",
                closeIcon: true,
            });
            setShowEditImage(false);
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to update image.",
                color: "danger",
                closeIcon: true,
            });
        }
    };

    const handleDocumentUpload = async () => {
        try {
            console.log(uploadFormData)

            addToast({
                title: "Document Uploaded!",
                description: "Staff document uploaded successfully.",
                color: "success",
                closeIcon: true,
            });
            setShowUpload(false);
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to upload document.",
                color: "danger",
                closeIcon: true,
            });
        }
    };

    const handleMedicalSubmit = () => {
        if (!medicalForm.date || !medicalForm.bloodGroup || !medicalForm.genotype) {
            addToast({
                title: "Missing fields",
                description: "Date, blood group and genotype are required.",
                color: "warning",
                closeIcon: true,
            });
            return;
        }

        setMedicalRecords((prev) => [medicalForm, ...prev]);
        setMedicalForm({ date: "", bloodGroup: "", genotype: "", allergy: "None", note: "" });
        addToast({
            title: "Saved",
            description: "Medical record saved.",
            color: "success",
            closeIcon: true,
        });
    };

    const handleMedicalCancel = () => {
        setMedicalForm({ date: "", bloodGroup: "", genotype: "", allergy: "None", note: "" });
    };

    if (loading) {
        return (
            <section className="flex min-h-[60vh] items-center justify-center py-8">
                <div className="text-lg text-emerald-600">Loading staff data...</div>
            </section>
        );
    }

    return (
        <section className="flex min-h-[60vh] items-center justify-center py-8">
            <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between px-6 pt-6 pb-2 gap-4">
                    <h2 className="text-xl font-semibold">Staff Profile</h2>
                    <div className="flex gap-2 flex-wrap">
                        <Button color="primary" variant="solid" radius="full" onPress={handleDownload} size="lg">Download</Button>
                    </div>
                </CardHeader>
                <CardBody className="px-6 pb-2 space-y-6">
                    {/* card for avatar */}
                    <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between px-6 pt-6 pb-2 gap-4">
                            <h2 className="text-xl font-semibold">Staff Image</h2>
                            <div className="flex gap-2">
                                <Button color="primary" variant="bordered" radius="full" onPress={() => setShowEditImage(true)} size="lg">Update Image</Button>
                            </div>
                        </CardHeader>
                        <CardBody className="px-6 pb-2">
                            <Avatar
                                className="w-[200px] h-[200px] text-large mx-auto"
                                src={imageUrl}
                                radius="md"
                            />
                        </CardBody>
                        <CardFooter className="px-6 pb-6 w-full justify-center flex-col">
                            <h3 className="text-wrap text-xl text-center uppercase font-bold">Samson Joe Smith</h3>
                            <div className="space-x-2">
                                <Chip className="border-0" color="primary" size="sm" variant="flat">Teacher</Chip>
                                <Chip className="border-0" color="warning" size="sm" variant="flat">On Leave</Chip>
                            </div>
                        </CardFooter>
                    </Card>
                    {/* card for staff details */}
                    <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between px-6 pt-6 pb-2 gap-4">
                            <h2 className="text-xl font-semibold">Staff Details</h2>
                            <div className="flex gap-2">
                                {!editMode && <Button color="primary" variant="bordered" radius="full" onPress={() => setEditMode(true)} size="lg">Edit</Button>}
                            </div>
                        </CardHeader>
                        <CardBody className="px-6 pb-2">
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    label="Staff Group"
                                    selectedKeys={[formData.staffGroup]}
                                    onSelectionChange={keys => handleChange("staffGroup", Array.from(keys)[0] as string)}
                                    isDisabled={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                >
                                    {staffGroupOptions.map((opt: string) => (
                                        <SelectItem key={opt}>{opt}</SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    label="Title"
                                    selectedKeys={[formData.title]}
                                    onSelectionChange={keys => handleChange("title", Array.from(keys)[0] as string)}
                                    isDisabled={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                >
                                    {titleOptions.map((opt: string) => (
                                        <SelectItem key={opt}>{opt}</SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    label="First Name"
                                    value={formData.firstName}
                                    onChange={e => handleChange("firstName", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Last Name"
                                    value={formData.lastName}
                                    onChange={e => handleChange("lastName", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Middle Name"
                                    value={formData.middleName}
                                    onChange={e => handleChange("middleName", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Select
                                    label="Gender"
                                    selectedKeys={[formData.gender]}
                                    onSelectionChange={keys => handleChange("gender", Array.from(keys)[0] as string)}
                                    isDisabled={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                >
                                    {genderOptions.map((opt: string) => (
                                        <SelectItem key={opt}>{opt}</SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    label="Date of Birth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={e => handleChange("dateOfBirth", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Select
                                    label="Relationship Status"
                                    selectedKeys={[formData.relationship]}
                                    onSelectionChange={keys => handleChange("relationship", Array.from(keys)[0] as string)}
                                    isDisabled={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                >
                                    {relationshipOptions.map((opt: string) => (
                                        <SelectItem key={opt}>{opt}</SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={e => handleChange("email", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={e => handleChange("phone", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Select
                                    label="Subject Group"
                                    selectedKeys={[formData.subjectGroup]}
                                    onSelectionChange={keys => handleChange("subjectGroup", Array.from(keys)[0] as string)}
                                    isDisabled={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                >
                                    {subjectGroupOptions.map((opt: string) => (
                                        <SelectItem key={opt}>{opt}</SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    label="Subjects"
                                    selectionMode="multiple"
                                    selectedKeys={formData.subjects}
                                    onSelectionChange={keys => handleChange("subjects", Array.from(keys).map(String))}
                                    isDisabled={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                >
                                    {subjectOptions.map((opt: string) => (
                                        <SelectItem key={opt}>{opt}</SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    label="Staff ID"
                                    value={formData.staffId}
                                    readOnly
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Select
                                    label="State"
                                    selectedKeys={[formData.address.state]}
                                    onSelectionChange={keys => handleAddressChange("state", Array.from(keys)[0] as string)}
                                    isDisabled={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                >
                                    {stateOptions.map(opt => (
                                        <SelectItem key={opt}>{opt}</SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    label="LGA"
                                    selectedKeys={[formData.address.lga]}
                                    onSelectionChange={keys => handleAddressChange("lga", Array.from(keys)[0] as string)}
                                    isDisabled={!editMode || !formData.address.state}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                >
                                    {lgaOptions.map((opt: string) => (
                                        <SelectItem key={opt}>{opt}</SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    label="Street"
                                    value={formData.address.street}
                                    onChange={e => handleAddressChange("street", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Postal Code"
                                    value={formData.address.postalCode}
                                    onChange={e => handleAddressChange("postalCode", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                            </form>
                        </CardBody>
                        <CardFooter className="px-6 pb-6 flex gap-4 flex-col md:flex-row">
                            {editMode && (<>
                                <Button className="w-full" color="primary" size="lg" radius="full" onPress={handleUpdate}>
                                    Update
                                </Button>
                                <Button className="w-full" variant="bordered" color="primary" size="lg" radius="full" onPress={() => setEditMode(false)}>
                                    Cancel
                                </Button></>)}
                        </CardFooter>
                    </Card>
                    {/* staffs documents list */}
                    <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between px-6 pt-6 pb-2 gap-4">
                            <h2 className="text-xl font-semibold">Document(s)</h2>
                            <div className="flex gap-2">
                                <Button color="primary" variant="bordered" radius="full" onPress={() => setShowUpload(true)} size="lg">Upload Document</Button>
                            </div>
                        </CardHeader>
                        <CardBody className="px-6 mb-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <div className="aspect-square border border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2 p-4 relative">
                                <Chip className="absolute top-4 left-4" color="primary" size="sm" variant="flat">CV</Chip>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button variant="bordered" className="absolute top-4 right-4" isIconOnly>
                                            <MoreVertical size={18} />
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem
                                            key="view"
                                        >
                                            Preview Document
                                        </DropdownItem>
                                        <DropdownItem
                                            key="danger"
                                            className="text-danger"
                                            color="danger"
                                        >
                                            Delete Document
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <File className="text-gray-400" size={48} />
                                <div className="w-full h-16 border-t border-gray-200 absolute bottom-0 left-0 py-2 px-4">
                                    <h3 className="font-semibold truncate">Certificate of Employment.pdf</h3>
                                    <p className="text-sm text-muted-foreground">Uploaded on: 2023-08-15</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                        <CardHeader className="px-6 pt-6 pb-2">
                            <h2 className="text-xl font-semibold">Medical Records</h2>
                        </CardHeader>
                        <CardBody className="px-6 pb-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input
                                    label="Date"
                                    type="date"
                                    value={medicalForm.date}
                                    onChange={e => setMedicalForm((prev) => ({ ...prev, date: e.target.value }))}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Blood Group"
                                    value={medicalForm.bloodGroup}
                                    onChange={e => setMedicalForm((prev) => ({ ...prev, bloodGroup: e.target.value }))}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Genotype"
                                    value={medicalForm.genotype}
                                    onChange={e => setMedicalForm((prev) => ({ ...prev, genotype: e.target.value }))}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                            </div>
                            <Select
                                label="Allergy"
                                selectedKeys={[medicalForm.allergy]}
                                onSelectionChange={keys => setMedicalForm((prev) => ({ ...prev, allergy: Array.from(keys)[0] as string }))}
                                size="lg"
                                variant="bordered"
                                labelPlacement="outside"
                            >
                                {allergyOptions.map((opt: string) => (
                                    <SelectItem key={opt}>{opt}</SelectItem>
                                ))}
                            </Select>
                            <Textarea
                                label="Medical Notes"
                                labelPlacement="outside"
                                placeholder="Medical history and notes"
                                value={medicalForm.note}
                                onChange={e => setMedicalForm((prev) => ({ ...prev, note: e.target.value }))}
                                minRows={4}
                                variant="bordered"
                            />
                            <div className="flex gap-3 flex-col md:flex-row">
                                <Button color="primary" radius="full" size="lg" className="w-full" onPress={handleMedicalSubmit}>Submit</Button>
                                <Button variant="bordered" radius="full" size="lg" className="w-full" onPress={handleMedicalCancel}>Cancel</Button>
                            </div>
                            <div className="overflow-x-auto rounded-lg border border-emerald-100">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-emerald-50 text-left">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">Date</th>
                                            <th className="px-4 py-3 font-semibold">Blood Group</th>
                                            <th className="px-4 py-3 font-semibold">Genotype</th>
                                            <th className="px-4 py-3 font-semibold">Allergy</th>
                                            <th className="px-4 py-3 font-semibold">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {medicalRecords.map((record, idx) => (
                                            <tr key={`${record.date}-${record.bloodGroup}-${idx}`} className="border-t border-emerald-100">
                                                <td className="px-4 py-3">{record.date}</td>
                                                <td className="px-4 py-3">{record.bloodGroup}</td>
                                                <td className="px-4 py-3">{record.genotype}</td>
                                                <td className="px-4 py-3">{record.allergy || "None"}</td>
                                                <td className="px-4 py-3">{record.note || "-"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </CardBody>
                <CardFooter className="px-6 pb-6 justify-between gap-2 flex-col md:flex-row">
                    <Button className="w-full" variant="bordered" radius="full" size="lg" onPress={() => router.back()}>
                        Back to Staff List
                    </Button>
                    {/* Buttons now in header */}
                    <Button className="w-full" color="warning" radius="full" onPress={() => setShowDeactivate(true)} size="lg">Deactivate</Button>
                    <Button className="w-full" color="primary" radius="full" onPress={() => setShowLeave(true)} size="lg">Place on Leave</Button>
                    <Button className="w-full" color="danger" radius="full" onPress={() => setShowDelete(true)} size="lg">Delete</Button>
                </CardFooter>
            </Card>
            {/* Delete Modal */}
            <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} size="2xl">
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalBody>
                        This action will permanently delete this staff record. This cannot be undone.
                    </ModalBody>
                    <ModalFooter>
                        <Button className="w-full" radius="full" size="lg" color="danger" onPress={handleDelete}>Yes, Delete</Button>
                        <Button className="w-full" radius="full" size="lg" variant="bordered" onPress={() => setShowDelete(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Deactivate Modal */}
            <Modal isOpen={showDeactivate} onClose={() => setShowDeactivate(false)} size="2xl">
                <ModalContent>
                    <ModalHeader>Deactivate Staff</ModalHeader>
                    <ModalBody>
                        <div className="mb-2">Please provide a reason for deactivation:</div>
                        <Textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason..." minRows={10} />
                    </ModalBody>
                    <ModalFooter>
                        <Button className="w-full" radius="full" size="lg" variant="bordered" onPress={() => setShowDeactivate(false)}>Cancel</Button>
                        <Button className="w-full" radius="full" size="lg" color="warning" onPress={handleDeactivate}>Deactivate</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Place on Leave Modal */}
            <Modal isOpen={showLeave} onClose={() => setShowLeave(false)} size="2xl">
                <ModalContent>
                    <ModalHeader>Place Staff on Leave</ModalHeader>
                    <ModalBody>
                        <div className="mb-2">Please provide a reason for leave:</div>
                        <Textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason..." minRows={10} />
                    </ModalBody>
                    <ModalFooter>
                        <Button className="w-full" radius="full" size="lg" variant="bordered" onPress={() => setShowLeave(false)}>Cancel</Button>
                        <Button className="w-full" radius="full" size="lg" color="primary" onPress={handleLeave}>Place on Leave</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Edit Image Modal */}
            <Modal isOpen={showEditImage} onClose={() => setShowEditImage(false)} size="2xl">
                <ModalContent>
                    <ModalHeader>Edit Staff Image</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col items-center gap-4">
                            <img src={imageUrl} alt="Current" className="w-32 h-32 rounded-full object-cover border border-emerald-200" />
                            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="w-full" radius="full" size="lg" color="primary" onPress={handleImageUpload}>Update Image</Button>
                        <Button className="w-full" radius="full" size="lg" variant="bordered" onPress={() => setShowEditImage(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Document Upload Modal */}
            <Modal isOpen={showUpload} onClose={() => setShowUpload(false)} size="2xl">
                <ModalContent>
                    <ModalHeader>Upload Document</ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <Select
                                labelPlacement="outside"
                                label="Document Type"
                                selectedKeys={[uploadFormData.documentType]}
                                onSelectionChange={keys => setUploadFormData({ ...uploadFormData, documentType: Array.from(keys)[0] as string })}
                                size="lg"
                                variant="bordered"
                                color="primary"
                            >
                                {["Curriculum Vitae", "National ID", "WAEC Result", "Jamb Result", "University Certificate", "Bank Statement", "Academic Transcript", "Application Form", "Academic Award", "Application Letter", "Residence Permit", "Resume", "Other"].map((opt: string) => (
                                    <SelectItem key={opt}>{opt}</SelectItem>
                                ))}
                            </Select>
                            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full px-6 py-10 border-2 border-dashed border-emerald-300 rounded-xl cursor-pointer bg-emerald-50/40 hover:bg-emerald-100/60 transition-colors h-full">
                                <UploadCloud className="w-10 h-10 text-emerald-500 mb-2" />
                                <span className="text-base font-medium text-emerald-700">Click to upload or drag & drop</span>
                                <span className="text-xs text-emerald-400 mt-1">PDF, DOCX, XLSX, PNG, JPG (max 50MB)</span>
                                <input id="file-upload" type="file" className="hidden" onChange={(e) => setUploadFormData({ ...uploadFormData, file: e.target.files?.[0] || null })} accept="*" />
                            </label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="w-full" radius="full" size="lg" color="primary" onPress={handleDocumentUpload}>Upload Document</Button>
                        <Button className="w-full" radius="full" size="lg" variant="bordered" onPress={() => setShowUpload(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    );
}
