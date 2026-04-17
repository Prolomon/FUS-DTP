"use client";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function StudentsPage() {
  const router = useRouter();
  return (
    <section className="space-y-5 py-4">
      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Student Registry</p>
            <h2 className="text-2xl font-semibold">Students</h2>
            <p className="mt-1 text-sm text-foreground/70">Manage enrollment, class assignment, and guardian records.</p>
          </div>
          <Button className="text-white bg-emerald-600" radius="full" onPress={() => router.push("/school/students/add")}>
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
                  <td className="px-6 py-4 font-medium"><Link href={`/school/students/${student.id}`}>{student.id}</Link></td>
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
    </section>
  );
}
