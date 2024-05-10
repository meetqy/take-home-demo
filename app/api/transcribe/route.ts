import { createClient } from "@deepgram/sdk";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  if (!process.env.DEEPGRAM_API_KEY) return;

  const formData = await req.formData();

  const file = formData.get("file") as Blob;
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // STEP 1: Create a Deepgram client using the API key
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

  //   STEP 2: Call the transcribeFile method with the audio payload and options
  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    buffer,
    { model: "nova-2" }
  );

  return NextResponse.json({
    result,
    error,
  });
};
