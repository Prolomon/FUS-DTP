import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";

const expenses = [
  { item: "Laboratory Supplies", department: "Science", amount: "NGN 420,000", status: "Approved" },
  { item: "Bus Maintenance", department: "Transport", amount: "NGN 180,000", status: "Pending" },
  { item: "Library Books", department: "Academics", amount: "NGN 250,000", status: "Approved" },
  { item: "Sports Equipment", department: "PE", amount: "NGN 130,000", status: "Pending" },
];

export default function ExpensesPage() {
  return (
    <section className="space-y-5 py-4">
      <Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
        <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Finance</p>
            <h2 className="text-2xl font-semibold">Expenses</h2>
          </div>
          <Button className="bg-emerald-600 text-white" radius="full">Log Expense</Button>
        </CardHeader>
        <CardBody className="grid gap-3 px-6 pb-6">
          {expenses.map((expense) => (
            <div key={`${expense.item}-${expense.department}`} className="rounded-2xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{expense.item}</p>
                <Chip className="border-0" color={expense.status === "Approved" ? "primary" : "default"} size="sm" variant="flat">
                  {expense.status}
                </Chip>
              </div>
              <p className="mt-1 text-sm text-foreground/70">Department: {expense.department}</p>
              <p className="mt-1 text-xs text-foreground/60">Amount: {expense.amount}</p>
            </div>
          ))}
        </CardBody>
      </Card>
    </section>
  );
}
