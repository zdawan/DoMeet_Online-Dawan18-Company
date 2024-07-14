"use client";
import Image from "next/image";
import React, { useState } from "react";
import Homecard from "./Homecard";
import { useRouter } from "next/navigation";
import Meetingmoral from "./Meetingmoral";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MeetingList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setvalues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setcallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!client) {
        console.error("Client is not initialized");
        throw new Error("Client is not initialized");
      }
      if (!user) {
        console.error("User is not logged in");
        throw new Error("User is not logged in");
      }
      if (!values.dateTime) {
        toast({ title: "Select Date and Time to schedule" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create Call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setcallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ title: "Meeting created Successfully" });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting ",
      });
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <Homecard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an meeting instantly"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-blue-500"
      />
      <Homecard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting "
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-yellow-3"
      />
      <Homecard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check your recording from previous meetings"
        handleClick={() => setMeetingState("isJoinMeeting")}
        className="bg-yellow-2"
      />
      <Homecard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via Invitation Link"
        handleClick={() => setMeetingState("isJoinMeeting")}
        className="bg-yellow-1"
      />

      <Meetingmoral
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an meeting Instantly"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingList;
