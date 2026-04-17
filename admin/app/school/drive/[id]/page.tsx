"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Input, Textarea } from "@heroui/input";
import { InputOtp } from "@heroui/input-otp";
import { Switch } from "@heroui/switch";
import { Eye, EyeOff } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { addToast } from "@heroui/toast";
// import { Listbox, ListboxItem, Chip, ScrollShadow, Avatar } from "@heroui/react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Chip } from "@heroui/chip";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Avatar } from "@heroui/avatar";
// Example users for recipient selection
const users = [
  {
    id: 1,
    name: "Tony Reichert",
    email: "tony.reichert@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
  },
  {
    id: 2,
    name: "Zoey Lang",
    email: "zoey.lang@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
  },
  {
    id: 3,
    name: "Jane Fisher",
    email: "jane.fisher@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
  },
  {
    id: 4,
    name: "William Howard",
    email: "william.howard@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 5,
    name: "Kristen Copper",
    email: "kristen.cooper@example.com",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
  },
];

const filePreview = {
  name: "Admission Policy 2026.pdf",
  url: "/files/admission-policy-2026.pdf",
  type: "pdf",
  size: "1.2MB",
  owner: "Admin",
  updated: "Today",
};

const audienceOptions = [
  { key: "staff", label: "Staff" },
  { key: "students", label: "Students" },
  { key: "parents", label: "Parents" },
];

