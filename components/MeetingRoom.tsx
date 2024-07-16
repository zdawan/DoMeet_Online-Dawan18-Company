import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  CallControls,
  CallParticipantListing,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { LayoutList, User } from "lucide-react";
import { Item } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import Previous from "@/app/(root)/(home)/previous/page";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "Grid" | "Speaker-left" | "Speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();

  const isPersonalRoom = !!searchParams.get("personal");

  const [layout, setLayout] = useState<CallLayoutType>("Speaker-left");

  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "Grid":
        return <PaginatedGridLayout />;
        break;
      case "Speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
        break;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
        break;
    }
  };

  return (
    <section className="relative h-screen overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn(`h-[calc(100vh-86px)] hidden ml-2`, {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl  px-4 py-2 hover:bg-orange-1">
              <LayoutList size={22} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker-left", " Speaker-right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-black 
                "
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <Button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl  px-4 py-2 hover:bg-orange-1">
            <User size={22} className="text-white" />
          </div>
        </Button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
