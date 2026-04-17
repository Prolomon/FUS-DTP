import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import Link from "next/link";

const parentRecords = [
  { name: "Mr. Bello", child: "Aisha Bello", contact: "+234 801 111 2233", relation: "Father" },
  { name: "Mrs. Okafor", child: "David Okafor", contact: "+234 802 444 9900", relation: "Mother" },
  { name: "Mr. Nnaji", child: "Chinedu Nnaji", contact: "+234 803 222 1818", relation: "Guardian" },
];

export default function ParentPage() {
  return (
    <section className="space-y-5 py-4">
      <Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
        <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Community</p>
            <h2 className="text-2xl font-semibold">Parent Portal</h2>
            <p className="mt-1 text-sm text-foreground/70">Manage guardian records and communication channels.</p>
          </div>
          <Button as={Link} href="/school/parent/add" className="bg-emerald-600 text-white" radius="full">Add Parent</Button>
        </CardHeader>
        <CardBody className="grid gap-3 px-6 pb-6">
          {parentRecords.map((parent) => (
            <div key={parent.name} className="rounded-2xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold">{parent.name}</p>
                  <p className="mt-1 text-sm text-foreground/70">Child: {parent.child}</p>
                  <p className="mt-1 text-sm text-foreground/70">Relation: {parent.relation}</p>
                  <p className="mt-1 text-xs text-foreground/60">Contact: {parent.contact}</p>
                </div>
                <div className="flex gap-2">
                  <Button as={Link} href={`/school/parent/${parent.name?.replaceAll(" ", "-")?.toLowerCase()}`} className="border-emerald-600 text-emerald-700" variant="bordered" radius="full">
                    View
                  </Button>
                  <Button className="bg-emerald-600 text-white" radius="full">
                    Message
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </section>
  );
}
