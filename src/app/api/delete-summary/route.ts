import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    await prisma.summary.delete({
      where: {
        id,
      },
    });
    
    // Revalidate the cache after deleting a summary
    revalidateTag('user-summaries');
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete summary" }, { status: 500 });
  }
} 