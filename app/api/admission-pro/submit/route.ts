import { handlePro } from "@/lib/admission-pro/server";
export const runtime = "nodejs";
export const maxDuration = 20;
export function POST(request: Request) { return handlePro(request, "submit"); }
