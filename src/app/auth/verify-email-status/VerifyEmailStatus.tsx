'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import publicAPI from '../../../api/publicAxios';
import toast, { Toaster } from 'react-hot-toast';
import LoadingButton from '../../../components/ui/LoadingButton';

export default function VerifyEmailStatus() {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams();
  const router = useRouter();

  const uidb64 = searchParams.get('uidb64');
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [message, setMessage] = useState('');


  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await publicAPI.get(`/auth/verify-email/${uidb64}/${token}/`);
        setStatus('success');
        setMessage(res.data.message || 'Email verified successfully');
        toast.success('Email verified successfully');
      } catch (err: any) {
        setStatus('failed');
        setMessage(err.response?.data?.message || 'Verification failed');
        toast.error('Email verification failed');
      }
    };

    if (uidb64 && token) {
      verifyEmail();
    } else {
      setStatus('failed');
      setMessage('Invalid verification link');
    }
  }, [uidb64, token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
      <Toaster />
      <div className="max-w-md w-full bg-gray-50 shadow-lg rounded-lg p-6 text-center space-y-5">
        <Image src="/club_logo.webp" alt="Classic FC Logo" width={60} height={60} className="mx-auto" />

        {status === 'verifying' && (
          <>
            <h2 className="text-lg font-semibold text-gray-700">Verifying your email...</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <h2 className="text-xl font-bold text-green-600">Email Verified!</h2>
            <p className="text-gray-700">{message}</p>
            <LoadingButton
              onClick={() => { setLoading(true); router.push('/auth/login') }}
              loading={loading}
            >
              Go to Login
            </LoadingButton>
          </>
        )}

        {status === 'failed' && (
          <>
            <h2 className="text-xl font-bold text-red-600">Verification Failed</h2>
            <p className="text-gray-700">{message}</p>
            <LoadingButton
              onClick={() => { setLoading(true); router.push('/auth/resend-verification-email') }}
              loading={loading}
            >
              Resend Verification Email
            </LoadingButton>
          </>
        )}

        <p className="text-xs text-gray-400 mt-6">© 2025 - Classic FC • Identity • Privacy Policy</p>
      </div>
    </div>
  );
}
