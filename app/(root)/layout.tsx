import StreamProvider from "@/providers/StreamProvider";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamProvider>{children}</StreamProvider>
    </main>
  );
};

export default layout;
