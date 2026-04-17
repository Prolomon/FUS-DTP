import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import Link from "next/link";

const subjects = [
  { id: "mathematics", name: "Mathematics", teacher: "Mrs. Amina", classes: "JSS1 - SS3", students: 420, status: "Active" },
  { id: "english-language", name: "English Language", teacher: "Mr. Joseph", classes: "JSS1 - SS3", students: 418, status: "Active" },
  { id: "biology", name: "Biology", teacher: "Dr. Uche", classes: "SS1 - SS3", students: 210, status: "Active" },
  { id: "computer-science", name: "Computer Science", teacher: "Mrs. Tobi", classes: "JSS1 - SS3", students: 365, status: "Active" },
  { id: "civic-education", name: "Civic Education", teacher: "Mr. Bala", classes: "JSS1 - SS3", students: 400, status: "Active" },
];

export default function SubjectsPage() {
  return (
    <section className="space-y-5 py-4">
      <Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
        <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Academic Office</p>
            <h2 className="text-2xl font-semibold">Subjects Management</h2>
            <p className="mt-1 text-sm text-foreground/70">Manage school subjects and open each subject record for details.</p>
          </div>
          <Button as={Link} href="/school/subjects/add" className="bg-emerald-600 text-white" radius="full">
            Add Subject
          </Button>
        </CardHeader>
        <CardBody className="grid gap-3 px-6 pb-6">
          {subjects.map((subject) => (
            <div key={subject.id} className="rounded-2xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <Link href={`/school/subjects/${subject.id}`} className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300">
                    {subject.name}
                  </Link>
                  <p className="mt-1 text-sm text-foreground/70">Teacher: {subject.teacher}</p>
                  <p className="mt-1 text-sm text-foreground/70">Classes: {subject.classes}</p>
                  <p className="mt-1 text-xs text-foreground/60">Students: {subject.students}</p>
                </div>
                <Chip className="border-0" color="success" size="sm" variant="flat">
                  {subject.status}
                </Chip>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </section>
  );
}
