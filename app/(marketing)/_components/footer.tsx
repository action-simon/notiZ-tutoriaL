import { Button } from "@/components/ui/button";
import * as m from "@/paraglide/messages.js";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <div className="z-50 flex w-full items-center bg-background p-6 dark:bg-[#1f1f1f]">
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 text-muted-foreground md:ml-auto md:justify-end">
        <Button variant="ghost" size="sm">
          {m.Privacy_Policy()}
        </Button>
        <Button variant="ghost" size="sm">
          {m.Terms_Conditions()}
        </Button>
      </div>
    </div>
  );
};
