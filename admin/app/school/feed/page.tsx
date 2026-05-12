"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Camera, MapPin, Radio, ShieldCheck } from "lucide-react";

type LiveFeed = {
  id: string;
  title: string;
  provider: string;
  quality: string;
  location: string;
  url: string;
};

const LIVE_FEEDS: LiveFeed[] = [
  {
    id: 'bus',
    title: 'School Bus',
    provider: 'Bus feed',
    quality: 'HD adaptive',
    location: 'Worldwide',
    url: 'https://fus-ditp-server.onrender.com/feed/live/2',
  },
  {
    id: 'assembly',
    title: 'Assembly',
    provider: 'Assembly Feed',
    quality: '720p',
    location: 'City route',
    url: 'https://fus-ditp-server.onrender.com/feed/live/3',
  },
  {
    id: 'class-room',
    title: 'Class Room',
    provider: 'Class Feed',
    quality: 'HD stream',
    location: 'Campus gate',
    url: 'https://fus-ditp-server.onrender.com/feed/live/4',
  },
  {
    id: 'cafeteria',
    title: 'Cafeteria',
    provider: 'Cafeteria Feed',
    quality: 'Low latency',
    location: 'School corridor',
    url: 'https://fus-ditp-server.onrender.com/feed/live/5',
  },
];

export default function FeedPage() {
  const [selectedFeedId, setSelectedFeedId] = useState(LIVE_FEEDS[0]?.id ?? "");

  const selectedFeed = useMemo(
    () =>
      LIVE_FEEDS.find((feed) => feed.id === selectedFeedId) ?? LIVE_FEEDS[0],
    [selectedFeedId],
  );

  if (!selectedFeed) {
    return (
      <section className="space-y-5 py-4">
        <Card className="border border-default-200/70 bg-background/85">
          <CardBody className="p-6">
            <p className="text-sm text-foreground/70">
              No live feed is available.
            </p>
          </CardBody>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-5 py-4">
      <Card className="border border-default-200/70 bg-background/85">
        <CardHeader className="flex items-center justify-between gap-3 px-6 pt-6 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
              Security Center
            </p>
            <h2 className="text-2xl font-semibold">Live Feed Monitor</h2>
          </div>
          <Chip
            color="danger"
            startContent={<Radio className="h-3.5 w-3.5 ml-2" />}
            variant="flat"
          >
            Live
          </Chip>
        </CardHeader>
        <CardBody className="px-6 pb-6 pt-2">
          <div className="grid gap-4">
            <div className="">
              <div className="overflow-hidden rounded-2xl border border-default-200/70 bg-black/95">
                <iframe
                  allow="autoplay; fullscreen; picture-in-picture"
                  className="block aspect-video h-full w-full border-0 overflow-hidden"
                  referrerPolicy="no-referrer"
                  src={selectedFeed.url}
                  title={selectedFeed.title}
                />
              </div>

              <div className="mt-4 rounded-2xl border border-default-200/70 bg-default-50/35 p-4 dark:border-white/10 dark:bg-slate-900/35">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">
                      {selectedFeed.title}
                    </p>
                    <p className="text-sm text-foreground/60">
                      {selectedFeed.provider}
                    </p>
                  </div>
                  <Chip
                    color="success"
                    startContent={<Camera className="h-3.5 w-3.5 ml-2" />}
                    variant="flat"
                  >
                    {selectedFeed.quality}
                  </Chip>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-foreground/70">
                  <MapPin className="h-4 w-4" />
                  {selectedFeed.location}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-default-200/70 bg-default-50/35 p-4 dark:border-white/10 dark:bg-slate-900/35">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <p className="text-sm font-semibold">Feed Sources</p>
              </div>
              <div className="space-y-2">
                {LIVE_FEEDS.map((feed) => (
                  <Button
                    key={feed.id}
                    className="h-auto w-full justify-start p-0 text-left"
                    color={selectedFeedId === feed.id ? "success" : "default"}
                    radius="lg"
                    variant={selectedFeedId === feed.id ? "flat" : "light"}
                    onPress={() => setSelectedFeedId(feed.id)}
                  >
                    <div className="w-full rounded-2xl border border-default-200/70 bg-default-50/35 p-4 dark:border-white/10 dark:bg-slate-900/35">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {feed.title}
                          </p>
                          <p className="truncate text-xs text-foreground/60">
                            {feed.provider}
                          </p>
                        </div>
                        <Chip
                          color="success"
                          startContent={<Camera className="h-3.5 w-3.5 ml-2" />}
                          variant="flat"
                        >
                          {feed.quality}
                        </Chip>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-sm text-foreground/70">
                        <MapPin className="h-4 w-4" />
                        {feed.location}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
