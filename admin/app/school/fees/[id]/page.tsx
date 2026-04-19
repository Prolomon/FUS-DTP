"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { ArrowLeft, CircleDollarSign, Users } from "lucide-react";

type PaymentRecord = {
  studentName: string;
  className: string;
  amountPaid: string;
  paidOn: string;
  reference: string;
  status: "Paid" | "Pending";
};

type FeeDetail = {
  id: string;
  name: string;
  description: string;
  amount: string;
  frequency: string;
  dueDate: string;
  targetStudents: number;
  paidStudents: number;
  totalExpected: string;
  totalCollected: string;
  paymentHistory: PaymentRecord[];
};

const feeDetails: FeeDetail[] = [
  {
    id: "tuition",
    name: "Tuition",
    description:
      "Core academic fee for classroom learning, teacher delivery, and continuous assessment.",
    amount: "NGN 120,000",
    frequency: "Termly",
    dueDate: "2026-05-10",
    targetStudents: 180,
    paidStudents: 152,
    totalExpected: "NGN 21,600,000",
    totalCollected: "NGN 18,240,000",
    paymentHistory: [
      {
        studentName: "Aisha Bello",
        className: "SS2",
        amountPaid: "NGN 120,000",
        paidOn: "2026-04-10",
        reference: "PAY-TUI-00121",
        status: "Paid",
      },
      {
        studentName: "Daniel Okon",
        className: "JSS3",
        amountPaid: "NGN 120,000",
        paidOn: "2026-04-12",
        reference: "PAY-TUI-00129",
        status: "Paid",
      },
      {
        studentName: "Maryam Sani",
        className: "SS1",
        amountPaid: "NGN 120,000",
        paidOn: "2026-04-14",
        reference: "PAY-TUI-00135",
        status: "Paid",
      },
    ],
  },
  {
    id: "transport",
    name: "Transport",
    description:
      "Covers student transport operations and route maintenance for school bus service.",
    amount: "NGN 35,000",
    frequency: "Monthly",
    dueDate: "2026-05-05",
    targetStudents: 96,
    paidStudents: 79,
    totalExpected: "NGN 3,360,000",
    totalCollected: "NGN 2,765,000",
    paymentHistory: [
      {
        studentName: "Ibrahim Lawal",
        className: "JSS2",
        amountPaid: "NGN 35,000",
        paidOn: "2026-04-08",
        reference: "PAY-TRN-00082",
        status: "Paid",
      },
      {
        studentName: "Chioma Eze",
        className: "JSS1",
        amountPaid: "NGN 35,000",
        paidOn: "2026-04-09",
        reference: "PAY-TRN-00091",
        status: "Paid",
      },
    ],
  },
  {
    id: "books",
    name: "Books",
    description:
      "Covers curriculum-approved textbooks, practical materials, and printing resources.",
    amount: "NGN 25,000",
    frequency: "Termly",
    dueDate: "2026-05-15",
    targetStudents: 180,
    paidStudents: 131,
    totalExpected: "NGN 4,500,000",
    totalCollected: "NGN 3,275,000",
    paymentHistory: [
      {
        studentName: "Samuel Musa",
        className: "SS3",
        amountPaid: "NGN 25,000",
        paidOn: "2026-04-11",
        reference: "PAY-BKS-00101",
        status: "Paid",
      },
      {
        studentName: "Hadiza Aliyu",
        className: "JSS2",
        amountPaid: "NGN 25,000",
        paidOn: "2026-04-13",
        reference: "PAY-BKS-00108",
        status: "Paid",
      },
    ],
  },
  {
    id: "pta",
    name: "PTA",
    description:
      "Parent Teacher Association contribution for joint school-family programs and events.",
    amount: "NGN 15,000",
    frequency: "Termly",
    dueDate: "2026-05-20",
    targetStudents: 180,
    paidStudents: 153,
    totalExpected: "NGN 2,700,000",
    totalCollected: "NGN 2,295,000",
    paymentHistory: [
      {
        studentName: "Ruth Peter",
        className: "SS1",
        amountPaid: "NGN 15,000",
        paidOn: "2026-04-03",
        reference: "PAY-PTA-00067",
        status: "Paid",
      },
      {
        studentName: "Yusuf Garba",
        className: "JSS3",
        amountPaid: "NGN 15,000",
        paidOn: "2026-04-07",
        reference: "PAY-PTA-00079",
        status: "Paid",
      },
    ],
  },
];

