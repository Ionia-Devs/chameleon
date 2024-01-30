import { EmailTemplate } from "@/components/email-template";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface RequestBody {
  email: string;
  name: string;
  message: string;
  phone: number;
  subject: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()
    const {email, name, message, phone, subject} = body
    const data = await resend.emails.send({
      from: `${name} <devscape.gg>`,
      to: [email],
      subject: subject,
      react: EmailTemplate({ name, message, phone }) as React.ReactElement,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}