export default function DriveFilePage() {
  const [audience, setAudience] = useState<any>(new Set(["staff"]));
  const [sendModal, setSendModal] = useState(false);
  const [actionModal, setActionModal] = useState<{ type: "update" | "delete" | null }>({ type: null });
  const [actionComment, setActionComment] = useState("");
  const [actionPin, setActionPin] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<any>(new Set(["1"]));
  const [permissions, setPermissions] = useState({ edit: false, read: false, delete: false, secure: false });
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const arrayValues = Array.from(selectedRecipients);
  const topContent = arrayValues.length ? (
    <ScrollShadow hideScrollBar className="w-full flex py-0.5 px-2 gap-1" orientation="horizontal">
      {arrayValues.map((value: any) => (
        <Chip key={value}>{users.find((user) => `${user.id}` === `${value}`)?.name}</Chip>
      ))}
    </ScrollShadow>
  ) : null;

  const handleAction = async () => {
    setActionLoading(true);

    try {
      await new Promise(res => setTimeout(res, 1000));
      addToast({
        title: "Success!", description: "Action completed successfully.", variant: "solid", color: actionModal.type === "delete" ? "danger" : "success", timeout: 1000,
        closeIcon: true,
      });
    } catch (error) {
      addToast({
        title: "Error!", description: "An error occurred while performing the action.", variant: "bordered", color: "danger", timeout: 1000,
        closeIcon: true,
      });
    } finally {
      setActionLoading(false);
      setActionModal({ type: null });
      setActionComment("");
      setActionPin("");
    }

  }

  return (
    <section className="space-y-5 py-4">
      <Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
        <CardHeader className="flex flex-wrap items-start justify-between gap-3 px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">File Preview</p>
            <h2 className="text-2xl font-semibold">{filePreview.name}</h2>
          </div>
          <Select
            label="Available to"
            labelPlacement="outside"
            selectedKeys={audience}
            onSelectionChange={keys => setAudience(new Set(keys))}
            size="md"
            className="min-w-[160px]"
            selectionMode="multiple"
          >
            {audienceOptions.map(opt => (
              <SelectItem key={opt.key}>{opt.label}</SelectItem>
            ))}
          </Select>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            {/* Permissions using HeroUI Switches */}
            <div className="flex flex-row flex-wrap gap-6 mt-2 items-center w-full sm:w-auto">
              <Switch
                isSelected={permissions.edit}
                onValueChange={val => setPermissions(p => ({ ...p, edit: val }))}
                color="primary"
                size="sm"
              >
                Edit
              </Switch>
              <Switch
                isSelected={permissions.read}
                onValueChange={val => setPermissions(p => ({ ...p, read: val }))}
                color="primary"
                size="sm"
              >
                Read
              </Switch>
              <Switch
                isSelected={permissions.delete}
                onValueChange={val => setPermissions(p => ({ ...p, delete: val }))}
                color="primary"
                size="sm"
              >
                Delete
              </Switch>
              <Switch
                isSelected={permissions.secure}
                onValueChange={val => setPermissions(p => ({ ...p, secure: val }))}
                color="danger"
                size="sm"
              >
                Secure
              </Switch>
            </div>
            {permissions.secure && (
              <div className="w-full sm:w-auto flex-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  endContent={
                    showPassword ? (
                      <EyeOff className="cursor-pointer text-xl text-default-400" onClick={() => setShowPassword(false)} />
                    ) : (
                      <Eye className="cursor-pointer text-xl text-default-400" onClick={() => setShowPassword(true)} />
                    )
                  }
                  placeholder="Enter password"
                  required
                  className="w-full"
                  variant="bordered"
                  color="primary"
                />
              </div>
            )}
          </div>
        </CardHeader>
        <CardBody className="grid gap-4 px-6 pb-6">
          <div className="rounded-xl border border-emerald-100/70 bg-white p-6 dark:border-emerald-300/20 dark:bg-slate-900/40 min-h-[200px] flex items-center justify-center">
            <span className="text-emerald-600 font-medium">PDF Preview Here</span>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              variant="bordered"
              color="primary"
              onPress={() => setActionModal({ type: "update" })}
            >
              Update
            </Button>
            <Button
              variant="bordered"
              color="danger"
              onPress={() => setActionModal({ type: "delete" })}
            >
              Delete
            </Button>
            <Button className="bg-emerald-600 text-white" radius="full" onPress={() => setSendModal(true)}>Send</Button>
          </div>
          {/* Action Modal for Update/Delete */}
          <Modal isOpen={!!actionModal.type} onClose={() => setActionModal({ type: null })} size="2xl">
            <ModalContent>
              <ModalHeader>{actionModal.type === "update" ? "Update File" : "Delete File"}</ModalHeader>
              <ModalBody>
                <Textarea
                  label="Comment"
                  placeholder="Enter your comment"
                  value={actionComment}
                  onChange={e => setActionComment(e.target.value)}
                  className="mb-4"
                  minRows={2}
                  size="lg"
                  variant="bordered"
                  color="primary"
                />
                <InputOtp
                  label="8-digit PIN"
                  value={actionPin}
                  onValueChange={setActionPin}
                  length={8}
                  inputMode="numeric"
                  className="mb-2 mx-auto"
                  size="lg"
                  variant="bordered"
                  color="primary"
                />
                <p className="text-base text-center text-gray-600">Enter the 8-digit PIN to proceed.</p>
                <p className="text-base text-center text-gray-600">The Comment field is required and must be at least 5 characters long.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={() => setActionModal({ type: null })}>Cancel</Button>
                <Button
                  className="bg-emerald-600 text-white"
                  radius="full"
                  isLoading={actionLoading}
                  onPress={handleAction}
                  disabled={actionPin.length !== 8 && actionComment.length < 5}
                >
                  Continue
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </CardBody>
      </Card>
      <Modal isOpen={sendModal} onClose={() => setSendModal(false)} size="2xl">
        <ModalContent>
          <ModalHeader>Send File</ModalHeader>
          <ModalBody>
            <Select
              label="Select Audience"
              labelPlacement="outside"
              selectedKeys={audience}
              onSelectionChange={setAudience}
              size="md"
              className="mb-4 min-w-[160px]"
              selectionMode="multiple"
            >
              {audienceOptions.map(opt => (
                <SelectItem key={opt.key}>{opt.label}</SelectItem>
              ))}
            </Select>
            {/* Recipient List using HeroUI Listbox */}
            <div className="mb-4">
              <Listbox
                classNames={{
                  base: "max-w-full",
                  list: "max-h-[200px] overflow-y-scroll",
                }}
                items={users}
                label="Recipients"
                selectionMode="multiple"
                topContent={topContent}
                variant="flat"
                selectedKeys={selectedRecipients}
                onSelectionChange={keys => setSelectedRecipients(new Set(keys))}
              >
                {(item: any) => (
                  <ListboxItem key={item.id} textValue={item.name}>
                    <div className="flex gap-2 items-center">
                      <Avatar alt={item.name} className="shrink-0" size="sm" src={item.avatar} />
                      <div className="flex flex-col">
                        <span className="text-small">{item.name}</span>
                        <span className="text-tiny text-default-400">{item.email}</span>
                      </div>
                    </div>
                  </ListboxItem>
                )}
              </Listbox>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={() => setSendModal(false)}>Cancel</Button>
            <Button className="bg-emerald-600 text-white" radius="full" onPress={() => setSendModal(false)}>Send</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
