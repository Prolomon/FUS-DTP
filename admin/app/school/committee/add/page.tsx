"use client";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import React, { useState, useMemo } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Chip } from "@heroui/chip";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Avatar } from "@heroui/avatar";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

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

export default function CommiteePage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [group, setGroup] = useState<Set<string>>(new Set(["staff"]));
    const [members, setMembers] = useState<Set<string>>(new Set());
    const [lead, setLead] = useState("");
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

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
        arrayMembers.length ? (
            <ScrollShadow hideScrollBar className="w-full flex py-0.5 px-2 gap-1" orientation="horizontal">
                {arrayMembers.map((value) => (
                    <Chip key={String(value)}>{users.find((user) => `${user.id}` === `${value}`)?.name}</Chip>
                ))}
            </ScrollShadow>
        ) : null,
        [arrayMembers.length]
    );

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise((res) => setTimeout(res, 1000));

            console.log("Creating committee with data:", {
                name,
                group,
                members: arrayMembers,
                lead,
            });
            addToast({ title: "Success!", description: "Committee created successfully.", variant: "solid", color: "success", timeout: 2000, closeIcon: true, });
        } catch (e) {
            addToast({ title: "Failed.", description: "An error occurred while creating the committee.", variant: "bordered", color: "danger", timeout: 2000, closeIcon: true, });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="space-y-5 py-4">
            <Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
                <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Create Committee</p>
                        <h2 className="text-2xl font-semibold">Committee Management</h2>
                    </div>
                </CardHeader>
                <CardBody className="grid gap-3 px-6 pb-6">
                    <Input label="Committee Name" value={name} onChange={e => setName(e.target.value)} className="mb-4" />
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
                        className="mb-4"
                        selectionMode="multiple"
                    >
                        {groupOptions.map(opt => (
                            <SelectItem key={opt.key}>{opt.label}</SelectItem>
                        ))}
                    </Select>
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
                        selectionMode="multiple"
                        topContent={topContent}
                        variant="flat"
                        selectedKeys={members}
                        onSelectionChange={keys => {
                            if (keys === "all") {
                                setMembers(new Set(filteredUsers.map(u => String(u.id))));
                            } else {
                                setMembers(new Set(Array.from(keys).map(String)));
                            }
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
                    <Select label="Team Lead" selectedKeys={[lead]} onSelectionChange={keys => setLead(String(Array.from(keys)[0]))} className="mt-4">
                        {arrayMembers.map(id => {
                            const user = users.find(u => String(u.id) === id);
                            return user ? <SelectItem key={user.id}>{user.name}</SelectItem> : null;
                        })}
                    </Select>
                </CardBody>
                <CardFooter className="px-6 pb-6 justify-between">
                    <Button variant="bordered" radius="full" size="lg" onPress={() => router.push("/school/committee")}>
                        Cancel
                    </Button>
                    <Button className="bg-emerald-600 text-white" radius="full" size="lg" isLoading={loading} onPress={handleSubmit}>
                        Create Committee
                    </Button>
                </CardFooter>
            </Card>
        </section>
    );
}
