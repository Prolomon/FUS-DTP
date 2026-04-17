"use client";

import { useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Accordion, AccordionItem } from "@heroui/accordion";

const results = [
  { className: "JSS 1 Gold", published: "Yes", average: "73%", pendingSubjects: 1 },
  { className: "JSS 2 Ruby", published: "No", average: "68%", pendingSubjects: 3 },
  { className: "SS 1 Emerald", published: "Yes", average: "76%", pendingSubjects: 0 },
  { className: "SS 3 Platinum", published: "No", average: "81%", pendingSubjects: 2 },
];

const uploadedResultsByTermDate = [
  {
    term: "First Term",
    date: "2026-03-15",
    results: [
      { className: "JSS 1 Gold", published: "Yes", average: "73%", pendingSubjects: 0 },
      { className: "JSS 2 Ruby", published: "No", average: "68%", pendingSubjects: 2 },
    ],
  },
  {
    term: "First Term",
    date: "2026-03-10",
    results: [
      { className: "SS 1 Emerald", published: "Yes", average: "76%", pendingSubjects: 0 },
      { className: "SS 3 Platinum", published: "No", average: "81%", pendingSubjects: 1 },
    ],
  },
  {
    term: "Second Term",
    date: "2026-06-20",
    results: [
      { className: "JSS 1 Gold", published: "Yes", average: "75%", pendingSubjects: 0 },
      { className: "JSS 2 Ruby", published: "Yes", average: "71%", pendingSubjects: 0 },
    ],
  },
  {
    term: "Second Term",
    date: "2026-06-15",
    results: [
      { className: "SS 1 Emerald", published: "No", average: "78%", pendingSubjects: 1 },
      { className: "SS 3 Platinum", published: "Yes", average: "82%", pendingSubjects: 0 },
    ],
  },
];

export default function ResultsPage() {
  const [searchStudentId, setSearchStudentId] = useState("");
  const [searchStudentName, setSearchStudentName] = useState("");

  return (
    <section className="space-y-5 py-4">
      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Lookup</p>
            <h2 className="text-2xl font-semibold">Check Result</h2>
          </div>
        </CardHeader>
        <CardBody className="grid gap-4 px-6 pb-6 md:grid-cols-2">
          <Input
            label="Student ID"
            placeholder="Enter student ID"
            value={searchStudentId}
            onChange={(e) => setSearchStudentId(e.target.value)}
            size="lg"
            variant="bordered"
            labelPlacement="outside"
          />
          <Input
            label="Student Name"
            placeholder="Enter student name"
            value={searchStudentName}
            onChange={(e) => setSearchStudentName(e.target.value)}
            size="lg"
            variant="bordered"
            labelPlacement="outside"
          />
        </CardBody>
      </Card>

      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Assessment</p>
            <h2 className="text-2xl font-semibold">Result Checker</h2>
          </div>
          <Button className="bg-emerald-600 text-white" radius="full">Publish Pending Results</Button>
        </CardHeader>
        <CardBody className="grid gap-3 px-6 pb-6">
          {results.map((item) => (
            <div
              key={item.className}
              className="rounded-2xl border border-default-200/70 bg-default-50/35 p-4 dark:border-white/10 dark:bg-slate-900/35"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{item.className}</p>
                <Chip
                  className="border-0"
                  color={item.published === "Yes" ? "success" : "warning"}
                  size="sm"
                  variant="flat"
                >
                  {item.published === "Yes" ? "Published" : "Pending"}
                </Chip>
              </div>
              <p className="mt-1 text-sm text-foreground/70">Class average: {item.average}</p>
              <p className="mt-1 text-sm text-foreground/70">Pending subjects: {item.pendingSubjects}</p>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Upload Management</p>
            <h2 className="text-2xl font-semibold">Upload Result</h2>
          </div>
        </CardHeader>
        <CardBody className="px-0 pb-6">
          <Accordion>
            {uploadedResultsByTermDate.map((group, idx) => (
              <AccordionItem
                key={`${group.term}-${group.date}-${idx}`}
                title={`${group.term} - ${group.date}`}
                className="px-6"
              >
                <div className="space-y-3 pb-4">
                  {group.results.map((item) => (
                    <div
                      key={item.className}
                      className="rounded-2xl border border-default-200/70 bg-default-50/35 p-4 dark:border-white/10 dark:bg-slate-900/35"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold">{item.className}</p>
                        <Chip
                          className="border-0"
                          color={item.published === "Yes" ? "success" : "warning"}
                          size="sm"
                          variant="flat"
                        >
                          {item.published === "Yes" ? "Published" : "Pending"}
                        </Chip>
                      </div>
                      <p className="mt-1 text-sm text-foreground/70">Class average: {item.average}</p>
                      <p className="mt-1 text-sm text-foreground/70">Pending subjects: {item.pendingSubjects}</p>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </section>
  );
}
