"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Chip } from "@heroui/chip";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Avatar } from "@heroui/avatar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { addToast } from "@heroui/toast";
import { InputOtp } from "@heroui/input-otp";

const users = [
  { id: 1, name: "Tony Reichert", email: "tony.reichert@example.com", avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png" },
  { id: 2, name: "Zoey Lang", email: "zoey.lang@example.com", avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png" },
  { id: 3, name: "Jane Fisher", email: "jane.fisher@example.com", avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png" },
  { id: 4, name: "William Howard", email: "william.howard@example.com", avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png" },
  { id: 5, name: "Kristen Copper", email: "kristen.cooper@example.com", avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png" },
  // ...add more as needed
];

const groupOptions = [
  { key: "staff", label: "Staff" },
  { key: "parent", label: "Parent" },
];

export default function CommitteeDetailPage() {
  const [editMode, setEditMode] = useState(false);
  const [committeeName, setCommitteeName] = useState("Academic Committee");
  const [group, setGroup] = useState<Set<string>>(new Set(["staff"]));
  const [members, setMembers] = useState<Set<string>>(new Set(["1", "2", "3"]));
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [actionType, setActionType] = useState<null | { userId: string; action: "delete" | "lead" }>(null);
  const [comment, setComment] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const arrayMembers = Array.from(members);
  const groupArray = Array.from(group);

  const topContent = useMemo(() =>
    arrayMembers.length ? (
      <ScrollShadow hideScrollBar className="w-full flex py-0.5 px-2 gap-1" orientation="horizontal">
        {arrayMembers.map((value) => (
          <Chip key={value}>{users.find((user) => `${user.id}` === `${value}`)?.name}</Chip>
        ))}
      </ScrollShadow>
    ) : null,
    [arrayMembers.length]
  );

  const handleAction = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      addToast({ title: "Successful!", description: "Action completed successfully.", variant: "solid", color: "success", timeout: 2000, closeIcon: true });
      setActionModal(false);
      setComment("");
      setPin("");
    } catch (e) {
      addToast({ title: "Failed!", description: "An error occurred while performing the action.", variant: "bordered", color: "danger", timeout: 2000, closeIcon: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-5 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Button variant="bordered" onPress={() => setEditMode((v) => !v)}>{editMode ? "Save" : "Edit"}</Button>
          <Button className="bg-emerald-600 text-white" radius="full" onPress={() => setAddMemberModal(true)}>
            Add Member
          </Button>
        </div>
      </div>
      {/* Committee Name input moved to Add Member modal */}
      <Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
        <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
          <h2 className="text-xl font-semibold">Members</h2>
        </CardHeader>
        <CardBody className="grid gap-3 px-6 pb-6">
          <Input
            label="Committee Name"
            value={committeeName}
            onChange={e => setCommitteeName(e.target.value)}
            className="mb-4"
            disabled={!editMode}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {arrayMembers.map(id => {
              const user = users.find(u => String(u.id) === id);
              if (!user) return null;
              return (
                <Card key={user.id} className="flex items-center gap-4 p-4 border border-default-200 dark:border-default-100 flex-row">
                  <Avatar src={user.avatar} alt={user.name} size="lg" />
                  <div className="flex-1">
                    <div className="font-semibold inline-flex items-center gap-2">
                      <span>{user.name}</span>
                      <Chip color={groupArray.includes("parent") ? "warning" : "success"} className="mt-1" size="sm">
                        {groupArray.includes("parent") ? "Parent" : "Staff"}
                      </Chip>
                    </div>
                    <div className="text-sm text-default-500">{user.email}</div>
                  </div>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="solid" color="primary">More</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Actions">
                      <DropdownItem key="lead" onClick={() => { setActionType({ userId: id, action: "lead" }); setActionModal(true); }}>Make Lead</DropdownItem>
                      <DropdownItem key="delete" color="danger" onClick={() => { setActionType({ userId: id, action: "delete" }); setActionModal(true); }}>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                </Card>
              );
            })}
          </div>
        </CardBody>
      </Card>
      {/* Add Member Modal */}
      <Modal isOpen={addMemberModal} onClose={() => setAddMemberModal(false)} size="md">
        <ModalContent>
          <ModalHeader>Add Members</ModalHeader>
          <ModalBody>
            <Select
              label="Committee Group"
              selectedKeys={group}
              onSelectionChange={keys => {
                if (keys === "all") {
                  setGroup(new Set(groupOptions.map(opt => String(opt.key))));
                } else {
                  setGroup(new Set(Array.from(keys).map(String)));
                }
              }}
              className="w-full mb-4"
              selectionMode="multiple"
            >
              {groupOptions.map(opt => (
                <SelectItem key={opt.key}>{opt.label}</SelectItem>
              ))}
            </Select>
            <Listbox
              classNames={{ base: "max-w-full", list: "max-h-[300px] overflow-scroll" }}
              items={users.filter(user => !arrayMembers.includes(String(user.id)))}
              label="Assign Members"
              selectionMode="multiple"
              selectedKeys={members}
              onSelectionChange={keys => {
                if (keys === "all") {
                  setMembers(new Set(users.filter(user => !arrayMembers.includes(String(user.id))).map(u => String(u.id))));
                } else {
                  setMembers(new Set(Array.from(keys).map(String)));
                }
              }}
              topContent={topContent}
              variant="flat"
            >
              {(item) => (
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
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onPress={() => setAddMemberModal(false)}>Cancel</Button>
            <Button className="bg-emerald-600 text-white" radius="full" onPress={() => setAddMemberModal(false)}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Action Modal */}
      <Modal isOpen={actionModal} onClose={() => setActionModal(false)} size="2xl">
        <ModalContent>
          <ModalHeader>{actionType?.action === "lead" ? "Make Admin" : "Delete Member"}</ModalHeader>
          <ModalBody>
            <Textarea
              label="Comment"
              placeholder="Enter your comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="mb-4"
              minRows={2}
              size="lg"
              variant="bordered"
              color="primary"
            />
            <InputOtp
              label="8-digit PIN"
              value={pin}
              onValueChange={setPin}
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
            <Button variant="bordered" onPress={() => {
              setActionModal(false)
              setActionType(null)
              setComment("")
              setPin("")
            }}>Cancel</Button>
            <Button
              className="bg-emerald-600 text-white"
              radius="full"
              isLoading={loading}
              onPress={handleAction}
              disabled={pin.length !== 8 && comment.length < 5}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
