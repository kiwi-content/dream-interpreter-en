import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const dream = body && typeof body === 'object' && 'dream' in body && typeof body.dream === 'string' ? body.dream.trim() : ''

    if (!dream) {
      return NextResponse.json({ error: 'Please describe your dream.' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ interpretation: getDemoInterpretation(dream) })
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a sharp, intuitive dream analyst. You cut straight to what the dream reveals about the person's inner world. You don't comfort — you illuminate.

[INTERNAL ANALYSIS — Do not output this. Complete before writing.]

Analyze through three lenses:

Lens 1 · Desire vs. Block
What does the dreamer want? What blocks it?
"They want (desire) but (block) is expressed as (dream scene)."

Lens 2 · Symbols
What does each element psychologically represent?
What is suppressed or ignored?

Lens 3 · Core Emotion & Need
Dominant emotion? When does it surface in waking life?
What does the person need? (safety/recognition/boundaries/rest/freedom/connection/control)

Integration: Find 1-2 keywords across all three lenses.

[TONE RULES]
- Short, declarative sentences. State, don't explain.
- Confident, direct: "You're..." not "You might be..."
- No comfort, no fluff, no emojis, no academic terms
- No lucky/unlucky predictions

[OUTPUT FORMAT]
- Plain text only. No headers, bullets, markdown.
- One sentence per line.
- Exactly 5 paragraphs, one blank line between each.
- Para 1 (1-2 sentences): Core of the dream.
- Para 2 (3-5 sentences): Symbols as psychological truths.
- Para 3 (2-3 sentences): Name the desire and the block.
- Para 4 (1 sentence): One sharp question.
- Para 5 (1-2 sentences): One concrete action.

Now interpret this dream:

${dream}`,
                  },
                ],
              },
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 2000 },
          }),
        }
      )

      if (!response.ok) throw new Error(`API returned ${response.status}`)

      const data = await response.json().catch(() => null)
      const interpretation =
        data &&
        typeof data === 'object' &&
        'candidates' in data &&
        Array.isArray(data.candidates) &&
        data.candidates[0] &&
        typeof data.candidates[0] === 'object' &&
        'content' in data.candidates[0] &&
        data.candidates[0].content &&
        typeof data.candidates[0].content === 'object' &&
        'parts' in data.candidates[0].content &&
        Array.isArray(data.candidates[0].content.parts) &&
        data.candidates[0].content.parts[0] &&
        typeof data.candidates[0].content.parts[0] === 'object' &&
        'text' in data.candidates[0].content.parts[0] &&
        typeof data.candidates[0].content.parts[0].text === 'string'
          ? data.candidates[0].content.parts[0].text.trim()
          : ''

      if (!interpretation) {
        throw new Error('empty interpretation')
      }

      return NextResponse.json({ interpretation })
    } catch {
      return NextResponse.json({ interpretation: getDemoInterpretation(dream) })
    }
  } catch {
    return NextResponse.json({ interpretation: getDemoInterpretation('unknown dream') })
  }
}

function getDemoInterpretation(dream: string): string {
  const d = dream.toLowerCase()

  if (d.includes('snake') || d.includes('serpent')) {
    return `Something in your life is shifting, and part of you already knows it.\nThis dream didn't come from nowhere.\n\nSnakes always signal transformation or threat — sometimes both at once.\nIf it was chasing you, you're avoiding a change that's already begun.\nIf it was still, you're watching something dangerous and choosing not to act.\nDreams like this keep returning until you decide which it is.\n\nYou want things to stay as they are, but something has already moved.\nYou're not ready to name it yet.\n\nWhat has changed in the last month that you haven't fully acknowledged?\n\nToday, write one sentence about what you're sensing but not saying.`
  }

  if (d.includes('teeth') || d.includes('tooth')) {
    return `You're afraid of losing something that matters — and it shows.\nThis is one of the most common dreams, and it always means the same thing.\n\nTeeth represent confidence, control, how you present yourself to the world.\nWhen they fall out in a dream, something in waking life feels like it's slipping.\nA recent mistake, a conversation that went wrong, or a role you're not sure you're filling well.\nThe more teeth that fell, the wider the anxiety.\n\nYou want to appear capable and in control, but right now something is shaking that.\nYou're more worried about how you're being perceived than you're letting on.\n\nWhat happened recently that made you feel less confident than usual?\n\nToday, identify one small thing you can do to feel more in control of that situation.`
  }

  if (d.includes('chased') || d.includes('chasing') || d.includes('running') || d.includes('flee')) {
    return `You're avoiding something — and you've been avoiding it for a while.\nThis dream is your mind's way of making that impossible to ignore.\n\nBeing chased is never about external danger.\nIt's always about something internal you refuse to face.\nThe fact that you remember this dream means the avoidance has reached a threshold.\nWhatever is chasing you, it's gaining.\n\nYou know what needs to be done. You just don't want to start.\nThe longer you wait, the bigger it gets in your head.\n\nWhat is the one thing you keep deciding to deal with "later"?\n\nToday, take one concrete step toward it — however small.`
  }

  if (d.includes('fly') || d.includes('flying') || d.includes('float')) {
    return `You need to get out from under something.\nNot permanently — just enough to breathe.\n\nFlying in dreams means the pressure in your waking life has become too heavy.\nYour mind is literally showing you the urge to rise above it.\nIf flying felt effortless, part of you already knows how to escape it.\nIf it felt hard to stay up, you're fighting to maintain that sense of freedom.\n\nYou want space — from a person, a role, an expectation, a version of yourself.\nBut leaving feels irresponsible, so you stay and dream about flying instead.\n\nWhat would you do differently if you weren't worried about what others expected of you?\n\nToday, carve out one hour that belongs entirely to you — no obligations.`
  }

  if (d.includes('fall') || d.includes('falling') || d.includes('drop')) {
    return `Something feels out of your hands right now.\nYour mind registered it before you fully did.\n\nFalling is the dream version of losing your grip.\nOn a situation, a relationship, a belief about yourself.\nDreams like this happen when control slips faster than you can adjust.\nThe point where you wake up is the point where your mind refuses to see the landing.\n\nYou're holding on to something you know is already falling apart.\nYou're not ready to let it go, but you're starting to feel the drop.\n\nWhat are you gripping tightly right now that may already be changing?\n\nToday, identify one thing you've been trying to control that you actually can't.`
  }

  return `Something unresolved surfaced while you were sleeping.\nThe fact that you remember it means it matters.\n\nDreams pull from what you haven't finished processing during the day.\nThe details that stay with you — the ones that feel odd or heavy — are the real signals.\nThe emotion you felt in the dream is the one you're carrying in waking life right now.\nPay attention to that, not the surface story.\n\nYou're holding something you haven't named yet.\nIt's not about the dream — it's about what you felt inside it.\n\nWhat emotion from that dream do you recognize from your current life?\n\nToday, write it down in one sentence — what you feel but haven't said out loud.`
}
