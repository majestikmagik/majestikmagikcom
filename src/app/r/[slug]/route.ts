import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const url = new URL(req.url);
  const source = url.searchParams.get("s") ?? "directory";
  const biz = await prisma.business.findUnique({ where: { slug: params.slug } });
  if (!biz) return NextResponse.redirect(new URL("/community", url.origin));
  await prisma.click.create({ data: { businessId: biz.id, source } });
  return NextResponse.redirect(biz.websiteUrl ?? new URL(`/community/${biz.slug}`, url.origin));
}
