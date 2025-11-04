import React from 'react'
import { Button, Card, Link, Text } from '@geist-ui/react'

const ShareActions = ({ title, url, tags = [] }) => {
  const encodedUrl = React.useMemo(() => encodeURIComponent(url), [url])
  const encodedTitle = React.useMemo(() => encodeURIComponent(title), [title])
  const hashtagParam = React.useMemo(() => {
    if (!tags.length) {
      return ''
    }
    const formatted = tags
      .map((tag) => tag.replace(/[^a-z0-9]/gi, ''))
      .filter(Boolean)
      .join(',')
    return formatted ? `&hashtags=${encodeURIComponent(formatted)}` : ''
  }, [tags])

  const twitterShare = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}${hashtagParam}`
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

  const handleNativeShare = React.useCallback(() => {
    if (typeof window === 'undefined') {
      return
    }
    if (navigator.share) {
      navigator.share({
        title,
        text: title,
        url,
      })
    } else {
      window.open(twitterShare, '_blank')
    }
  }, [title, twitterShare, url])

  return (
    <Card shadow style={{ marginTop: '40px', marginBottom: '32px' }}>
      <Text h4 style={{ marginBottom: '12px' }}>
        Share this article
      </Text>
      <Text small style={{ marginBottom: '16px', color: '#666' }}>
        Enjoyed the read? Share it with your network or reach out to continue
        the conversation.
      </Text>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <Button auto type="success" ghost onClick={handleNativeShare}>
          Quick share
        </Button>
        <Button
          auto
          type="secondary"
          ghost
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.open(twitterShare, '_blank', 'noopener,noreferrer')
            }
          }}
        >
          Share on X
        </Button>
        <Button
          auto
          type="secondary"
          ghost
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.open(linkedinShare, '_blank', 'noopener,noreferrer')
            }
          }}
        >
          Share on LinkedIn
        </Button>
      </div>
      <Text small style={{ marginTop: '16px', color: '#666' }}>
        Prefer a conversation?{' '}
        <Link href="/contact" pure underline>
          Get in touch
        </Link>{' '}
        and let&apos;s build something together.
      </Text>
    </Card>
  )
}

export default ShareActions
