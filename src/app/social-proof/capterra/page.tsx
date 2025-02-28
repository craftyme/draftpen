'use client';

import React from 'react';
import SocialProofLayout from '@/components/layout/SocialProofLayout';

export default function CapterraPage() {
  return (
    <SocialProofLayout
      activeSubTab="capterra"
      onExport={() => {}}
      onCopy={() => {}}
      ControlPanel={<div>Controls will appear here</div>}
    >
      <div className="text-center p-8">Capterra editor coming soon</div>
    </SocialProofLayout>
  );
}
