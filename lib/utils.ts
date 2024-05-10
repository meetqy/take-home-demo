import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function transcribeFile(formData: FormData) {
  try {
    const res = await fetch("/api/transcribe", {
      method: "post",
      body: formData,
    });
    const json = await res.json();

    return json as { confidence: number; transcript: string };
  } catch (e) {
    console.error(e);
  }
}
