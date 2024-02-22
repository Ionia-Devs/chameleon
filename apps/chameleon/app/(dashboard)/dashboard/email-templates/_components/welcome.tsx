import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface WelcomeTemplateProps {
  name: string
}

export const WelcomeTemplate: React.FC<Readonly<WelcomeTemplateProps>> = ({
  name,
}) => (
  <Html>
    <Head />
    <Preview>Chameleon, a safe place for cosplayers & photographers.</Preview>
    <Tailwind>
      <Body className="bg-white">
        <Container className="flex bg-stone-700 border shadow-md border-white/5 rounded-tl-[80px] rounded-br-[80px] rounded-tr-xl rounded-bl-xl my-auto mx-auto px-2 text-stone-200 text-base">
          <Section>
            <Heading className="text-rose-100 font-extrabold text-[32px] p-0 my-[30px] mx-0 text-center">
              Chameleon
            </Heading>
            <Img
              className="mx-auto my-0 object-fit"
              //Warning: local image path
              src="https://chameleon-sandy.vercel.app/icons/chameleon-logo-transparent-bg.png"
              width="200"
              height="200"
              alt="Koala"
            />
          </Section>

          <Section>
            <Heading className=" text-rose-300 font-bold text-[24px] p-0 mt-[32px] mb-[20px] mx-0 text-center">
              Hi {name}, welcome to our community!
            </Heading>
          </Section>

          <Section>
            <Text className="px-3 leading-[25px] text-[15px] mb-[19px]">
              Thank you {name} for joining our waitlist and for your patience.
              We will send you a note when we have something new to share.
            </Text>
            <Button
              className="bg-rose-400 rounded text-white text-[15px] font-semibold no-underline text-center px-5 py-3 ml-3 my-4"
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

          <Text className="mt-[4px] text-[12px] opacity-50 text-center">
            Irvine, California. United States.
          </Text>
          <Text className="text-[11px] text-center mb-5">
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