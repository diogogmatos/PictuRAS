"use client";

import { Pencil, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function ModeToggle() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "grid";
  const mode = searchParams.get("mode") ?? "edit";
  const router = useRouter();

  return (
    <div className="flex items-center gap-0.5 p-0.5 border rounded-lg">
      <Button
        variant={mode === "edit" ? "default" : "secondary"}
        size="icon"
        onClick={() => router.push(`?mode=edit&view=${view}`)}
        aria-label="Edit mode"
        aria-pressed={view === "grid"}
        className="size-8"
        title="Edit mode"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant={mode === "results" ? "default" : "secondary"}
        size="icon"
        onClick={() => router.push(`?mode=results&view=${view}`)}
        aria-label="Results mode"
        aria-pressed={view === "carousel"}
        className="size-8"
        title="Results mode"
      >
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  );
}
