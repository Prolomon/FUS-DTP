"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";

const classOptions = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
const statusOptions = ["Active", "Inactive"];

export default function AddSubjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    teacher: "",
    classes: "JSS1",
    creditHours: "",
    status: "Active",
    description: "",
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!formData.subjectName || !formData.subjectCode || !formData.teacher) {
      addToast({
        title: "Missing fields",
        description: "Subject name, code, and teacher are required.",
        color: "warning",
        closeIcon: true,
      });
      return;
    }

    addToast({
      title: "Success",
      description: "Subject added successfully.",
      color: "success",
      closeIcon: true,
    });
  };

  const handleClear = () => {
    setFormData({
      subjectName: "",
      subjectCode: "",
      teacher: "",
      classes: "JSS1",
      creditHours: "",
      status: "Active",
      description: "",
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-8">
      <Card className="w-full border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
        <CardHeader className="px-6 pt-6 pb-2">
          <h2 className="text-xl font-semibold">Add Subject</h2>
        </CardHeader>
        <CardBody className="grid grid-cols-1 gap-4 px-6 pb-2 md:grid-cols-2">
          <Input label="Subject Name" value={formData.subjectName} onChange={(e) => handleChange("subjectName", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
          <Input label="Subject Code" value={formData.subjectCode} onChange={(e) => handleChange("subjectCode", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
          <Input label="Teacher" value={formData.teacher} onChange={(e) => handleChange("teacher", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
          <Select label="Class" selectedKeys={[formData.classes]} onSelectionChange={(keys) => handleChange("classes", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
            {classOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
          </Select>
          <Input label="Credit Hours" type="number" value={formData.creditHours} onChange={(e) => handleChange("creditHours", e.target.value)} size="lg" variant="bordered" labelPlacement="outside" />
          <Select label="Status" selectedKeys={[formData.status]} onSelectionChange={(keys) => handleChange("status", Array.from(keys)[0] as string)} size="lg" variant="bordered" labelPlacement="outside">
            {statusOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
          </Select>
          <Textarea className="md:col-span-2" label="Description" placeholder="Subject description" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} minRows={4} variant="bordered" labelPlacement="outside" />
        </CardBody>
        <CardFooter className="flex flex-col gap-3 px-6 pb-6 md:flex-row">
          <Button className="w-full border-emerald-600 text-emerald-700" variant="bordered" radius="full" size="lg" onPress={handleClear}>Clear</Button>
          <Button className="w-full bg-emerald-600 text-white" radius="full" size="lg" onPress={handleSubmit}>Add Subject</Button>
          <Button className="w-full border-emerald-600 text-emerald-700" variant="bordered" radius="full" size="lg" onPress={handleCancel}>Cancel</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
