"use client";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import { Download, Edit } from "lucide-react";
import { Progress } from "@heroui/progress";

// Dummy data for demonstration
const classData = {
    name: "JSS 1 Gold",
    students: [
        { id: 101, name: "Aisha Bello" },
        { id: 102, name: "John Doe" },
        { id: 103, name: "Mary Okon" },
        { id: 104, name: "Samuel Uche" },
    ],
    teacher: {
        name: "Mrs. A. Yusuf",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
        email: "ayusuf@school.edu.ng",
    },
};

const students = [
    {
        id: "STU-1001",
        name: "Aisha Bello",
        className: "JSS 2 Ruby",
        guardian: "Mr. Bello",
        attendance: "95%",
        status: "Active",
    },
    {
        id: "STU-1002",
        name: "David Okafor",
        className: "SS 1 Emerald",
        guardian: "Mrs. Okafor",
        attendance: "89%",
        status: "Active",
    },
    {
        id: "STU-1003",
        name: "Maryam Yusuf",
        className: "JSS 1 Gold",
        guardian: "Mrs. Yusuf",
        attendance: "92%",
        status: "Active",
    },
    {
        id: "STU-1004",
        name: "Chinedu Nnaji",
        className: "SS 3 Platinum",
        guardian: "Mr. Nnaji",
        attendance: "76%",
        status: "Watchlist",
    },
];

export default function ClassDetailPage() {
    const router = useRouter();

    return (
        <section className="space-y-6 py-4">
            <Card className="border border-default-200/70 bg-default-50/35 dark:border-white/10 dark:bg-slate-900/35 px-6 space-y-6 py-4">
            <CardHeader className="flex items-center justify-between px-2 md:px-0">
                <h1 className="text-2xl font-bold">Classroom Details</h1>
                <div className="flex items-center gap-2">
                    <Button color="primary" className="bg-emerald-600 text-white" radius="full" startContent={<Edit size={18} />}>
                        Update
                    </Button>
                    <Button color="primary" className="bg-emerald-600 text-white" radius="full" startContent={<Download size={18} />}>
                        Download
                    </Button>
                </div>
            </CardHeader>

            <Card className="border border-default-200/70 bg-default-50/35 dark:border-white/10 dark:bg-slate-900/35">
                <CardHeader className="flex justify-between gap-1 px-6 pt-6">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Academic Structure</p>
                        <h2 className="text-2xl font-semibold">{classData.name}</h2>
                    </div>
                    <Button color="primary" className="bg-emerald-600 text-white" radius="full">
                        View Curriculum
                    </Button>
                </CardHeader>
                <CardBody className="grid gap-3 px-6 pb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <Chip className="border-0" color="primary" size="sm" variant="flat">{classData.students.length} Students</Chip>
                        <Chip className="border-0" color="secondary" size="sm" variant="flat">Curriculum completion: 88%</Chip>
                        <Chip className="border-0" color="secondary" size="sm" variant="flat">Currently Present: 88%</Chip>
                        <Chip className="border-0" color="secondary" size="sm" variant="flat">Today Check In: 88%</Chip>
                        <Chip className="border-0" color="secondary" size="sm" variant="flat">Today Check Out: 88%</Chip>
                    </div>
                </CardBody>
                <CardFooter className="flex flex-col px-6 pb-6 w-full space-y-4">
                    <div className="w-full">
                        <Progress aria-label={`${classData.name} curriculum completion`} size="sm" value={50} />
                        <p className="mt-1 text-xs text-foreground/60">{new Date().toLocaleDateString()} Check In: {50}%</p>
                    </div>
                    <div className="w-full">
                        <Progress aria-label={`${classData.name} curriculum completion`} size="sm" value={50} />
                        <p className="mt-1 text-xs text-foreground/60"> {new Date().toLocaleDateString()} Check Out: {50}%</p>
                    </div>
                    <div className="w-full">
                        <Progress aria-label={`${classData.name} curriculum completion`} size="sm" value={50} />
                        <p className="mt-1 text-xs text-foreground/60">Current Present: {50}%</p>
                    </div>
                    <div className="w-full">
                        <Progress aria-label={`${classData.name} curriculum completion`} size="sm" value={50} />
                        <p className="mt-1 text-xs text-foreground/60">Curriculum completion: {50}%</p>
                    </div>
                </CardFooter>
            </Card>

            <Card className="flex-1 border border-default-200/70 bg-default-50/35 dark:border-white/10 dark:bg-slate-900/35">
                <CardHeader className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <Avatar src={classData.teacher.avatar} alt={classData.teacher.name} size="md" />
                        <div>
                            <p className="font-semibold text-base">{classData.teacher.name}</p>
                            <p className="text-xs text-foreground/60">{classData.teacher.email}</p>
                        </div>
                    </div>
                    <Button size="sm" color="primary" className="bg-emerald-600 text-white" radius="full">
                        Change
                    </Button>
                </CardHeader>
            </Card>

            <Card className="flex-1 border border-default-200/70 bg-default-50/35 dark:border-white/10 dark:bg-slate-900/35">
                <CardHeader className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <Avatar src={classData.teacher.avatar} alt={classData.teacher.name} size="md" />
                        <div>
                            <p className="font-semibold text-base">{classData.teacher.name}</p>
                            <p className="text-xs text-foreground/60">Assistant Class Captain</p>
                        </div>
                    </div>
                    <Button size="sm" color="primary" className="bg-emerald-600 text-white" radius="full">
                        Change
                    </Button>
                </CardHeader>
            </Card>

            <Card className="flex-1 border border-default-200/70 bg-default-50/35 dark:border-white/10 dark:bg-slate-900/35">
                <CardHeader className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <Avatar src={classData.teacher.avatar} alt={classData.teacher.name} size="md" />
                        <div>
                            <p className="font-semibold text-base">{classData.teacher.name}</p>
                            <p className="text-xs text-foreground/60">Assistant Class Captain</p>
                        </div>
                    </div>
                    <Button size="sm" color="primary" className="bg-emerald-600 text-white" radius="full">
                        Change
                    </Button>
                </CardHeader>
            </Card>

            <Card className="border border-default-200/70 bg-background/85">
                <CardHeader className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Students</h2>
                    </div>
                    <Button className="text-white" radius="full" color="primary" onPress={() => router.push("/school/students/add")}>
                        Add Student
                    </Button>
                </CardHeader>
                <CardBody className="overflow-x-auto px-0 pb-2">
                    <table className="w-full min-w-[760px] text-left text-sm">
                        <thead>
                            <tr className="border-y border-default-200/70 bg-default-100/40 text-foreground/60">
                                <th className="px-6 py-3 font-medium">Student ID</th>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Class</th>
                                <th className="px-4 py-3 font-medium">Guardian</th>
                                <th className="px-4 py-3 font-medium">Attendance</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="border-b border-default-100">
                                    <td className="px-6 py-4 font-medium">{student.id}</td>
                                    <td className="px-4 py-4">{student.name}</td>
                                    <td className="px-4 py-4 text-foreground/75">{student.className}</td>
                                    <td className="px-4 py-4 text-foreground/75">{student.guardian}</td>
                                    <td className="px-4 py-4 text-foreground/75">{student.attendance}</td>
                                    <td className="px-4 py-4">
                                        <Chip
                                            className="border-0"
                                            color={student.status === "Active" ? "success" : "warning"}
                                            size="sm"
                                            variant="flat"
                                        >
                                            {student.status}
                                        </Chip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
            </Card>
        </section>
    );
}
