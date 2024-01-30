import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    DATABASE_URL: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url().optional(),
    OPENAI_API_KEY: z.string().min(1),
    POSTMARK_ACTIVATION_TEMPLATE: z.string().min(1),
    POSTMARK_API_TOKEN: z.string().min(1),
    POSTMARK_SIGN_IN_TEMPLATE: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    SMTP_FROM: z.string().min(1),
    STRIPE_API_KEY: z.string().min(1),
    STRIPE_PRO_MONTHLY_PLAN_ID: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    POSTMARK_ACTIVATION_TEMPLATE: process.env.POSTMARK_ACTIVATION_TEMPLATE,
    POSTMARK_API_TOKEN: process.env.POSTMARK_API_TOKEN,
    POSTMARK_SIGN_IN_TEMPLATE: process.env.POSTMARK_SIGN_IN_TEMPLATE,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SMTP_FROM: process.env.SMTP_FROM,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_PRO_MONTHLY_PLAN_ID: process.env.STRIPE_PRO_MONTHLY_PLAN_ID,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
})
