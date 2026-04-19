"use server";

import * as React from "react";
import { resend } from "@/lib/resend";
import { EmailTemplate } from "@/components/EmailTemplate";
import { render } from "@react-email/render";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  console.log("Transmission_Log: Initiating contact for", name);

  if (!name || !email || !message) {
    return { error: "ERR_INCOMPLETE_FIELDS" };
  }

  // Diagnostic: Check if API key is present
  if (!process.env.RESEND_API_KEY) {
    console.error("DIAGNOSTIC_ERR: RESEND_API_KEY is missing from environment.");
    return { error: "ERR_ENV_CONFIGURATION" };
  }

  try {
    // Explicitly render to HTML string to resolve 'render is not a function' error 
    // This bypasses the internal Resend/React 19 compatibility friction
    const emailHtml = await render(React.createElement(EmailTemplate, { name, email, message }));

    const { data, error } = await resend.emails.send({
      from: 'System <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO || "ahadg446@gmail.com"],
      subject: `[SYSTEM_ACCESS] Inbound from ${name}`,
      html: emailHtml, // Pass rendered string to 'html' instead of 'react' 
    });

    if (error) {
      console.error("Resend_API_Error:", error);
      return { error: "ERR_TRANSMISSION_FAILED" };
    }

    console.log("Transmission_Log: Data delivered successfully.");
    return { success: true };
  } catch (err) {
    console.error("System_Critical_Error:", err);
    return { error: "ERR_SYSTEM_CRITICAL" };
  }
}
