'use client';

import React from 'react';
import SocialProofLayout from '@/components/layout/SocialProofLayout';

export default function TestimonialPage() {
  return (
    <SocialProofLayout
      activeSubTab="testimonial"
      onExport={() => {}}
      onCopy={() => {}}
      ControlPanel={<div>Controls will appear here</div>}
    >
      <div className="text-center p-8">Testimonial editor coming soon</div>
    </SocialProofLayout>
  );
}
