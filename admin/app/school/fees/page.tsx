"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { addToast } from "@heroui/toast";

const feeSummary = [
  { label: "Tuition", paid: "NGN 15.4M", target: "NGN 18.0M", completion: 86 },
  { label: "Transport", paid: "NGN 4.1M", target: "NGN 5.0M", completion: 82 },
  { label: "Books", paid: "NGN 2.3M", target: "NGN 3.2M", completion: 72 },
  { label: "PTA", paid: "NGN 1.8M", target: "NGN 2.1M", completion: 85 },
];

export default function FeesPage() {
  const [showModal, setShowModal] = useState(false);
  const [feeForm, setFeeForm] = useState({
    feeName: "",
    description: "",
    price: "",
    duration: "",
    paymentFrequency: "Once",
  });

  const handleChange = (key: string, value: string) => {
    setFeeForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!feeForm.feeName || !feeForm.price) {
      addToast({
        title: "Missing Fields",
        description: "Fee name and price are required.",
        color: "warning",
        closeIcon: true,
      });
      return;
    }

    addToast({
      title: "Success",
      description: `Fee "${feeForm.feeName}" has been added successfully.`,
      color: "success",
      closeIcon: true,
    });

    setFeeForm({
      feeName: "",
      description: "",
      price: "",
      duration: "",
      paymentFrequency: "Once",
    });
    setShowModal(false);
  };

  const handleCancel = () => {
    setFeeForm({
      feeName: "",
      description: "",
      price: "",
      duration: "",
      paymentFrequency: "Once",
    });
    setShowModal(false);
  };
  return (
    <section className="space-y-5 py-4">
      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="flex items-center justify-between gap-3 px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Finance Office</p>
            <h2 className="text-2xl font-semibold">Fee Management</h2>
          </div>
          <Button color="primary" radius="full" size="lg" onPress={() => setShowModal(true)}>
            Add New Fee
          </Button>
        </CardHeader>
        <CardBody className="grid gap-3 px-6 pb-6">
          {feeSummary.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-default-200/70 bg-default-50/35 p-4 dark:border-white/10 dark:bg-slate-900/35"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-sm text-foreground/75">{item.paid} / {item.target}</p>
              </div>
              <div className="mt-3">
                <Progress aria-label={`${item.label} payment completion`} size="sm" value={item.completion} />
                <p className="mt-1 text-xs text-foreground/60">Collection completion: {item.completion}%</p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <Modal isOpen={showModal} onClose={handleCancel} size="2xl" hideCloseButton>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add New Fee</ModalHeader>
          <ModalBody className="h-[65vh] overflow-y-scroll">
            <div className="space-y-8">
              <Input
                label="Fee Name"
                placeholder="e.g., Tuition, Books, Transport"
                value={feeForm.feeName}
                onChange={(e) => handleChange("feeName", e.target.value)}
                size="lg"
                variant="bordered"
                labelPlacement="outside"
              />
              <Textarea
                label="Description"
                placeholder="Fee description"
                value={feeForm.description}
                onChange={(e) => handleChange("description", e.target.value)}
                size="lg"
                variant="bordered"
                labelPlacement="outside"
                minRows={3}
              />
              <Input
                label="Price (NGN)"
                placeholder="e.g., 50000"
                value={feeForm.price}
                onChange={(e) => handleChange("price", e.target.value)}
                size="lg"
                variant="bordered"
                labelPlacement="outside"
                type="number"
              />
                <Select
                  label="Payment Frequency"
                  selectedKeys={[feeForm.paymentFrequency]}
                  onSelectionChange={(keys) => handleChange("paymentFrequency", Array.from(keys)[0] as string)}
                size="lg"
                variant="bordered"
                labelPlacement="outside"
              >
                <SelectItem key="Once">Once</SelectItem>
                <SelectItem key="Monthly">Monthly</SelectItem>
                <SelectItem key="Termly">Termly</SelectItem>
                <SelectItem key="Annually">Annually</SelectItem>
              </Select>
              <Input
                label="Duration (in months)"
                placeholder="e.g., 12"
                value={feeForm.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                size="lg"
                variant="bordered"
                labelPlacement="outside"
                type="number"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCancel}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Add Fee
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
