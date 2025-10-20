'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, AlertCircle, CheckCircle } from 'lucide-react'

const contributionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  type: z.enum(['story', 'photo', 'document', 'correction', 'memory', 'tradition'], {
    required_error: 'Please select a contribution type'
  }),
  notes: z.string().optional(),
  userEmail: z.string().email('Please enter a valid email address'),
  userName: z.string().min(1, 'Name is required'),
})

type ContributionFormData = z.infer<typeof contributionSchema>

interface ContributionFormProps {
  onSuccess?: () => void
}

export default function ContributionForm({ onSuccess }: ContributionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const researchForm = useForm<ContributionFormData>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      type: 'story'
    }
  })

  const onSubmit = async (data: ContributionFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // First, create or find user
      const userResponse = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.userEmail,
          name: data.userName,
        }),
      })

      if (!userResponse.ok) {
        throw new Error('Failed to create user')
      }

      const user = await userResponse.json()

      // Then create contribution
      const contributionResponse = await fetch('/api/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          type: data.type,
          notes: data.notes,
          userId: user.id,
        }),
      })

      if (!contributionResponse.ok) {
        throw new Error('Failed to submit contribution')
      }

      setSubmitStatus('success')
      researchForm.reset()
      onSuccess?.()
    } catch (error) {
      console.error('Error submitting contribution:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit contribution')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="card">
        <div className="card-body text-center">
          <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>
            <CheckCircle size={24} color="white" />
          </div>
          <h3 className="card-title">Thank You!</h3>
          <p className="card-text">
            Your contribution has been submitted successfully. Our team will review it and publish it if it meets our guidelines.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="btn btn-primary"
          >
            Submit Another Contribution
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Share Your Story</h3>
        <p className="card-text mb-6">
          Help preserve Luo community history by sharing your stories, memories, photos, or knowledge.
        </p>

        <form onSubmit={researchForm.handleSubmit(onSubmit)} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="userName" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Your Name *
              </label>
              <input
                id="userName"
                type="text"
                {...researchForm.register('userName')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="Enter your full name"
              />
              {researchForm.formState.errors.userName && (
                <p style={{ color: 'var(--primary-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {researchForm.formState.errors.userName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="userEmail" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Email Address *
              </label>
              <input
                id="userEmail"
                type="email"
                {...researchForm.register('userEmail')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="Enter your email address"
              />
              {researchForm.formState.errors.userEmail && (
                <p style={{ color: 'var(--primary-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {researchForm.formState.errors.userEmail.message}
                </p>
              )}
            </div>
          </div>

          {/* Contribution Type */}
          <div>
            <label htmlFor="type" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Contribution Type *
            </label>
            <select
              id="type"
              {...researchForm.register('type')}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="story">Personal Story</option>
              <option value="memory">Family Memory</option>
              <option value="tradition">Cultural Tradition</option>
              <option value="photo">Historical Photo</option>
              <option value="document">Historical Document</option>
              <option value="correction">Correction or Addition</option>
            </select>
            {researchForm.formState.errors.type && (
              <p style={{ color: 'var(--primary-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {researchForm.formState.errors.type.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Title *
            </label>
            <input
              id="title"
              type="text"
              {...researchForm.register('title')}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
              placeholder="Give your contribution a descriptive title"
            />
            {researchForm.formState.errors.title && (
              <p style={{ color: 'var(--primary-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {researchForm.formState.errors.title.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Your Story/Content *
            </label>
            <textarea
              id="content"
              {...researchForm.register('content')}
              rows={6}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                resize: 'vertical'
              }}
              placeholder="Share your story, memory, or knowledge about Luo community history..."
            />
            {researchForm.formState.errors.content && (
              <p style={{ color: 'var(--primary-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {researchForm.formState.errors.content.message}
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              {...researchForm.register('notes')}
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                resize: 'vertical'
              }}
              placeholder="Any additional context, sources, or information..."
            />
          </div>

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fecaca', 
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#dc2626'
            }}>
              <AlertCircle size={20} />
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {isSubmitting ? (
              <>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Submitting...
              </>
            ) : (
              <>
                <Send size={20} />
                Submit Contribution
              </>
            )}
          </button>
        </form>

        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}
