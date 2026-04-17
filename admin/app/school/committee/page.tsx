"use client";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import React, { useState, useMemo } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Chip } from "@heroui/chip";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Avatar } from "@heroui/avatar";
import { addToast } from "@heroui/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const initialCommittees = [
    { id: 1, name: "Academic Committee", lead: "Mrs. Kemi Ade", members: 8, meeting: "Every Monday" },
    { id: 2, name: "Discipline Committee", lead: "Mr. Daniel Ibrahim", members: 6, meeting: "Every Wednesday" },
    { id: 3, name: "Welfare Committee", lead: "Mrs. Sarah John", members: 7, meeting: "Every Friday" },
];

export default function CommiteePage() {
    const router = useRouter();
    const [committees, setCommittees] = useState(initialCommittees);
    const [loading, setLoading] = useState(false);

    return (
        <section className="space-y-5 py-4">
            <Card className="border border-emerald-100/70 bg-white/90 dark:border-emerald-300/20">
                <CardHeader className="flex flex-wrap items-end justify-between gap-3 px-6 pt-6">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Governance</p>
                        <h2 className="text-2xl font-semibold">Committee Management</h2>
                    </div>
                    <Button className="bg-emerald-600 text-white" radius="full" onPress={() => router.push("/school/committee/add")}>
                        Create Committee
                    </Button>
                </CardHeader>
                <CardBody className="grid gap-3 px-6 pb-6">
                    {committees.map((committee) => (
                        <div key={committee.name} className="rounded-2xl border border-emerald-100/70 bg-white p-4 dark:border-emerald-300/20 dark:bg-slate-900/40">
                            <Link href={`/school/committee/${committee.id}`} className="text-sm font-semibold">
                                {committee.name}
                            </Link>
                            <p className="mt-1 text-sm text-foreground/70">Lead: {committee.lead}</p>
                            <p className="mt-1 text-sm text-foreground/70">Members: {committee.members}</p>
                            <p className="mt-1 text-xs text-foreground/60">Meeting: {committee.meeting}</p>
                        </div>
                    ))}
                </CardBody>
            </Card>
        </section>
    );
}
