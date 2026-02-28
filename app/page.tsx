'use client'

import { useEffect, useRef, useState } from 'react'
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

function getHomeAnchorText(name: string, index: number): string {
  const topic = name.toLowerCase().includes('dream') ? name.toLowerCase() : `${name.toLowerCase()} dream`
  const variants = [
    `${name} meaning`,
    `What does this ${topic} mean?`,
    `${name} interpretation`,
    `${name} symbols explained`,
    `Read about ${topic}`,
  ]
  return variants[index % variants.length]
}

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    if (q) {
      setInput(q)
      window.history.replaceState({}, '', '/')
    }
  }, [])

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
    <div className="font-neo-sans min-h-screen bg-[#e9e9ee] text-[#111217]">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-7 sm:px-8 sm:pb-20 sm:pt-10">
        <section className="rounded-[30px] border-2 border-black/85 bg-[#efeff3] p-5 shadow-[0_8px_0_0_rgba(0,0,0,0.28)] sm:p-8">
          <div className="grid items-start gap-7 lg:grid-cols-[1fr_170px]">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border-2 border-black/85 bg-white px-4 py-1.5 text-xs font-semibold">
                ✨ Free forever · No sign-up
              </div>
              <h1 className="font-neo-serif text-[44px] leading-[0.95] tracking-[-0.03em] text-[#12141a] sm:text-[72px] lg:text-[94px]">
                What is your
                <br />
                dream telling you?
              </h1>
              <div className="mt-5 text-6xl sm:text-7xl">🔮</div>
            </div>

            <div className="justify-self-start rounded-[26px] border-2 border-black/85 bg-[#f7f7fb] p-4 shadow-[0_6px_0_0_rgba(0,0,0,0.15)] lg:justify-self-end">
              <div className="neo-chip-gradient flex h-[124px] w-[124px] items-center justify-center rounded-full border-2 border-black/80 text-5xl text-white">
                ✦
              </div>
            </div>
          </div>

          {isLanding && (
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-black/80 bg-white px-4 py-2 text-sm">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#ff2a83]" />
              <span>
                <span className="font-bold text-[#111217]">{todayCount.toLocaleString()}</span> dreams interpreted
                today
              </span>
            </div>
          )}
        </section>

        <section className="mt-6 overflow-hidden rounded-[30px] border-2 border-black/85 bg-[#f8f6ef] shadow-[0_8px_0_0_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between border-b-2 border-black/80 px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-black/80 bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full border border-black/80 bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full border border-black/80 bg-[#28c840]" />
            </div>
            <p className="text-xs font-semibold text-black/70">Dream Console</p>
          </div>

          <div className="relative px-3 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-6">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />

            <div className="relative space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  ref={i === messages.length - 1 ? lastMsgRef : null}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="neo-chip-gradient mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black/80 text-xs text-white">
                      🔮
                    </div>
                  )}

                  <div className={`max-w-[82%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`whitespace-pre-wrap border-2 border-black/80 px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'neo-chip-gradient rounded-2xl rounded-br-md text-white shadow-[0_4px_0_0_rgba(0,0,0,0.22)]'
                          : 'rounded-2xl rounded-bl-md bg-white text-[#131319] shadow-[0_4px_0_0_rgba(0,0,0,0.12)]'
                      }`}
                    >
                      {msg.role === 'assistant' && i === 0 && !isTypingDone ? (
                        <>
                          {typedText}
                          <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-black/80 align-middle" />
                        </>
                      ) : (
                        msg.content
                      )}
                    </div>

                    {msg.role === 'assistant' && i > 0 && (
                      <div className="flex gap-3 px-1">
                        <button
                          onClick={() => copyMessage(msg.content, i)}
                          className="text-xs font-semibold text-black/45 transition-colors hover:text-black/70"
                        >
                          {copiedIndex === i ? '✓ Copied' : 'Copy'}
                        </button>
                        <button
                          onClick={() => shareMessage(msg.content)}
                          className="text-xs font-semibold text-black/45 transition-colors hover:text-black/70"
                        >
                          {shared ? '✓ Shared' : 'Share'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="neo-chip-gradient mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black/80 text-xs text-white">
                    🔮
                  </div>
                  <div className="rounded-2xl rounded-bl-md border-2 border-black/80 bg-white px-4 py-3 shadow-[0_4px_0_0_rgba(0,0,0,0.12)]">
                    <div className="flex h-4 items-center gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-black/45" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-black/45" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-black/45" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />

              {!isLoading && (
                <div className="mt-2 flex items-end gap-2 justify-end">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Tell me your dream..."
                    className={`resize-none overflow-hidden rounded-2xl rounded-br-md border-2 border-black/80 px-4 py-2.5 text-sm text-[#111217] placeholder:text-black/40 outline-none transition-all ${
                      isLanding ? 'w-[88%] bg-white' : 'w-[72%] bg-white'
                    }`}
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className="neo-chip-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-black/80 text-base text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    ✨
                  </button>
                </div>
              )}

              {isLanding && !isLoading && (
                <div className="pt-4">
                  <p className="mb-3 text-center text-xs font-semibold text-black/55">Quick symbols</p>
                  <div className="grid grid-cols-3 gap-2">
                    {dreamCategories.map((cat) => (
                      <button
                        key={cat.keyword}
                        onClick={() => setInput(cat.keyword)}
                        className="rounded-2xl border-2 border-black/80 bg-white p-2.5 text-center transition-transform hover:-translate-y-0.5"
                      >
                        <div className="mb-1 text-xl">{cat.emoji}</div>
                        <div className="text-xs font-semibold text-black/75">{cat.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {isLanding && (
          <section className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[24px] border-2 border-black/85 bg-[#f4f4f8] p-5 shadow-[0_6px_0_0_rgba(0,0,0,0.18)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-black/50">User reviews</p>
              <div className="rounded-2xl border-2 border-black/80 bg-white p-4">
                <div className={reviewFading ? 'review-exit' : 'review-enter'}>
                  <div className="mb-1 text-sm text-[#ff2a83]">
                    {'★'.repeat(reviews[reviewIndex].stars)}{'☆'.repeat(5 - reviews[reviewIndex].stars)}
                  </div>
                  <p className="text-sm font-semibold text-black/80">&ldquo;{reviews[reviewIndex].text}&rdquo;</p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border-2 border-black/85 bg-[#f4f4f8] p-5 shadow-[0_6px_0_0_rgba(0,0,0,0.18)]">
              <h2 className="mb-4 text-lg font-bold text-black/85">Popular Dream Meanings</h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {dreamKeywords.map((item, i) => (
                  <Link
                    key={item.slug}
                    href={`/dream/${item.slug}`}
                    className="flex items-center gap-2 rounded-xl border-2 border-black/80 bg-white px-3 py-2 text-xs font-semibold text-black/80 transition-transform hover:-translate-y-0.5"
                  >
                    {i < 3 && <span>{['🥇', '🥈', '🥉'][i]}</span>}
                    <span>{getHomeAnchorText(item.name, i)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
