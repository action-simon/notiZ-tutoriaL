"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import * as m from "@/paraglide/messages.js";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/i18n";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: m.dull_fun_wombat_gaze() }).then(
      (documentId) => router.push(`/documents/${documentId}`),
    );

    toast.promise(promise, {
      loading: "Creating a new notiZ...",
      success: "New notiZ created",
      error: "Failed to create a new notiZ",
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        {m.Welcome_to_user_username_notiZ({ user: user?.username ?? "" })}
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="mr-2 h-4 w-4" />
        {m.tame_proud_pony_twist()}
      </Button>
    </div>
  );
};

export default DocumentsPage;
