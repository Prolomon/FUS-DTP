"use client";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Link from "next/link";
import { useRouter } from "next/navigation";

const staffMembers = [
  { id: 1, name: "Mrs. Kemi Ade", role: "Mathematics Teacher", department: "Sciences", status: "Active" },
  { id: 2, name: "Mr. Tunde Okafor", role: "Principal", department: "Leadership", status: "Active" },
  { id: 3, name: "Mrs. Sarah John", role: "English Teacher", department: "Arts", status: "Active" },
  { id: 4, name: "Mr. Daniel Ibrahim", role: "Sports Coach", department: "Physical Education", status: "On Leave" },
];

export default function StaffPage() {
  const router = useRouter();
  return (
    <section className="space-y-5 py-4">
      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Human Resources</p>
            <h2 className="text-2xl font-semibold">Staff Management</h2>
            <p className="mt-1 text-sm text-foreground/70">Track staff records, departments, and role assignments.</p>
          </div>
          <Button className="text-white" radius="full" color="primary" onPress={() => router.push("/school/staff/add")}>
            Add Staff
          </Button>
        </CardHeader>
        <CardBody className="grid gap-3 px-6 pb-6">
          {staffMembers.map((person) => (
            <div
              key={person.id}
              className="rounded-2xl border border-default-200/70 bg-default-50/35 p-4 dark:border-white/10 dark:bg-slate-900/35"
            >
              <div className="flex items-center justify-between gap-2">
                <Link href={`/school/staff/${person.id}`} className="text-sm font-semibold">
                  {person.name}
                </Link>
                <Chip
                  className="border-0"
                  color={person.status === "Active" ? "success" : "warning"}
                  size="sm"
                  variant="flat"
                >
                  {person.status}
                </Chip>
              </div>
              <p className="mt-1 text-sm text-foreground/70">{person.role}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-foreground/50">{person.department}</p>
            </div>
          ))}
        </CardBody>
      </Card>
    </section>
  );
}
