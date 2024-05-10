"use client";
import { transcribeFile } from "@/lib/utils";
import { MicrophoneToggle } from "./_components/microphone-toggle";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onChange = (blob: Blob) => {
    setDisabled(true);
    const formdata = new FormData();
    formdata.append("file", blob);

    transcribeFile(formdata)
      .then((res) => {
        if (res) setText(res.transcript);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center lg:p-24 p-4 gap-8">
      <div className="border-border border max-w-screen-sm h-96 w-full p-4 text-lg rounded">
        {text}
      </div>
      <MicrophoneToggle onChange={onChange} disabled={disabled} />
    </main>
  );
}
