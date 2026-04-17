"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";

import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

const titleOptions = ["Mr", "Mrs", "Miss", "Master"];
const subjectOptions = [
    "Mathematics",
    "English",
    "Biology",
    "Chemistry",
    "Physics",
    "Economics",
    "Geography",
    "History",
    "Civic Education",
    "Physical Education",
    "Computer Science",
    "Agricultural Science",
    "French",
    "Literature",
];
const relationshipOptions = ["Single", "Married", "Divorced"];
const subjectGroupOptions = ["Science", "Arts", "Physical Education"];
const genderOptions = ["Male", "Female", "Other"];
const staffGroupOptions = ["Driver", "Security", "Teacher"];


export default function AddStaffPage() {
    const router = useRouter();
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
        staffId: "",
        address: {
            state: "",
            lga: "",
            street: "",
            postalCode: "",
        },
    });
    const [nigeriaStates, setNigeriaStates] = useState<{ state: string; lgas: string[] }[]>([]);
    // Load JSON dynamically (Next.js/React best practice)
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

    const handleSubmit = () => {

        try {

            // Simulate API call
            addToast({
                title: "Success",
                description: "Staff added successfully.",
                color: "success",
                closeIcon: true
            });
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to add staff.",
                color: "danger",
                closeIcon: true,
            });
        }
    };

    const handleClear = () => {
        setFormData({
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
            staffId: "",
            address: {
                state: "",
                lga: "",
                street: "",
                postalCode: "",
            }
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
            description: "Staff addition cancelled.",
            color: "warning",
            closeIcon: true,
        });
    };

    return (
        <section className="flex min-h-[60vh] items-center justify-center py-8">
            <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
                <CardHeader className="px-6 pt-6 pb-2">
                    <h2 className="text-xl font-semibold">Add Staff</h2>
                </CardHeader>
                <CardBody className="px-6 pb-2">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <Select
                            label="Staff Group"
                            selectedKeys={[formData.staffGroup]}
                            onSelectionChange={keys => handleChange("staffGroup", Array.from(keys)[0] as string)}
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
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Input
                            label="Last Name"
                            value={formData.lastName}
                            onChange={e => handleChange("lastName", e.target.value)}
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Input
                            label="Middle Name"
                            value={formData.middleName}
                            onChange={e => handleChange("middleName", e.target.value)}
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Select
                            label="Gender"
                            selectedKeys={[formData.gender]}
                            onSelectionChange={keys => handleChange("gender", Array.from(keys)[0] as string)}
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
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Select
                            label="Relationship Status"
                            selectedKeys={[formData.relationship]}
                            onSelectionChange={keys => handleChange("relationship", Array.from(keys)[0] as string)}
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
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Input
                            label="Phone"
                            type="tel"
                            value={formData.phone}
                            onChange={e => handleChange("phone", e.target.value)}
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Select
                            label="Subject Group"
                            selectedKeys={[formData.subjectGroup]}
                            onSelectionChange={keys => handleChange("subjectGroup", Array.from(keys)[0] as string)}
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
                            onChange={e => handleChange("staffId", e.target.value)}
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Select
                            label="State"
                            selectedKeys={[formData.address.state]}
                            onSelectionChange={keys => handleAddressChange("state", Array.from(keys)[0] as string)}
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
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                            isDisabled={!formData.address.state}
                        >
                            {lgaOptions.map((opt: string) => (
                                <SelectItem key={opt}>{opt}</SelectItem>
                            ))}
                        </Select>
                        <Input
                            label="Street"
                            value={formData.address.street}
                            onChange={e => handleAddressChange("street", e.target.value)}
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Input
                            label="Postal Code"
                            value={formData.address.postalCode}
                            onChange={e => handleAddressChange("postalCode", e.target.value)}
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
                    </form>
                </CardBody>
                <CardFooter className="px-6 pb-6 flex gap-4 flex-col md:flex-row">
                    <Button className="w-full" variant="bordered" color="primary" size="lg" radius="full" onPress={handleClear}>
                        Clear
                    </Button>
                    <Button className="w-full" color="primary" size="lg" radius="full" onPress={handleSubmit}>
                        Add Staff
                    </Button>
                    <Button className="w-full" variant="bordered" color="primary" size="lg" radius="full" onPress={handleCancel}>
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </section>
    );
}
