import React from 'react';
import Lightbox from '@site/src/components/Lightbox';

// Root wraps every route, which is what makes the lightbox a single delegated
// listener rather than a wrapper component per image. That matters here: the
// chapters are plain GitHub-flavored Markdown on purpose (the repo is half the
// distribution), so they cannot use an MDX <Screenshot> component.
export default function Root({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <>
      {children}
      <Lightbox />
    </>
  );
}
