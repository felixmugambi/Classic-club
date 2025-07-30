import { Suspense } from 'react';
import VerifyEmailStatus from './VerifyEmailStatus';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading verification page...</div>}>
      <VerifyEmailStatus />
    </Suspense>
  );
}
