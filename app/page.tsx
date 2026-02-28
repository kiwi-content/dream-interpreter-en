'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE = "You're here. Tell me what you dreamed last night."

const dreamCategories = [
  { emoji: '🐍', label: 'Snake', keyword: 'Snake dream' },
  { emoji: '🦷', label: 'Teeth', keyword: 'Teeth falling out' },
  { emoji: '🏃', label: 'Chased', keyword: 'Being chased' },
  { emoji: '💀', label: 'Death', keyword: 'Death dream' },
  { emoji: '💰', label: 'Money', keyword: 'Money dream' },
  { emoji: '💔', label: 'Ex partner', keyword: 'Ex partner dream' },
]

const reviews = [
  { text: 'Goosebumps... it was spot on', stars: 5 },
  { text: "Can't believe this is free", stars: 5 },
  { text: 'Shared it with all my friends!', stars: 5 },
  { text: 'I check every morning lol', stars: 4 },
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: INITIAL_MESSAGE }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [shared, setShared] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isTypingDone, setIsTypingDone] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)
  const [reviewFading, setReviewFading] = useState(false)
  const [todayCount, setTodayCount] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const lastMsgRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // URL ?q= parameter support
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    if (q) {
      setInput(q)
      window.history.replaceState({}, '', '/')
    }
  }, [])

  // Typing animation
  useEffect(() => {
    if (messages.length > 1) return
    let i = 0
    const timer = setInterval(() => {
      i++
      setTypedText(INITIAL_MESSAGE.slice(0, i))
      if (i >= INITIAL_MESSAGE.length) {
        clearInterval(timer)
        setIsTypingDone(true)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [messages.length])

  // Stats count-up animation
  useEffect(() => {
    const base = 800 + Math.floor(Math.random() * 600)
    let current = 0
    const step = Math.ceil(base / 40)
    const timer = setInterval(() => {
      current += step
      if (current >= base) {
        current = base
        clearInterval(timer)
      }
      setTodayCount(current)
    }, 40)
    return () => clearInterval(timer)
  }, [])

  // Review auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setReviewFading(true)
      setTimeout(() => {
        setReviewIndex((prev) => (prev + 1) % reviews.length)
        setReviewFading(false)
      }, 500)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (messages.length <= 1) return
    if (isLoading) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    } else {
      lastMsgRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [messages, isLoading])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return
    const userMessage = input.trim()
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = '44px'
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)
    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dream: userMessage }),
      })
      const data = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.interpretation }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: "Can't see it right now. Try again." }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = '44px'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const copyMessage = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const shareMessage = async (content: string) => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: 'My Dream Interpretation', text: content, url })
    } else {
      await navigator.clipboard.writeText(url)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  const dreamKeywords = [
    { name: 'Snake dream', slug: 'snake-dream' },
    { name: 'Teeth falling out', slug: 'teeth-dream' },
    { name: 'Being chased', slug: 'chasing-dream' },
    { name: 'Flying dream', slug: 'flying-dream' },
    { name: 'Death dream', slug: 'death-dream' },
    { name: 'Pregnancy dream', slug: 'pregnancy-dream' },
    { name: 'Ex partner dream', slug: 'ex-dream' },
    { name: 'Wedding dream', slug: 'wedding-dream' },
    { name: 'Fire dream', slug: 'fire-dream' },
    { name: 'Water dream', slug: 'water-dream' },
    { name: 'Ghost dream', slug: 'ghost-dream' },
    { name: 'Exam dream', slug: 'exam-dream' },
    { name: 'Money dream', slug: 'money-dream' },
    { name: 'Baby dream', slug: 'baby-dream' },
    { name: 'Poop dream', slug: 'poop-dream' },
  ]

  const isLanding = messages.length === 1

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto">
      {/* Hero */}
      <div className="text-center px-6 pt-12 pb-4 animate-fade-in-up">
        <div className="inline-block mb-4 px-6 py-2 rounded-full bg-amber-900/20 backdrop-blur-sm border border-amber-200/30">
          <span className="text-sm font-medium text-amber-100">✨ Always free · No sign-up</span>
        </div>
        <h1 className="hero-title mb-6">
          What is your
          <br />
          dream telling you?
        </h1>
        <div className="text-7xl crystal-glow inline-block">🔮</div>
      </div>

      {/* Live stats */}
      {isLanding && (
        <div className="text-center pb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400 live-dot" />
            <span className="text-white/60 text-sm">
              <span className="text-amber-200 font-bold">{todayCount.toLocaleString()}</span> dreams interpreted today
            </span>
          </div>
        </div>
      )}

      {/* Messages + inline input */}
      <div className="flex-1 px-4 pb-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            ref={i === messages.length - 1 ? lastMsgRef : null}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && <div className="text-xl crystal-glow mb-1 shrink-0">🔮</div>}
            <div className={`max-w-[78%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`
                px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
                ${
                  msg.role === 'user'
                    ? 'bg-amber-600/80 text-white rounded-2xl rounded-br-md'
                    : 'bg-white/10 backdrop-blur-sm text-white/90 rounded-2xl rounded-bl-md border border-white/10'
                }
              `}
              >
                {msg.role === 'assistant' && i === 0 && !isTypingDone ? (
                  <>
                    {typedText}
                    <span className="inline-block w-0.5 h-4 bg-amber-200/80 ml-0.5 animate-pulse align-middle" />
                  </>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === 'assistant' && i > 0 && (
                <div className="flex gap-3 px-1">
                  <button
                    onClick={() => copyMessage(msg.content, i)}
                    className="text-white/35 hover:text-white/60 text-xs transition-colors"
                  >
                    {copiedIndex === i ? '✓ Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={() => shareMessage(msg.content)}
                    className="text-white/35 hover:text-white/60 text-xs transition-colors"
                  >
                    {shared ? '✓ Shared' : 'Share'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-end gap-2 justify-start">
            <div className="text-xl crystal-glow mb-1 shrink-0">🔮</div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1 items-center h-4">
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />

        {/* Inline input */}
        {!isLoading && (
          <div className="flex items-end gap-2 justify-end mt-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Tell me..."
              className={`${
                isLanding
                  ? 'w-[88%] input-amber-glow border-amber-300/70'
                  : 'w-[72%] bg-amber-50/90 border-amber-200/50 focus:border-amber-400'
              } border rounded-2xl rounded-br-md px-4 py-2.5 text-gray-900 text-sm placeholder:text-amber-900/50 resize-none outline-none transition-all overflow-hidden`}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-base transition-colors shrink-0"
            >
              🔮
            </button>
          </div>
        )}

        {/* Dream category cards */}
        {isLanding && !isLoading && (
          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-white/50 text-xs text-center mb-3">What did you dream about?</p>
            <div className="grid grid-cols-3 gap-2">
              {dreamCategories.map((cat) => (
                <button
                  key={cat.keyword}
                  onClick={() => setInput(cat.keyword)}
                  className="dream-category-card text-center"
                >
                  <div className="text-2xl mb-1">{cat.emoji}</div>
                  <div className="text-amber-50/80 text-xs font-medium">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Landing-only sections */}
      {isLanding && (
        <>
          {/* User reviews */}
          <div className="px-6 pb-8 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="text-center">
              <p className="text-white/40 text-xs mb-3">User reviews</p>
              <div className="inline-block px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 min-h-[72px]">
                <div className={reviewFading ? 'review-exit' : 'review-enter'}>
                  <div className="text-amber-300 text-sm mb-1">
                    {'★'.repeat(reviews[reviewIndex].stars)}{'☆'.repeat(5 - reviews[reviewIndex].stars)}
                  </div>
                  <p className="text-white/80 text-sm">&ldquo;{reviews[reviewIndex].text}&rdquo;</p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO keywords */}
          <div className="text-center px-6 pt-4 pb-40 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <h2 className="text-lg font-bold mb-5 text-white/80">Popular Dream Meanings</h2>
            <div className="grid grid-cols-2 gap-2">
              {dreamKeywords.map((item, i) => (
                <Link
                  key={item.slug}
                  href={`/dream/${item.slug}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-amber-900/15 hover:bg-amber-800/25 border border-amber-200/20 hover:border-amber-200/40 text-amber-50/90 transition-all duration-300 text-xs font-medium backdrop-blur-sm"
                >
                  {i < 3 && <span className="text-sm">{['🥇', '🥈', '🥉'][i]}</span>}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
