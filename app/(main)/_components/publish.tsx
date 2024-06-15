"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages.js";
import { Check, Copy, Globe } from "lucide-react";
interface PublishProps {
  initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: m.Publishing_(),
      success: m.notiZ_published(),
      error: m.Failed_to_publish_notiZ(),
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: m.Unpublishing_(),
      success: m.notiZ_unpublished(),
      error: m.Failed_to_unpublish_notiZ(),
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          {m.Publish()}
          {initialData.isPublished && (
            <Globe className="ml-2 h-4 w-4 text-sky-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="h-4 w-4 animate-pulse text-sky-500" />
              <p className="text-xs font-medium text-sky-500">
                {m.This_notiZ_is_live_on_web_()}
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="h-8 flex-1 truncate rounded-l-md border bg-muted px-2 text-xs"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              className="w-full text-xs"
              size="sm"
              disabled={isSubmitting}
              onClick={onUnpublish}
            >
              {m.Unpublish()}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="mb-2 text-sm font-medium">{m.Publish_this_note()}</p>
            <span className="mb-4 text-xs text-muted-foreground">
              {m.Share_your_work_with_others_()}
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size="sm"
            >
              {m.Publish()}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
