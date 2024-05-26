"use client";

import { useCallback, useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useAtom } from "jotai";
import { blobContentAtom } from "@/store";
import { BLOBS } from "@/config";

const blobs = BLOBS.map(({ content }) => ({
  label: content,
  value: content.toLowerCase(),
}));

export interface BlobSelectorProps {
  open?: boolean;
  onClose?: () => void;
}

export function BlobSelector({ open, onClose }: BlobSelectorProps) {
  const [blobContent, setBlobContent] = useAtom(blobContentAtom);
  const blobValue = useMemo(
    () => blobs.find((blob) => blob.label === blobContent)?.value ?? "",
    [blobContent],
  );

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onClose?.();
      }
    },
    [onClose],
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search blob..." className="h-12" />
      <CommandEmpty>No blob found.</CommandEmpty>
      <CommandGroup className="max-h-96 overflow-y-auto">
        {blobs.map((blob) => (
          <CommandItem
            key={blob.value}
            value={blob.value}
            className="h-12 text-md overflow-hidden"
            onSelect={(currentValue) => {
              const blobContent =
                blobs.find((blob) => blob.value === currentValue)?.label ?? "";
              setBlobContent(currentValue === blobValue ? "" : blobContent);
              onClose?.();
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4 flex-none",
                blobValue === blob.value ? "opacity-100" : "opacity-0",
              )}
            />
            <div className="truncate">{blob.label}</div>
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandDialog>
  );
}
