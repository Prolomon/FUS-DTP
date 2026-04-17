"use client";
import { useState, useMemo } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Search } from "lucide-react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import Link from "next/link";

const classes = [
  { id: 1, name: "JSS 1 Gold", students: 36, teacher: "Mrs. A. Yusuf", completion: 88 },
  { id: 2, name: "JSS 2 Ruby", students: 34, teacher: "Mr. D. Ibrahim", completion: 82 },
  { id: 3, name: "SS 1 Emerald", students: 32, teacher: "Mrs. K. Ade", completion: 91 },
  { id: 4, name: "SS 3 Platinum", students: 29, teacher: "Mr. T. Okafor", completion: 95 },
];

const users = [
  { id: 1, name: "Tony Reichert", email: "tony.reichert@example.com", avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png" },
  { id: 2, name: "Zoey Lang", email: "zoey.lang@example.com", avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png" },
  { id: 3, name: "Jane Fisher", email: "jane.fisher@example.com", avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png" },
  { id: 4, name: "William Howard", email: "william.howard@example.com", avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png" },
  { id: 5, name: "Kristen Copper", email: "kristen.cooper@example.com", avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png" },
  // ...add more as needed
];

export default function ClassesPage() {
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<Set<number>>(new Set());

  const arrayMembers = Array.from(members);
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const s = search.trim().toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s)
    );
  }, [search]);

  const topContent = useMemo(() =>
    arrayMembers ? (
      <ScrollShadow hideScrollBar className="w-full flex py-0.5 px-2 gap-1" orientation="horizontal">
        {arrayMembers.map((value) => (
          <Chip key={String(value)}>{users.find((user) => `${user.id}` === `${value}`)?.name}</Chip>
        ))}
      </ScrollShadow>
    ) : null,
    [arrayMembers]
  );

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    class: "JSS 1",
    tag: "",
    teacher: "",
  });

  return (
    <section className="space-y-5 py-4">
      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="px-6 pt-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Academic Structure</p>
            <h2 className="text-2xl font-semibold">Classrooms</h2>
          </div>
          <Button color="primary" className="bg-emerald-600 text-white" radius="full" onPress={() => setShowModal(true)}>
            Add Class
          </Button>
        </CardHeader>
        <CardBody className="grid gap-3 px-6 pb-6">
          {classes.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-default-200/70 bg-default-50/35 p-4 dark:border-white/10 dark:bg-slate-900/35"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link href={`/school/classes/${item.id}`} className="text-sm font-semibold">
                  {item.name}
                </Link>
                <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">{item.students} Students</p>
              </div>
              <p className="mt-1 text-sm text-foreground/70">Class Teacher: {item.teacher}</p>
              <div className="mt-3">
                <Progress aria-label={`${item.name} curriculum completion`} size="sm" value={item.completion} />
                <p className="mt-1 text-xs text-foreground/60">Curriculum completion: {item.completion}%</p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <Modal isOpen={showModal} onOpenChange={setShowModal} placement="center" size="2xl">
        <ModalContent>
          <ModalHeader>Add New Class</ModalHeader>
          <ModalBody>
            <Select
              label="Class"
              selectedKeys={[form.class]}
              onSelectionChange={keys => setForm(f => ({ ...f, class: Array.from(keys)[0] as string }))}
              className="mb-3"
            >
              <SelectItem key="JSS 1">JSS 1</SelectItem>
              <SelectItem key="JSS 2">JSS 2</SelectItem>
              <SelectItem key="JSS 3">JSS 3</SelectItem>
            </Select>
            <Input
              label="Tag"
              value={form.tag}
              onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
              className="mb-3"
            />
            <Input
              label="Search Members"
              className="mb-2"
              startContent={<Search className="text-muted-foreground" />}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Listbox
              classNames={{ base: "max-w-full", list: "max-h-[200px] overflow-y-scroll" }}
              items={filteredUsers}
              label="Members"
              selectionMode="single"
              topContent={topContent}
              variant="flat"
              selectedKeys={members}
              onSelectionChange={keys => {
                setMembers(new Set(Array.from(keys).map(Number)));
                console.log("Selected member IDs:", Array.from(keys).map(Number));
                console.log(members)
              }}
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
            <Button variant="light" onPress={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={() => setShowModal(false)}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
