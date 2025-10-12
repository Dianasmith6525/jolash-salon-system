'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Loader2, Mail } from 'lucide-react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }

    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/users/verify-email?token=${verificationToken}`
      );
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/admin/login');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Email verification failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to verify email. Please try again.');
      console.error('Verification error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            {status === 'loading' && <Loader2 className="h-8 w-8 text-white animate-spin" />}
            {status === 'success' && <CheckCircle2 className="h-8 w-8 text-white" />}
            {status === 'error' && <XCircle className="h-8 w-8 text-white" />}
          </div>
          <CardTitle className="text-2xl">
            {status === 'loading' && 'Verifying Email...'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </CardTitle>
          <CardDescription>
            {status === 'loading' && 'Please wait while we verify your email address'}
            {status === 'success' && 'Your account has been successfully verified'}
            {status === 'error' && 'We couldn\'t verify your email'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {status === 'loading' && (
            <div className="text-center text-muted-foreground">
              <p>This should only take a moment...</p>
            </div>
          )}

          {status === 'success' && (
            <>
              <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  {message}
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3 text-center">
                <p className="text-sm text-muted-foreground">
                  ✨ Welcome to Jolash Salon! You can now:
                </p>
                <ul className="text-sm text-left space-y-2 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">✓</span>
                    <span>Book appointments online 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">✓</span>
                    <span>Browse exclusive services and products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">✓</span>
                    <span>Manage your bookings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">✓</span>
                    <span>Receive special offers</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4">
                  Redirecting to login page in a few seconds...
                </p>
              </div>
              
              <Button 
                onClick={() => router.push('/admin/login')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Go to Login
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  {message}
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  This could happen if:
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• The verification link has expired (valid for 24 hours)</li>
                  <li>• The link has already been used</li>
                  <li>• The link is invalid or corrupted</li>
                </ul>
                
                <div className="pt-4 space-y-2">
                  <Button 
                    onClick={() => router.push('/admin/login')}
                    variant="outline"
                    className="w-full"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Request New Verification Email
                  </Button>
                  
                  <Button 
                    onClick={() => router.push('/')}
                    variant="ghost"
                    className="w-full"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
