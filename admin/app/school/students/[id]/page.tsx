"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import { addToast } from "@heroui/toast";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { MoreVertical, File } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Progress } from "@heroui/progress";

const genderOptions = ["Male", "Female", "Other"];
const classOptions = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
const allergyOptions = ["None", "Peanuts", "Seafood", "Milk", "Eggs", "Dust", "Pollen", "Drug Allergy", "Other"];
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

export default function StudentDetailPage() {
    const router = useRouter();
    const params = useParams();
    const studentId = params?.id as string;
    const [nigeriaStates, setNigeriaStates] = useState<{ state: string; lgas: string[] }[]>([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        gender: "Male",
        disability: "None",
        dateOfBirth: "",
        height: "",
        weight: "",
        email: "",
        phone: "",
        stateOfOrigin: "",
        lgaOfOrigin: "",
        address: {
            state: "",
            lga: "",
            street: "",
            postalCode: "",
        },
        parentName: "",
        parentPhone: "",
        parentEmail: "",
        admissionNumber: studentId || "",
        classAdmitted: "",
    });
    const [showDelete, setShowDelete] = useState(false);
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showLeave, setShowLeave] = useState(false);
    const [showEditImage, setShowEditImage] = useState(false);

    const [idCardForm, setIdCardForm] = useState({ front: "", back: "" });
    const [disciplinaryForm, setDisciplinaryForm] = useState({ date: "", incident: "", actionTaken: "", note: "" });
    const [medicalForm, setMedicalForm] = useState({ date: "", bloodGroup: "", genotype: "", allergy: "None", note: "" });
    const [hostelForm, setHostelForm] = useState({ date: "", hostelName: "", roomNumber: "", bedSpace: "", status: "" });

    const [idCardRecords, setIdCardRecords] = useState([
        { date: "2026-01-10", front: "id_front_jane.png", back: "id_back_jane.png" },
    ]);
    const [disciplinaryRecords, setDisciplinaryRecords] = useState([
        { date: "2026-02-04", incident: "Late to morning assembly", actionTaken: "Warning", note: "Counseled by class teacher" },
    ]);
    const [medicalRecords, setMedicalRecords] = useState([
        { date: "2026-01-15", bloodGroup: "O+", genotype: "AA", allergy: "None", note: "No known allergies" },
    ]);
    const [hostelRecords, setHostelRecords] = useState([
        { date: "2026-01-12", hostelName: "Emerald Hostel", roomNumber: "A-12", bedSpace: "Upper Bunk", status: "Active" },
    ]);

    const [reason, setReason] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [imageUrl, setImageUrl] = useState<string>("https://i.pravatar.cc/150?u=student" + studentId);

    useEffect(() => {
        // Simulate API call delay
        setTimeout(() => {
            // Example: Replace with real fetch by studentId
            setFormData({
                firstName: "Jane",
                lastName: "Doe",
                middleName: "B.",
                gender: "Female",
                disability: "None",
                dateOfBirth: "2008-05-12",
                height: "162",
                weight: "52",
                email: "jane.doe@email.com",
                phone: "08098765432",
                stateOfOrigin: "Lagos",
                lgaOfOrigin: "Ikeja",
                address: {
                    state: "Lagos",
                    lga: "Ikeja",
                    street: "456 School Rd",
                    postalCode: "100002",
                },
                parentName: "Mrs. Doe",
                parentPhone: "08011223344",
                parentEmail: "parent.doe@email.com",
                admissionNumber: studentId || "STU001",
                classAdmitted: "SS1",
            });
            setLoading(false);
        }, 600);
    }, [studentId]);

    useEffect(() => {
        fetch("/Json/nigeria-state-and-lgas.json")
            .then(res => res.json())
            .then(data => setNigeriaStates(data));
    }, []);

    const stateOptions: string[] = useMemo(() => nigeriaStates.map((s) => s.state), [nigeriaStates]);

    const lgaOptions: string[] = useMemo(() => {
        const found = nigeriaStates.find((s) => s.state === formData.address.state);
        return found ? found.lgas : [];
    }, [formData.address.state, nigeriaStates]);

    const lgaOriginOptions: string[] = useMemo(() => {
        const found = nigeriaStates.find((s) => s.state === formData.stateOfOrigin);
        return found ? found.lgas : [];
    }, [formData.stateOfOrigin, nigeriaStates]);

    const handleChange = (key: keyof typeof formData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleAddressChange = (key: keyof typeof formData.address, value: any) => {
        setFormData((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    };

    const handleUpdate = () => {
        addToast({
            title: "Updated!",
            description: "Student data updated successfully.",
            color: "success",
            closeIcon: true,
        });
        setEditMode(false);
    };

    const handleDownload = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
        const dlAnchor = document.createElement("a");
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `student_${formData.admissionNumber}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
    };

    const handleDelete = async () => {
        try {
            addToast({
                title: "Deleted!",
                description: "Student deleted successfully.",
                color: "success",
                closeIcon: true,
            });
            setShowDelete(false);
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to delete student.",
                color: "danger",
                closeIcon: true,
            });
        }
    };

    const handleDeactivate = async () => {
        try {
            addToast({
                title: "Deactivated!",
                description: `Student deactivated. Reason: ${reason}`,
                color: "warning",
                closeIcon: true,
            });
            setShowDeactivate(false);
            setReason("");
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to deactivate student.",
                color: "danger",
                closeIcon: true,
            });
        }
    };

    const handleTransfer = async () => {
        try {
            addToast({
                title: "Placed on Leave!",
                description: `Student placed on leave. Reason: ${reason}`,
                color: "primary",
                closeIcon: true,
            });
            setShowLeave(false);
            setReason("");
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to place student on leave.",
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
                description: "Student image updated successfully.",
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

    const handleIdCardSubmit = () => {
        if (!idCardForm.front && !idCardForm.back) {
            addToast({
                title: "Missing files",
                description: "Please select ID card front or back file.",
                color: "warning",
                closeIcon: true,
            });
            return;
        }
        setIdCardRecords((prev) => [
            {
                date: new Date().toISOString().slice(0, 10),
                front: idCardForm.front || "-",
                back: idCardForm.back || "-",
            },
            ...prev,
        ]);
        setIdCardForm({ front: "", back: "" });
        addToast({
            title: "Saved",
            description: "ID card record saved.",
            color: "success",
            closeIcon: true,
        });
    };

    const handleIdCardCancel = () => {
        setIdCardForm({ front: "", back: "" });
    };

    const handleDisciplinarySubmit = () => {
        if (!disciplinaryForm.date || !disciplinaryForm.incident || !disciplinaryForm.actionTaken) {
            addToast({
                title: "Missing fields",
                description: "Date, incident and action are required.",
                color: "warning",
                closeIcon: true,
            });
            return;
        }
        setDisciplinaryRecords((prev) => [disciplinaryForm, ...prev]);
        setDisciplinaryForm({ date: "", incident: "", actionTaken: "", note: "" });
        addToast({
            title: "Saved",
            description: "Disciplinary record saved.",
            color: "success",
            closeIcon: true,
        });
    };

    const handleDisciplinaryCancel = () => {
        setDisciplinaryForm({ date: "", incident: "", actionTaken: "", note: "" });
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

    const handleHostelSubmit = () => {
        if (!hostelForm.date || !hostelForm.hostelName || !hostelForm.roomNumber || !hostelForm.status) {
            addToast({
                title: "Missing fields",
                description: "Date, hostel name, room number and status are required.",
                color: "warning",
                closeIcon: true,
            });
            return;
        }
        setHostelRecords((prev) => [hostelForm, ...prev]);
        setHostelForm({ date: "", hostelName: "", roomNumber: "", bedSpace: "", status: "" });
        addToast({
            title: "Saved",
            description: "Hostel record saved.",
            color: "success",
            closeIcon: true,
        });
    };

    const handleHostelCancel = () => {
        setHostelForm({ date: "", hostelName: "", roomNumber: "", bedSpace: "", status: "" });
    };

    if (loading) {
        return (
            <section className="flex min-h-[60vh] items-center justify-center py-8">
                <div className="text-lg text-emerald-600">Loading student data...</div>
            </section>
        );
    }

    return (
        <section className="flex min-h-[60vh] items-center justify-center py-8">
            <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between px-6 pt-6 pb-2 gap-4">
                    <h2 className="text-xl font-semibold">Student Profile</h2>
                    <div className="flex gap-2 flex-wrap">
                        <Button color="primary" variant="solid" radius="full" onPress={handleDownload} size="lg">Download</Button>
                    </div>
                </CardHeader>
                <CardBody className="px-6 pb-2 space-y-6">
                    {/* card for avatar */}
                    <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between px-6 pt-6 pb-2 gap-4">
                            <h2 className="text-xl font-semibold">Student Image</h2>
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
                            <h3 className="text-wrap text-xl text-center uppercase font-bold">{formData.firstName} {formData.middleName} {formData.lastName}</h3>
                            <div className="space-x-2">
                                <Chip className="border-0" color="primary" size="sm" variant="flat">{formData.classAdmitted}</Chip>
                                <Chip className="border-0" color="success" size="sm" variant="flat">Captain</Chip>
                                <Chip className="border-0" color="success" size="sm" variant="flat">1ST</Chip>
                                <Chip className="border-0" color="success" size="sm" variant="flat">Active</Chip>
                            </div>
                            <div className="text-center text-sm text-muted-foreground mt-2">Admitted on: 2020-09-01</div>
                            <div className="w-full mt-3">
                                <Progress isStriped value={85} color="success" size="md" className="w-full" />
                                <div className="text-center text-sm text-muted-foreground mt-1">Attendance: 85%</div>
                            </div>
                        </CardFooter>
                    </Card>
                    {/* card for student details */}
                    <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between px-6 pt-6 pb-2 gap-4">
                            <h2 className="text-xl font-semibold">Student Details</h2>
                            <div className="flex gap-2">
                                {!editMode && <Button color="primary" variant="bordered" radius="full" onPress={() => setEditMode(true)} size="lg">Edit</Button>}
                            </div>
                        </CardHeader>
                        <CardBody className="px-6 pb-2">
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <Select
                                    label="Disability"
                                    selectedKeys={[formData.disability]}
                                    onSelectionChange={keys => handleChange("disability", Array.from(keys)[0] as string)}
                                    isDisabled={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                >
                                    {disabilityOptions.map((opt: string) => (
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
                                <Input
                                    label="Height (cm)"
                                    type="number"
                                    min={0}
                                    value={formData.height}
                                    onChange={e => handleChange("height", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Weight (kg)"
                                    type="number"
                                    min={0}
                                    value={formData.weight}
                                    onChange={e => handleChange("weight", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
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
                                    label="State of Origin"
                                    selectedKeys={[formData.stateOfOrigin]}
                                    onSelectionChange={keys => handleChange("stateOfOrigin", Array.from(keys)[0] as string)}
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
                                    label="LGA of Origin"
                                    selectedKeys={[formData.lgaOfOrigin]}
                                    onSelectionChange={keys => handleChange("lgaOfOrigin", Array.from(keys)[0] as string)}
                                    isDisabled={!editMode || !formData.stateOfOrigin}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                >
                                    {lgaOriginOptions.map((opt: string) => (
                                        <SelectItem key={opt}>{opt}</SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    label="Current State"
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
                                    label="Current LGA"
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
                                    label="Street Address"
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
                                <Input
                                    label="Parent/Guardian Name"
                                    value={formData.parentName}
                                    onChange={e => handleChange("parentName", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Parent/Guardian Phone"
                                    value={formData.parentPhone}
                                    onChange={e => handleChange("parentPhone", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Parent/Guardian Email"
                                    value={formData.parentEmail}
                                    onChange={e => handleChange("parentEmail", e.target.value)}
                                    readOnly={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Admission Number"
                                    value={formData.admissionNumber}
                                    readOnly
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Select
                                    label="Class Admitted"
                                    selectedKeys={[formData.classAdmitted]}
                                    onSelectionChange={keys => handleChange("classAdmitted", Array.from(keys)[0] as string)}
                                    isDisabled={!editMode}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                >
                                    {classOptions.map((opt: string) => (
                                        <SelectItem key={opt}>{opt}</SelectItem>
                                    ))}
                                </Select>
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
                    {/* student results list */}
                    <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between px-6 pt-6 pb-2 gap-4">
                            <h2 className="text-xl font-semibold">Results</h2>
                            <div className="flex gap-2">
                                <Button color="primary" variant="bordered" radius="full" size="lg">Download All</Button>
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
                            <h2 className="text-xl font-semibold">ID Card (Front and Back)</h2>
                        </CardHeader>
                        <CardBody className="px-6 pb-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="rounded-lg border border-dashed border-emerald-300 p-4">
                                    <p className="mb-2 font-medium">ID Card Front</p>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        labelPlacement="outside"
                                        onChange={e => setIdCardForm((prev) => ({ ...prev, front: e.target.files?.[0]?.name || "" }))}
                                    />
                                </div>
                                <div className="rounded-lg border border-dashed border-emerald-300 p-4">
                                    <p className="mb-2 font-medium">ID Card Back</p>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        labelPlacement="outside"
                                        onChange={e => setIdCardForm((prev) => ({ ...prev, back: e.target.files?.[0]?.name || "" }))}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 flex-col md:flex-row">
                                <Button color="primary" radius="full" size="lg" className="w-full" onPress={handleIdCardSubmit}>Submit</Button>
                                <Button variant="bordered" radius="full" size="lg" className="w-full" onPress={handleIdCardCancel}>Cancel</Button>
                            </div>
                            <div className="overflow-x-auto rounded-lg border border-emerald-100">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-emerald-50 text-left">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">Date</th>
                                            <th className="px-4 py-3 font-semibold">Front File</th>
                                            <th className="px-4 py-3 font-semibold">Back File</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {idCardRecords.map((record, idx) => (
                                            <tr key={`${record.date}-${record.front}-${idx}`} className="border-t border-emerald-100">
                                                <td className="px-4 py-3">{record.date}</td>
                                                <td className="px-4 py-3">{record.front}</td>
                                                <td className="px-4 py-3">{record.back}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                        <CardHeader className="px-6 pt-6 pb-2">
                            <h2 className="text-xl font-semibold">Student Disciplinary Records</h2>
                        </CardHeader>
                        <CardBody className="px-6 pb-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Date"
                                    type="date"
                                    value={disciplinaryForm.date}
                                    onChange={e => setDisciplinaryForm((prev) => ({ ...prev, date: e.target.value }))}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Action Taken"
                                    value={disciplinaryForm.actionTaken}
                                    onChange={e => setDisciplinaryForm((prev) => ({ ...prev, actionTaken: e.target.value }))}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                            </div>
                            <Input
                                label="Incident"
                                value={disciplinaryForm.incident}
                                onChange={e => setDisciplinaryForm((prev) => ({ ...prev, incident: e.target.value }))}
                                size="lg"
                                variant="bordered"
                                labelPlacement="outside"
                            />
                            <Textarea
                                label="Notes"
                                labelPlacement="outside"
                                placeholder="Record notes"
                                value={disciplinaryForm.note}
                                onChange={e => setDisciplinaryForm((prev) => ({ ...prev, note: e.target.value }))}
                                minRows={5}
                                variant="bordered"
                            />
                            <div className="flex gap-3 flex-col md:flex-row">
                                <Button color="primary" radius="full" size="lg" className="w-full" onPress={handleDisciplinarySubmit}>Submit</Button>
                                <Button variant="bordered" radius="full" size="lg" className="w-full" onPress={handleDisciplinaryCancel}>Cancel</Button>
                            </div>
                            <div className="overflow-x-auto rounded-lg border border-emerald-100">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-emerald-50 text-left">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">Date</th>
                                            <th className="px-4 py-3 font-semibold">Incident</th>
                                            <th className="px-4 py-3 font-semibold">Action Taken</th>
                                            <th className="px-4 py-3 font-semibold">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {disciplinaryRecords.map((record, idx) => (
                                            <tr key={`${record.date}-${record.incident}-${idx}`} className="border-t border-emerald-100">
                                                <td className="px-4 py-3">{record.date}</td>
                                                <td className="px-4 py-3">{record.incident}</td>
                                                <td className="px-4 py-3">{record.actionTaken}</td>
                                                <td className="px-4 py-3">{record.note || "-"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                        <CardHeader className="px-6 pt-6 pb-2">
                            <h2 className="text-xl font-semibold">Student Medical Records</h2>
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
                            <Card className="w-full border border-emerald-100/70 bg-white/95 dark:border-emerald-300/20">
                                <CardHeader className="px-4 py-3">
                                    <h3 className="text-base font-semibold">Allergies List</h3>
                                </CardHeader>
                                <CardBody className="px-0 pb-0">
                                    <div className="overflow-x-auto rounded-b-lg border-t border-emerald-100">
                                        <table className="min-w-full text-sm">
                                            <thead className="bg-emerald-50 text-left">
                                                <tr>
                                                    <th className="px-4 py-3 font-semibold">Date</th>
                                                    <th className="px-4 py-3 font-semibold">Allergy</th>
                                                    <th className="px-4 py-3 font-semibold">Medical Note</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {medicalRecords.filter((record) => record.allergy && record.allergy !== "None").length === 0 ? (
                                                    <tr className="border-t border-emerald-100">
                                                        <td className="px-4 py-3" colSpan={3}>No allergy record yet.</td>
                                                    </tr>
                                                ) : (
                                                    medicalRecords
                                                        .filter((record) => record.allergy && record.allergy !== "None")
                                                        .map((record, idx) => (
                                                            <tr key={`${record.date}-${record.allergy}-${idx}`} className="border-t border-emerald-100">
                                                                <td className="px-4 py-3">{record.date}</td>
                                                                <td className="px-4 py-3">{record.allergy}</td>
                                                                <td className="px-4 py-3">{record.note || "-"}</td>
                                                            </tr>
                                                        ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                            </Card>
                        </CardBody>
                    </Card>

                    <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
                        <CardHeader className="px-6 pt-6 pb-2">
                            <h2 className="text-xl font-semibold">Student Hostel Record</h2>
                        </CardHeader>
                        <CardBody className="px-6 pb-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input
                                    label="Date"
                                    type="date"
                                    value={hostelForm.date}
                                    onChange={e => setHostelForm((prev) => ({ ...prev, date: e.target.value }))}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Hostel Name"
                                    value={hostelForm.hostelName}
                                    onChange={e => setHostelForm((prev) => ({ ...prev, hostelName: e.target.value }))}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Room Number"
                                    value={hostelForm.roomNumber}
                                    onChange={e => setHostelForm((prev) => ({ ...prev, roomNumber: e.target.value }))}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Bed Space"
                                    value={hostelForm.bedSpace}
                                    onChange={e => setHostelForm((prev) => ({ ...prev, bedSpace: e.target.value }))}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                                <Input
                                    label="Hostel Status"
                                    value={hostelForm.status}
                                    onChange={e => setHostelForm((prev) => ({ ...prev, status: e.target.value }))}
                                    size="lg"
                                    variant="bordered"
                                    labelPlacement="outside"
                                />
                            </div>
                            <div className="flex gap-3 flex-col md:flex-row">
                                <Button color="primary" radius="full" size="lg" className="w-full" onPress={handleHostelSubmit}>Submit</Button>
                                <Button variant="bordered" radius="full" size="lg" className="w-full" onPress={handleHostelCancel}>Cancel</Button>
                            </div>
                            <div className="overflow-x-auto rounded-lg border border-emerald-100">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-emerald-50 text-left">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">Date</th>
                                            <th className="px-4 py-3 font-semibold">Hostel</th>
                                            <th className="px-4 py-3 font-semibold">Room</th>
                                            <th className="px-4 py-3 font-semibold">Bed Space</th>
                                            <th className="px-4 py-3 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hostelRecords.map((record, idx) => (
                                            <tr key={`${record.date}-${record.hostelName}-${idx}`} className="border-t border-emerald-100">
                                                <td className="px-4 py-3">{record.date}</td>
                                                <td className="px-4 py-3">{record.hostelName}</td>
                                                <td className="px-4 py-3">{record.roomNumber}</td>
                                                <td className="px-4 py-3">{record.bedSpace || "-"}</td>
                                                <td className="px-4 py-3">{record.status}</td>
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
                        Back to Student List
                    </Button>
                    {/* Buttons now in header */}
                    <Button className="w-full" color="warning" radius="full" onPress={() => setShowDeactivate(true)} size="lg">Deactivate</Button>
                    <Button className="w-full" color="primary" radius="full" onPress={() => setShowLeave(true)} size="lg">Transfer Student</Button>
                    <Button className="w-full" color="danger" radius="full" onPress={() => setShowDelete(true)} size="lg">Delete</Button>
                </CardFooter>
            </Card>
            {/* Delete Modal */}
            <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} size="2xl">
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalBody>
                        This action will permanently delete this student record. This cannot be undone.
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
                    <ModalHeader>Deactivate Student</ModalHeader>
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

            {/* Transfer Student  Modal */}
            <Modal isOpen={showLeave} onClose={() => setShowLeave(false)} size="2xl">
                <ModalContent>
                    <ModalHeader>Transfer Student</ModalHeader>
                    <ModalBody>
                        <div className="mb-2">Please provide a reason for transfer:</div>
                        <Textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason..." minRows={10} />
                    </ModalBody>
                    <ModalFooter>
                        <Button className="w-full" radius="full" size="lg" variant="bordered" onPress={() => setShowLeave(false)}>Cancel</Button>
                        <Button className="w-full" radius="full" size="lg" color="primary" onPress={handleTransfer}>Transfer Student</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Edit Image Modal */}
            <Modal isOpen={showEditImage} onClose={() => setShowEditImage(false)} size="2xl">
                <ModalContent>
                    <ModalHeader>Edit Student Image</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col items-center gap-4">
                            <img src={imageUrl} alt="Current" className="w-32 h-32 rounded-full object-cover border border-emerald-200" />
                            <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="w-full" radius="full" size="lg" color="primary" onPress={handleImageUpload}>Update Image</Button>
                        <Button className="w-full" radius="full" size="lg" variant="bordered" onPress={() => setShowEditImage(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    );
}
