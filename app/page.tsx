import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MicrophoneToggle } from "./_components/microphone-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border-border border max-w-screen-sm h-96 w-full"></div>
      <MicrophoneToggle />
    </main>
  );
}
