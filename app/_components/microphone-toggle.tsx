"use client";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const OpenIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 19 27"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("fill-current", className)}
  >
    <path d="M9.5 18.125C6.75781 18.125 4.625 15.9414 4.625 13.25V5.125C4.625 2.43359 6.75781 0.25 9.5 0.25C12.1914 0.25 14.375 2.43359 14.375 5.125V13.25C14.375 15.9922 12.1914 18.125 9.5 18.125ZM17.2188 10C17.8789 10 18.4375 10.5586 18.4375 11.2188V13.25C18.4375 17.7695 15.0352 21.5273 10.7188 22.1367V23.8125H12.75C13.6641 23.8125 14.375 24.625 14.3242 25.5391C14.3242 25.9453 13.9688 26.25 13.5625 26.25H5.4375C4.98047 26.25 4.625 25.9453 4.625 25.5391C4.57422 24.625 5.28516 23.8125 6.25 23.8125H8.28125V22.0352C3.76172 21.4258 0.5625 17.3633 0.5625 12.8438V11.2188C0.5625 10.5586 1.07031 10 1.78125 10C2.44141 10 3 10.5586 3 11.2188V12.9961C3 16.3984 5.69141 19.5469 9.04297 19.75C12.8516 20.0039 16 17.0078 16 13.25V11.2188C16 10.5586 16.5078 10 17.2188 10Z"></path>
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 33 27"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("fill-current", className)}
  >
    <path d="M19.6992 23.8125C20.6133 23.8125 21.3242 24.5742 21.2227 25.4883C21.2227 25.8945 20.918 26.25 20.4609 26.25H12.3867C11.9805 26.25 11.5742 25.8945 11.5742 25.4375C11.5742 24.5742 12.2344 23.8125 13.1484 23.8125H15.1797V22.0859C10.7617 21.4766 7.51172 17.4141 7.51172 12.8945V10.9141L9.94922 12.8438V12.9961C9.94922 16.3984 12.6914 19.5469 16.043 19.75C16.9062 19.8008 17.668 19.6992 18.4297 19.4453L20.6133 21.1719C19.6992 21.6289 18.7344 21.9844 17.7188 22.1367V23.8125H19.6992ZM32.2422 24.1172C32.8008 24.5234 32.9023 25.2852 32.3945 25.7422C31.9883 26.3008 31.2266 26.4023 30.7188 25.9453L0.707031 2.43359C0.148438 2.02734 0.046875 1.26562 0.503906 0.757812C0.707031 0.453125 1.0625 0.25 1.46875 0.25C1.72266 0.25 1.97656 0.351562 2.17969 0.554688L11.625 7.91797V5.125C11.625 2.38281 13.9102 0.199219 16.6523 0.300781C19.3438 0.351562 21.375 2.6875 21.375 5.32812V13.25C21.375 13.9102 21.2227 14.5703 20.9688 15.1797L22.2891 16.1953C22.7461 15.2812 23 14.3164 23 13.25V11.2188C23 10.5586 23.5586 10 24.2188 10C24.8789 10 25.4375 10.5586 25.4375 11.2188V13.25C25.4375 14.9258 24.9297 16.4492 24.168 17.7695L32.2422 24.1172Z"></path>
  </svg>
);

export const MicrophoneToggle = ({
  onChange,
  disabled,
}: {
  disabled?: boolean;
  onChange?: (e: Blob) => void;
}) => {
  const [pressed, setPressed] = useState(false);
  const [record, setRecord] = useState<MediaRecorder | null>(null);
  const onPressedChange = () => {
    if (disabled) return;
    setPressed((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      let blob: Blob;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const record = new MediaRecorder(stream);

      record.ondataavailable = async (e) => {
        if (e.data && e.data.size > 0) {
          blob = e.data;
        }
      };

      record.onstop = () => {
        onChange?.(blob);
      };

      record.onstart = () => {
        console.log("recording started");
      };

      setRecord(record);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pressed ? record?.start() : record?.stop();
  }, [pressed, record]);

  return (
    <div className="max-w-screen-sm w-full">
      {disabled ? (
        <Button
          variant={"outline"}
          className="w-full h-14 flex justify-center items-center"
          disabled
        >
          Transcribe ...
        </Button>
      ) : (
        <Toggle
          pressed={pressed}
          onPressedChange={onPressedChange}
          disabled={disabled}
          className="data-[state=on]:bg-primary data-[state=off]:bg-muted data-[state=off]:text-muted-foreground data-[state=on]:text-primary-foreground w-full !h-14"
          size={"lg"}
        >
          {pressed ? (
            <CloseIcon className="w-8" />
          ) : (
            <OpenIcon className="w-6" />
          )}
          <span className="ml-4 text-muted-foreground">
            Recording {pressed ? "Off" : "On"}
          </span>
        </Toggle>
      )}
    </div>
  );
};
