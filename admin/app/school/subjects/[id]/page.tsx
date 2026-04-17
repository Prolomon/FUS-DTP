"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { addToast } from "@heroui/toast";

const classOptions = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];
const statusOptions = ["Active", "Inactive"];

export default function SubjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    teacher: "",
    classes: "JSS1",
    creditHours: "",
    status: "Active",
    description: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormData({
        subjectName: "Mathematics",
        subjectCode: "MTH-101",
        teacher: "Mrs. Amina",
        classes: "JSS1",
        creditHours: "3",
        status: "Active",
        description: "Core numeracy subject for junior and senior classes.",
      });
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [subjectId]);

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = () => {
    addToast({ title: "Updated", description: "Subject updated successfully.", color: "success", closeIcon: true });
    setEditMode(false);
  };

  const handleDelete = () => {
    addToast({ title: "Deleted", description: "Subject deleted successfully.", color: "success", closeIcon: true });
    setShowDelete(false);
    router.back();
  };

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center py-8">
        <div className="text-lg text-emerald-600">Loading subject data...</div>
      </section>
    );
  }

  return (
    <section className="space-y-5 py-4">
      <Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20 shadow-lg">
        <CardHeader className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Academic Office</p>
            <h2 className="text-2xl font-semibold">Subject Profile</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {!editMode ? (
              <Button className="bg-emerald-600 text-white" radius="full" onPress={() => setEditMode(true)}>Edit Subject</Button>
            ) : (
              <Button className="bg-emerald-600 text-white" radius="full" onPress={handleUpdate}>Save Changes</Button>
            )}
            <Button color="danger" variant="flat" radius="full" onPress={() => setShowDelete(true)}>Delete</Button>
          </div>
        </CardHeader>

        <CardBody className="px-6 pb-2 space-y-6">
          <Card className="border border-emerald-100/70 bg-white/95 dark:border-emerald-300/20">
            <CardBody className="grid gap-3 px-6 py-6 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Subject Name</p>
                <p className="mt-1 text-lg font-semibold">{formData.subjectName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Teacher</p>
                <p className="mt-1 text-lg font-semibold">{formData.teacher}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">Status</p>
                <Chip className="mt-1 border-0" color="success" variant="flat">{formData.status}</Chip>
              </div>
            </CardBody>
          </Card>

          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Subject Name" value={formData.subjectName} onChange={(e) => handleChange("subjectName", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
            <Input label="Subject Code" value={formData.subjectCode} onChange={(e) => handleChange("subjectCode", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
            <Input label="Teacher" value={formData.teacher} onChange={(e) => handleChange("teacher", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
            <Select label="Class" selectedKeys={[formData.classes]} onSelectionChange={(keys) => handleChange("classes", Array.from(keys)[0] as string)} isDisabled={!editMode} size="lg" variant="bordered" labelPlacement="outside">
              {classOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
            </Select>
            <Input label="Credit Hours" type="number" value={formData.creditHours} onChange={(e) => handleChange("creditHours", e.target.value)} readOnly={!editMode} size="lg" variant="bordered" labelPlacement="outside" />
            <Select label="Status" selectedKeys={[formData.status]} onSelectionChange={(keys) => handleChange("status", Array.from(keys)[0] as string)} isDisabled={!editMode} size="lg" variant="bordered" labelPlacement="outside">
              {statusOptions.map((item) => <SelectItem key={item}>{item}</SelectItem>)}
            </Select>
            <Textarea className="md:col-span-2" label="Description" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} readOnly={!editMode} minRows={4} variant="bordered" labelPlacement="outside" />
          </form>
        </CardBody>

        <CardFooter className="flex flex-col gap-3 px-6 pb-6 md:flex-row">
          {editMode && (
            <>
              <Button className="w-full bg-emerald-600 text-white" radius="full" onPress={handleUpdate}>Save Changes</Button>
              <Button className="w-full border-emerald-600 text-emerald-700" variant="bordered" radius="full" onPress={() => setEditMode(false)}>Cancel Edit</Button>
            </>
          )}
        </CardFooter>
      </Card>

      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} size="2xl">
        <ModalContent>
          <ModalHeader>Delete Subject</ModalHeader>
          <ModalBody>
            <p>This action will permanently remove this subject record. This cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" radius="full" onPress={() => setShowDelete(false)}>Cancel</Button>
            <Button color="danger" radius="full" onPress={handleDelete}>Yes, Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
