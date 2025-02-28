'use client';

import React from 'react';
import SocialProofLayout from '@/components/layout/SocialProofLayout';

export default function TrustpilotPage() {
  return (
    <SocialProofLayout
      activeSubTab="trustpilot"
      onExport={() => {}}
      onCopy={() => {}}
      ControlPanel={<div>Controls will appear here</div>}
    >
      <div className="text-center p-8">Trustpilot editor coming soon</div>
    </SocialProofLayout>
  );
}