export default function FeeDetailsPage() {
  const params = useParams();
  const feeId = (params?.id as string) || "";

  const fee = useMemo(
    () => feeDetails.find((item) => item.id === feeId),
    [feeId],
  );

  if (!fee) {
    return (
      <section className="space-y-5 py-4">
        <Card className="border border-default-200/70 bg-background/85">
          <CardBody className="space-y-3 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
              Fees
            </p>
            <h2 className="text-2xl font-semibold">Fee Not Found</h2>
            <p className="text-sm text-foreground/70">
              The selected fee does not exist. Please return to the fee
              management page.
            </p>
            <div>
              <Button as={NextLink} href="/school/fees" variant="flat">
                Back to Fees
              </Button>
            </div>
          </CardBody>
        </Card>
      </section>
    );
  }

  const completion = Math.round((fee.paidStudents / fee.targetStudents) * 100);

  return (
    <section className="space-y-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
            Fee Detail
          </p>
          <h2 className="text-2xl font-semibold">{fee.name}</h2>
          <p className="text-sm text-foreground/70">{fee.description}</p>
        </div>
        <Button
          as={NextLink}
          href="/school/fees"
          startContent={<ArrowLeft className="h-4 w-4" />}
          variant="flat"
        >
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border border-default-200/70 bg-background/85">
          <CardBody className="p-5">
            <p className="text-xs text-foreground/60">Fee Amount</p>
            <div className="mt-2 flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-emerald-600" />
              <p className="text-xl font-semibold">{fee.amount}</p>
            </div>
            <p className="mt-2 text-sm text-foreground/70">
              Frequency: {fee.frequency}
            </p>
            <p className="text-sm text-foreground/70">
              Due Date: {fee.dueDate}
            </p>
          </CardBody>
        </Card>

        <Card className="border border-default-200/70 bg-background/85">
          <CardBody className="p-5">
            <p className="text-xs text-foreground/60">Collection</p>
            <p className="mt-2 text-xl font-semibold">{fee.totalCollected}</p>
            <p className="text-sm text-foreground/70">
              Expected: {fee.totalExpected}
            </p>
            <div className="mt-3">
              <Progress
                aria-label="Collection completion"
                size="sm"
                value={completion}
              />
              <p className="mt-1 text-xs text-foreground/60">
                {completion}% collected
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-default-200/70 bg-background/85">
          <CardBody className="p-5">
            <p className="text-xs text-foreground/60">Paid Students</p>
            <div className="mt-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-600" />
              <p className="text-xl font-semibold">
                {fee.paidStudents} / {fee.targetStudents}
              </p>
            </div>
            <p className="mt-2 text-sm text-foreground/70">
              Students who have completed this fee payment.
            </p>
          </CardBody>
        </Card>
      </div>

      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="flex items-center justify-between px-6 pt-6 pb-3">
          <div>
            <p className="text-lg font-semibold">Payment History</p>
            <p className="text-sm text-foreground/70">
              Students who have paid {fee.name}
            </p>
          </div>
          <Chip color="success" size="sm" variant="flat">
            {fee.paymentHistory.length} records
          </Chip>
        </CardHeader>
        <CardBody className="grid gap-3 px-6 pb-6">
          {fee.paymentHistory.map((record) => (
            <div
              key={record.reference}
              className="rounded-2xl border border-default-200/70 bg-default-50/35 p-4 dark:border-white/10 dark:bg-slate-900/35"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{record.studentName}</p>
                  <p className="text-xs text-foreground/60">
                    {record.className}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-700">
                    {record.amountPaid}
                  </p>
                  <p className="text-xs text-foreground/60">{record.paidOn}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-foreground/60">
                  Reference: {record.reference}
                </p>
                <Chip
                  color={record.status === "Paid" ? "success" : "warning"}
                  size="sm"
                  variant="flat"
                >
                  {record.status}
                </Chip>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </section>
  );
}
