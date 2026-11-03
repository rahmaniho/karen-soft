import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST as contactPost } from "../app/api/contact/route";
import { POST as newsletterPost } from "../app/api/newsletter/route";
import { contactSchema, newsletterSchema } from "../lib/validations";

const validContact = {
  name: "کاربر آزمایشی",
  phone: "۰۹۱۲۳۴۵۶۷۸۹",
  email: "",
  subject: "website",
  message: "درخواست طراحی وب‌سایت شرکتی",
};

function request(body: unknown, ip = "test-ip") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("form anti-spam and provider guards", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_AUDIENCE_ID;
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("accepts an empty honeypot and normalizes Persian digits", () => {
    const parsed = contactSchema.safeParse({ ...validContact, website: "" });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.phone).toBe("09123456789");
  });

  it("rejects a filled contact honeypot before calling the provider", async () => {
    const response = await contactPost(request({ ...validContact, website: "https://spam.example" }, "honeypot-contact"));
    expect(response.status).toBe(422);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("rejects a filled newsletter honeypot before calling the provider", async () => {
    const response = await newsletterPost(request({ email: "user@example.com", website: "spam" }, "honeypot-newsletter"));
    expect(response.status).toBe(422);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not claim success when contact delivery is not configured", async () => {
    const response = await contactPost(request(validContact, "missing-contact-env"));
    expect(response.status).toBe(503);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not claim success when newsletter delivery is not configured", async () => {
    const response = await newsletterPost(request({ email: "user@example.com" }, "missing-newsletter-env"));
    expect(response.status).toBe(503);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("keeps newsletter validation independent of the honeypot", () => {
    expect(newsletterSchema.safeParse({ email: "bad", website: "" }).success).toBe(false);
    expect(newsletterSchema.safeParse({ email: "user@example.com", website: "" }).success).toBe(true);
  });
});
