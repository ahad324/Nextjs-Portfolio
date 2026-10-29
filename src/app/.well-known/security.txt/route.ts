import { site } from "@/content/site";

export const dynamic = "force-static";

/** RFC 9116 security contact. Regenerated (and the expiry renewed) on every build. */
export function GET() {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  const body = `Contact: mailto:${site.email}
Expires: ${expires.toISOString()}
Preferred-Languages: en
Canonical: ${site.url}/.well-known/security.txt
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
