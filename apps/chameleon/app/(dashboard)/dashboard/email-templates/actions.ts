'use server'

import { Resend } from 'resend'

import { EmailTemplate } from './_components/email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function send(emailType: string, name: string) {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [`${emailType}@resend.dev`],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: name }) as React.ReactElement,
    })

    return {success: true}
  } catch (error) {
    return {success: false, error}
  }
}
