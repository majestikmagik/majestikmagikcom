/*

import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { requireUser } from "../../lib/auth";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import slugify from "slugify";

const CreateSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  logoUrl: z.string().url().optional(),
  category: z.string().min(2),
  city: z.string().optional(),
  state: z.string().optional(),
  plan: z.enum(["FREE", "PRO"]).optional(),
});

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const data = CreateSchema.parse(await req.json());
    const slugBase = slugify(data.name, { lower: true, strict: true });
    const slug = `${slugBase}-${Math.random().toString(36).slice(2, 6)}`;

    const business = await prisma.business.create({
      data: {
        ownerId: user.id,
        name: data.name,
        slug,
        description: data.description,
        websiteUrl: data.websiteUrl || null,
        logoUrl: data.logoUrl,
        category: data.category,
        city: data.city,
        state: data.state,
        plan: data.plan ?? "FREE",
        featured: data.plan === "PRO",
      },
    });
    return NextResponse.json(business);
  } catch (e: unknown) {
    if (typeof e === 'object' && e !== null && 'message' in e) {
      const status = e.message === "UNAUTHORIZED" ? 401 : 400;
      return NextResponse.json({ error: e.message || "Error" }, { status });
    } else {
      return NextResponse.json({ error: "Error" }, { status: 500 });
    }
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? undefined;
  const city = searchParams.get("city") ?? undefined;
  const featured = searchParams.get("featured") === "1" ? true : undefined;
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = 12;

  const where: Prisma.BusinessWhereInput = {
    approved: true,
    ...(category && { category }),
    ...(city && { city }),
    ...(featured !== undefined && { featured }),
    ...(q && {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    }),
  };

  const [items, total] = await Promise.all([
    prisma.business.findMany({
      where,
      orderBy: featured ? [{ featured: "desc" }, { createdAt: "desc" }] : { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.business.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, pageSize });
}


*/