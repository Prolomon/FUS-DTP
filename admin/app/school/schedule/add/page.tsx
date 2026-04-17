"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";

export default function AddSchedulePage() {
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        venue: "",
        appliesTo: [] as string[],
        priority: "Medium",
    });
    const router = useRouter();

    const venueOptions = [
        "Main Court",
        "Exam Hall",
        "Conference Room",
        "Admin Office",
        "Teachers Office",
        "Computer Lab",
        "Library",
        "Lab",
    ];
    const appliesToOptions = [
        "School-wide",
        "Assessment",
        "Parent",
        "Staffs",
        "Admin",
        "Student",
        "Committee",
    ];

    const handleSubmit = async () => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            addToast({
                title: "Schedule added successfully.",
                variant: "solid",
                color: "success",
                closeIcon: true,
                description: "The schedule has been added successfully.",
            });
            router.back();
        } catch (error) {
            addToast({
                title: "Error: Failed to add schedule.",
                variant: "solid",
                color: "danger",
                timeout: 1000,
                closeIcon: true,
                description: "An error occurred while adding the schedule.",
            });
        }
    };

    const handleClear = () => {
        setFormData({
            title: "",
            date: "",
            time: "",
            venue: "",
            appliesTo: [],
            priority: "Medium",
        });
    };

    return (
        <section className="flex min-h-[60vh] items-center justify-center py-8">
            <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
                <CardHeader className="px-6 pt-6 pb-2">
                    <h2 className="text-xl font-semibold">Add Schedule</h2>
                </CardHeader>
                <CardBody className="px-6 pb-2 gap-4">
                    <Input
                        label="Title"
                        value={formData.title}
                        onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
                        size="lg"
                    />
                    <Input
                        label="Date"
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData(f => ({ ...f, date: e.target.value }))}
                        size="lg"
                    />
                    <Input
                        label="Time"
                        type="time"
                        value={formData.time}
                        onChange={e => setFormData(f => ({ ...f, time: e.target.value }))}
                        size="lg"
                    />
                    <Select
                        label="Venue"
                        selectedKeys={formData.venue ? [formData.venue] : []}
                        onSelectionChange={keys => setFormData(f => ({ ...f, venue: String(Array.from(keys)[0] || "") }))}
                        size="lg"
                    >
                        {venueOptions.map(opt => (
                            <SelectItem key={opt}>{opt}</SelectItem>
                        ))}
                    </Select>
                    <Select
                        label="Applies To"
                        selectionMode="multiple"
                        selectedKeys={formData.appliesTo}
                        onSelectionChange={keys => setFormData(f => ({ ...f, appliesTo: Array.from(keys).map(String) }))}
                        size="lg"
                    >
                        {appliesToOptions.map(opt => (
                            <SelectItem key={opt}>{opt}</SelectItem>
                        ))}
                    </Select>
                    <Select
                        label="Priority"
                        selectedKeys={[formData.priority]}
                        onSelectionChange={keys => setFormData(f => ({ ...f, priority: String(Array.from(keys)[0] || "Medium") }))}
                        size="lg"
                    >
                        <SelectItem key="High">High</SelectItem>
                        <SelectItem key="Medium">Medium</SelectItem>
                        <SelectItem key="Low">Low</SelectItem>
                    </Select>
                </CardBody>
                <CardFooter className="px-6 pb-6 flex gap-2 justify-between">
                    <Button type="button" variant="bordered" radius="full" size="lg" color="default" onPress={handleClear} className="w-1/3">Clear Form</Button>
                    <Button color="primary" radius="full" size="lg" className="w-1/3" onPress={handleSubmit}>Create</Button>
                    <Button type="button" variant="bordered" radius="full" size="lg" color="default" onPress={() => router.push('/school/schedule')} className="w-1/3">Cancel</Button>
                </CardFooter>
            </Card>
        </section>
    );
}
