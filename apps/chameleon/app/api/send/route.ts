import { EmailTemplate } from "@/components/email-template";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface RequestBody {
  emails: string[];
  name: string;
  message: string;
  subject: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()
    const {emails, name, message, subject} = body
    const data = await resend.emails.send({
      from: `${name ? name : "name"} <resendEmail@devscape.gg>`,
      to: [...emails],
      subject: subject,
      react: EmailTemplate({ name, message }) as React.ReactElement,
    });
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}