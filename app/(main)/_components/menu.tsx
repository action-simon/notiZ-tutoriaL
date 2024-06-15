"use client";

import { useRouter } from "@/lib/i18n";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import * as m from "@/paraglide/messages.js";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  documentId: Id<"documents">;
}

export const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();

  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: m.Removing_notiZ_(),
      success: m.notiZ_removed(),
      error: m.Failed_to_remove_notiZ(),
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="mr-2 h-4 w-4" />
          {m.Delete()}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2 text-xs text-muted-foreground">
          {m.Last_edited_by()} {user?.username}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
