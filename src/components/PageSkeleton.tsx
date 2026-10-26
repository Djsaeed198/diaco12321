import React from 'react';

export const PageSkeleton: React.FC = () => (
  <div className="min-h-[70vh] bg-[#061a21] p-8" aria-busy="true" aria-label="در حال بارگذاری">
    <div className="container mx-auto max-w-4xl animate-pulse space-y-6">
      <div className="h-8 w-2/3 rounded-lg bg-white/10" />
      <div className="h-4 w-1/2 rounded-lg bg-white/5" />
      <div className="aspect-[16/9] w-full rounded-3xl bg-white/5" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-5/6 rounded bg-white/5" />
        <div className="h-4 w-4/6 rounded bg-white/5" />
      </div>
    </div>
  </div>
);