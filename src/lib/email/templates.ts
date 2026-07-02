import { SITE } from "@/data/site";
import type { EmailMessage } from "@/lib/email/provider";

export function paymentReceivedEmail(to: string, productName: string): EmailMessage {
  return {
    to,
    subject: `${SITE.name}: payment received, approval pending`,
    text: `Payment for ${productName} has been received. Access will be manually approved by the Summit Tuition team.`,
    html: `<p>Payment for <strong>${productName}</strong> has been received.</p><p>Access will be manually approved by the ${SITE.name} team.</p>`,
  };
}

export function adminPaidAccessEmail(to: string, studentEmail: string, productName: string): EmailMessage {
  return {
    to,
    subject: `${SITE.name}: new paid access request`,
    text: `${studentEmail} paid for ${productName}. Review and approve access in the admin dashboard.`,
    html: `<p><strong>${studentEmail}</strong> paid for <strong>${productName}</strong>.</p><p>Review and approve access in the admin dashboard.</p>`,
  };
}

export function reportReadyEmail(to: string, mockTitle: string): EmailMessage {
  return {
    to,
    subject: `${SITE.name}: your mock report is ready`,
    text: `Your report for ${mockTitle} is ready to review inside the platform.`,
    html: `<p>Your report for <strong>${mockTitle}</strong> is ready to review inside the platform.</p>`,
  };
}
