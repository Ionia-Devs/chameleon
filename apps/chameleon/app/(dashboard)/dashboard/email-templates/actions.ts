'use server'

import { Resend } from 'resend'

import { EmailTemplate } from './_components/email'
import { WelcomeTemplate } from './_components/welcome'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function send(emailType: string, name: string, message: string) {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [`${emailType}@resend.dev`],
      subject: 'Hello world',
      react: EmailTemplate({ name, message }) as React.ReactElement,
    })

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
export async function sendWelcome(
  emailType: string,
  name: string,
  message: string
) {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [`${emailType}@resend.dev`],
      subject: 'Hello world',
      react: WelcomeTemplate({ name }) as React.ReactElement,
    })

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
