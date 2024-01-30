import * as React from 'react';

interface EmailTemplateProps {
  emails: string[];
  name: string;
  message: string;
  subject: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  message
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <p>{message}</p>
  </div>
);
