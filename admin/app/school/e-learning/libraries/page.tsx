"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Image } from "@heroui/image";
import { MoreVertical, Download, Share2, Forward, Upload } from "lucide-react";

// Sample shuffled items: 4 books, 5 documents, 3 presentations
const libraryItems = [
  { id: 1, type: "Book", name: "Accounting Basics", image: "https://picsum.photos/200/300?random=1" },
  { id: 2, type: "Document", name: "Financial Report 2025", image: "https://picsum.photos/200/300?random=2" },
  { id: 3, type: "Presentation", name: "Public Finance Slides", image: "https://picsum.photos/200/300?random=3" },
  { id: 4, type: "Book", name: "Business Ethics", image: "https://picsum.photos/200/300?random=4" },
  { id: 5, type: "Document", name: "Audit Guidelines", image: "https://picsum.photos/200/300?random=5" },
  { id: 6, type: "Book", name: "Economics 101", image: "https://picsum.photos/200/300?random=6" },
  { id: 7, type: "Presentation", name: "Accounting Seminar", image: "https://picsum.photos/200/300?random=7" },
  { id: 8, type: "Document", name: "IPSAS Compliance Notes", image: "https://picsum.photos/200/300?random=8" },
  { id: 9, type: "Book", name: "Auditing Principles", image: "https://picsum.photos/200/300?random=9" },
  { id: 10, type: "Document", name: "Budget Planning", image: "https://picsum.photos/200/300?random=10" },
  { id: 11, type: "Presentation", name: "Ethics Workshop", image: "https://picsum.photos/200/300?random=11" },
  { id: 12, type: "Document", name: "Taxation Overview", image: "https://picsum.photos/200/300?random=12" },
];

export default function LibraryPage() {
  return (
    <div className="py-4 space-y-5">
      {/* Header Card */}
      <Card className="shadow-md border border-gray-400 p-2">
        <CardHeader className="flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: "#009966" }}>
            Library
          </h1>
          <Button
            style={{ backgroundColor: "#009966", color: "white" }}
            variant="solid"
            startContent={<Upload className="w-4 h-4" />}
          >
            Upload
          </Button>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-gray-600">
            Browse and manage your educational resources — books, documents, and slides.
          </p>
        </CardBody>
      </Card>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {libraryItems.map((item) => (
          <Card
            key={item.id}
            className="shadow-md border hover:shadow-lg transition border-gray-400"
          >
            <CardBody className="flex justify-center">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md aspect-square"
              />
            </CardBody>
            <CardFooter className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-xs text-gray-500">{item.type}</span>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly variant="light">
                    <MoreVertical className="w-5 h-5" style={{ color: "#009966" }} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Item Actions">
                  <DropdownItem
                    key="download"
                    startContent={<Download className="w-4 h-4" style={{ color: "#009966" }} />}
                  >
                    Download
                  </DropdownItem>
                  <DropdownItem
                    key="forward"
                    startContent={<Forward className="w-4 h-4" style={{ color: "#009966" }} />}
                  >
                    Forward
                  </DropdownItem>
                  <DropdownItem
                    key="share"
                    startContent={<Share2 className="w-4 h-4" style={{ color: "#009966" }} />}
                  >
                    Share
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
