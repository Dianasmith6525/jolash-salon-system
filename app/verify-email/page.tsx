'use client'

import { Suspense } from 'react'
import VerifyEmailContent from './verify-email-content'

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
