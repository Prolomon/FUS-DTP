"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { Button } from "@heroui/button";
import { UploadCloud } from "lucide-react";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@heroui/modal";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { addToast } from "@heroui/toast";

const driveFiles = [
  { id: "1", name: "Admission Policy 2026.pdf", owner: "Admin", category: "Policy", updated: "Today" },
  { id: "2", name: "Term 1 Exam Timetable.xlsx", owner: "Exam Office", category: "Academic", updated: "Yesterday" },
  { id: "3", name: "Staff Handbook.docx", owner: "HR", category: "Staff", updated: "2 days ago" },
  { id: "4", name: "Fee Circular.pdf", owner: "Bursary", category: "Finance", updated: "3 days ago" },
];

export default function DrivePage() {

  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState<any>(null);

  const handleUpload = () => {
    try {
      if (file) {
        addToast({
          title: "File uploaded successfully.",
          description: "Your file has been uploaded successfully.",
          variant: "solid",
          color: "success",
          closeIcon: true,
        });
      } else {
        addToast({
          title: "Please select a file to upload.",
          description: "A file must be selected before uploading.",
          variant: "bordered",
          color: "warning",
          timeout: 1000,
          closeIcon: true,
        });
      }
    } catch (error) {
      addToast({
        title: "Error: Failed to upload file.",
        description: "An error occurred while uploading the file.",
        variant: "bordered",
        color: "danger",
        timeout: 1000,
        closeIcon: true,
      });
    } finally {
      setFile(null);
      setShowUpload(false);
    }
  }

  return (
    <section className="space-y-5 py-4">
      <Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
        <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Document Hub</p>
            <h2 className="text-2xl font-semibold">School Drive</h2>
          </div>
          <Button className="bg-emerald-600 text-white" radius="full" onPress={() => setShowUpload(true)}>Upload File</Button>
        </CardHeader>
        <CardBody className="grid gap-3 px-6 pb-6">
          {driveFiles.map((file) => (
            <div
              key={file.id}
              className="rounded-2xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40 hover:bg-emerald-50/60 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-emerald-700" />
                  <Link href={`/school/drive/${file.id}`} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 focus:outline-none">
                    {file.name}
                  </Link>
                </div>
                <Chip className="border-0" color="primary" size="sm" variant="flat">{file.category}</Chip>
              </div>
              <p className="mt-1 text-sm text-foreground/70">Owner: {file.owner}</p>
              <p className="mt-1 text-xs text-foreground/60">Updated: {file.updated}</p>
            </div>
          ))}
        </CardBody>
      </Card>
      <Modal isOpen={showUpload} onClose={() => setShowUpload(false)} size="2xl">
        <ModalContent>
          <ModalHeader>Upload File</ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-center justify-center gap-4 h-[20rem]">
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-emerald-300 rounded-xl cursor-pointer bg-emerald-50/40 hover:bg-emerald-100/60 transition-colors h-full">
                <UploadCloud className="w-10 h-10 text-emerald-500 mb-2" />
                <span className="text-base font-medium text-emerald-700">Click to upload or drag & drop</span>
                <span className="text-xs text-emerald-400 mt-1">PDF, DOCX, XLSX, PNG, JPG (max 50MB)</span>
                <input id="file-upload" type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0])} />
              </label>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="bg-emerald-600 text-white" radius="full" onPress={handleUpload}>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
