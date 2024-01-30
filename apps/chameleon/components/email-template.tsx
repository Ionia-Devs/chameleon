import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  message: string;
  phone: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
  </div>
);
