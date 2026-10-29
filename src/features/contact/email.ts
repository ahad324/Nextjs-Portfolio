import { brand, site } from "@/content/site";
import type { ContactInput } from "./schema";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** The notification you receive. Table-based so it renders in every mail client. */
export function contactEmail(input: ContactInput & { receivedAt: Date }) {
  const when = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: site.timezone,
  }).format(input.receivedAt);

  const subject = `New message: ${input.topic} — ${input.name}`;

  const text = [
    `New message from your portfolio`,
    ``,
    `Name:   ${input.name}`,
    `Email:  ${input.email}`,
    `Topic:  ${input.topic}`,
    `When:   ${when} PKT`,
    ``,
    input.message,
    ``,
    `— Reply to this email to answer ${input.name} directly.`,
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;background:${brand.ink};padding:32px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${brand.ink2};border:1px solid #23262b;border-radius:20px;">
<tr><td style="padding:28px 32px 8px;">
  <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${brand.muted};">Portfolio · ${escape(input.topic)}</div>
  <div style="margin-top:14px;font-size:26px;font-weight:700;color:${brand.bone};letter-spacing:-0.5px;">${escape(input.name)} wrote to you</div>
</td></tr>
<tr><td style="padding:12px 32px;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;color:${brand.bone};">
    <tr><td style="padding:4px 16px 4px 0;color:${brand.muted};">Email</td><td><a href="mailto:${escape(input.email)}" style="color:${brand.ember};text-decoration:none;">${escape(input.email)}</a></td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:${brand.muted};">Received</td><td>${escape(when)} PKT</td></tr>
  </table>
</td></tr>
<tr><td style="padding:12px 32px 28px;">
  <div style="border-left:3px solid ${brand.ember};padding:4px 0 4px 16px;font-size:16px;line-height:1.6;color:${brand.bone};white-space:pre-wrap;">${escape(input.message)}</div>
  <div style="margin-top:24px;font-size:13px;color:${brand.muted};">Hit reply to answer ${escape(input.name)} directly.</div>
</td></tr>
</table>
</td></tr></table>
</body></html>`;

  return { subject, text, html };
}
