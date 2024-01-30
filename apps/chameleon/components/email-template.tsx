import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  message: string;
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
