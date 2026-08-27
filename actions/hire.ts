"use server";

import { Resend } from "resend";
import { z } from "zod";

import { env } from "@/env.mjs";

const resend = new Resend(env.RESEND_API_KEY);

// Not exported: a "use server" file may only export async functions —
// every sibling action file (e.g. actions/now.ts) keeps its schema local
// for the same reason. Exporting this Zod object used to throw "A 'use
// server' file can only export async functions, found object" the moment
// the form was actually submitted.
const hireFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  projectType: z.enum(["saas", "ai-workflow", "website", "other"]),
  budgetRange: z.enum(["<500", "<1k", "1k-5k", "5k-15k", "15k+"]),
  timeline: z.enum(["asap", "1-3months", "3-6months", "flexible"]),
  description: z.string().min(30, "Please provide at least 30 characters of detail"),
});

export async function submitHireForm(
  _prev: { success: boolean; error?: string },
  formData: FormData,
) {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    projectType: formData.get("projectType") as string,
    budgetRange: formData.get("budgetRange") as string,
    timeline: formData.get("timeline") as string,
    description: formData.get("description") as string,
  };

  const parsed = hireFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data.",
    };
  }

  const data = parsed.data;

  try {
    // Notify the admin
    await resend.emails.send({
      from: env.EMAIL_FROM,
      to: "hello@velombe.com",
      subject: `New project inquiry from ${data.name}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Type:</strong> ${data.projectType}</p>
        <p><strong>Budget:</strong> ${data.budgetRange}</p>
        <p><strong>Timeline:</strong> ${data.timeline}</p>
        <hr/>
        <p>${data.description}</p>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("Hire form error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
