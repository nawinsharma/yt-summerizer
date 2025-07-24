import prisma from "@/lib/prisma";

export async function updateSummary(id: string, data: string): Promise<void> {
  await prisma.summary.update({
    data: {
      response: data,
    },
    where: {
      id: id,
    },
  });
}