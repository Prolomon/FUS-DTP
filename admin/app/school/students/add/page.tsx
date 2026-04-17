"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";

import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

const classOptions = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

const genderOptions = ["Male", "Female", "Other"];

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


export default function AddStudentPage() {
    const router = useRouter();
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
        parentId: "",
        parentName: "",
        parentPhone: "",
        parentEmail: "",
        admissionNumber: "",
        classAdmitted: "",
    });

    const [nigeriaStates, setNigeriaStates] = useState<{ state: string; lgas: string[] }[]>([]);

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

    const lgaOriginOptions: string[] = useMemo(() => {
        const found = nigeriaStates.find((s) => s.state === formData.stateOfOrigin);
        return found ? found.lgas : [];
    }, [formData.stateOfOrigin, nigeriaStates]);

    const handleSubmit = () => {
        try {
            // Simulate API call
            addToast({
                title: "Success",
                description: "Student added successfully.",
                color: "success",
                closeIcon: true
            });
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to add student.",
                color: "danger",
                closeIcon: true,
            });
        }
    };

    const handleClear = () => {
        setFormData({
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
            parentId: "",
            parentName: "",
            parentPhone: "",
            parentEmail: "",
            admissionNumber: "",
            classAdmitted: "",
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
            description: "Student addition cancelled.",
            color: "warning",
            closeIcon: true,
        });
    };

    return (
        <section className="flex min-h-[60vh] items-center justify-center py-8">
            <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
                <CardHeader className="px-6 pt-6 pb-2">
                    <h2 className="text-xl font-semibold">Add Student</h2>
                </CardHeader>
                <CardBody className="px-6 pb-2">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
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
                        <Select
                            label="Disability"
                            selectedKeys={[formData.disability]}
                            onSelectionChange={keys => handleChange("disability", Array.from(keys)[0] as string)}
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
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
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
                            label="State of Origin"
                            selectedKeys={[formData.stateOfOrigin]}
                            onSelectionChange={keys => handleChange("stateOfOrigin", Array.from(keys)[0] as string)}
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
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                            isDisabled={!formData.stateOfOrigin}
                        >
                            {lgaOriginOptions.map((opt: string) => (
                                <SelectItem key={opt}>{opt}</SelectItem>
                            ))}
                        </Select>
                        <Select
                            label="Current State"
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
                            label="Current LGA"
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
                            label="Street Address"
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
                        <Input
                            label="Parent UID / Phone Number"
                            value={formData.parentId}
                            onChange={e => {
                                handleChange("parentId", e.target.value)
                            }}
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Input
                            label="Parent/Guardian Name"
                            value={formData.parentName}
                            onChange={e => handleChange("parentName", e.target.value)}
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                            readOnly
                        />
                        <Input
                            label="Admission Number"
                            value={formData.admissionNumber}
                            onChange={e => handleChange("admissionNumber", e.target.value)}
                            size="lg"
                            variant="bordered"
                            labelPlacement="outside"
                        />
                        <Select
                            label="Class Admitted"
                            selectedKeys={[formData.classAdmitted]}
                            onSelectionChange={keys => handleChange("classAdmitted", Array.from(keys)[0] as string)}
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
                    <Button className="w-full border-emerald-600 text-emerald-600" variant="bordered" size="lg" radius="full" onPress={handleClear}>
                        Clear
                    </Button>
                    <Button className="w-full bg-emerald-600 text-white" size="lg" radius="full" type="submit" onPress={handleSubmit}>
                        Add Student
                    </Button>
                    <Button className="w-full border-emerald-600 text-emerald-600" variant="bordered" size="lg" radius="full" onPress={handleCancel}>
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </section>
    );
}
