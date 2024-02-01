'use client'

import * as React from 'react'
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface EmailTemplateProps {
  name: string
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  message,
}) => (
  <Html>
    <Head />
    <Preview>Chameleon, a safe place for cosplayers & photographers.</Preview>
    <Tailwind>
      <Body className="bg-white">
        <Container className="flex bg-stone-600 border shadow-md border-white/5 rounded-tl-[80px] rounded-br-[80px] rounded-tr-xl rounded-bl-xl my-auto mx-auto px-2 text-stone-200 text-base">
          <Section>
            <Heading className="text-rose-100 font-extrabold text-2xl p-0 my-8 mx-0 text-center">
              Chameleon
            </Heading>
            <Img
              className="mx-auto my-0"
              src={
                'https://chameleon-sandy.vercel.app/icons/chameleon-logo-transparent-bg.png'
              }
              width="170"
              height="50"
              alt="Koala"
            />
          </Section>

          <Section>
            <Heading className=" text-rose-300 font-bold text-2xl p-0 mt-8 mb-5 mx-0 text-center">
              Hi {name}, welcome to our community!
            </Heading>
          </Section>

          <Section>
            <Text className="px-3 leading-6 text-base mb-5">{message}</Text>
            <Button
              className="bg-rose-400 rounded text-white text-base font-semibold no-underline text-center px-5 py-3 ml-3 my-4"
              href="https://getkoala.com"
            >
              Visit Chameleon
            </Button>
          </Section>
          <Text className="ml-4 mb-8">
            Best Regards,
            <br />
            The Chameleon team
          </Text>
          <Hr className="opacity-30" />

          <Text className="mt-1 text-xs opacity-50 text-center">
            Irvine, California. United States.
          </Text>
          <Text className="text-xs text-center mb-5">
            <Link
              className="text-rose-400 underline"
              href="https://getkoala.com"
              target="_blank"
            >
              Unsubscribe
            </Link>{' '}
            or Manage Preferences
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default EmailTemplate
