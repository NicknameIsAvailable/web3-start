import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type Props = {
  data: {
    name: string;
    url: string;
    icon: ReactNode;
  };
};

const Social: React.FC<Props> = ({ data }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={data.url} target="_blank">
            <Button size="icon" variant="outline">
              {data.icon}
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{data.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Social;
