export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail(message: EmailMessage): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    console.log("[email] not configured:", { to: message.to, subject: message.subject });
    return { ok: false, error: "EMAIL_NOT_CONFIGURED" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, ...message }),
  });

  if (!response.ok) return { ok: false, error: `EMAIL_PROVIDER_${response.status}` };
  return { ok: true };
}
