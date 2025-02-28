import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      {children}
    </div>
  );
};

export default FormSection;
