import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import DreamInput from './DreamInput'

type DreamEntry = { title: string; description: string; content: string }
type DreamCase = { title: string; description: string }
type DreamConfig = {
  slug: string
  name: string
  keyword: string
  symbol: string
  sensory: string
  focus: string
  actionTip: string
  tradition: string
  metaTitle: string
  metaDescription: string
  caseStudies: [DreamCase, DreamCase, DreamCase, DreamCase]
  relatable: [string, string, string]
}
type FAQItem = { question: string; answer: string }

function AiAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-sm shrink-0 shadow-md">
      🔮
    </div>
  )
}

function SectionCard({ label, icon, children }: { label: string; icon: string; children: ReactNode }) {
  return (
    <div className="bg-slate-800/40 border border-white/[0.08] rounded-2xl p-4">
      <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wider mb-3">
        {icon} {label}
      </p>
      {children}
    </div>
  )
}

function buildDreamContent(config: DreamConfig): string {
  const scenarios = config.caseStudies.map((item) => `${item.title}: ${item.description}`).join('\n')
  const relatable = config.relatable.map((item) => `- ${item}`).join('\n')

  return [
    `${config.name} interpretation`,
    `Core symbol: ${config.symbol}`,
    `Sensory cue: ${config.sensory}`,
    `Psychological focus: ${config.focus}`,
    `Tradition: ${config.tradition}`,
    'Scenario breakdown:',
    scenarios,
    'People who commonly have this dream:',
    relatable,
    `Action tip: ${config.actionTip}`,
  ].join('\n\n')
}

function buildFAQs(config: DreamConfig): FAQItem[] {
  const dreamName = config.name.toLowerCase()

  return [
    {
      question: `Is a ${dreamName} always a good or bad sign?`,
      answer: `Not automatically. ${config.symbol} can show up as a warning or a green light depending on what is happening in your real life. If the dream felt charged with ${config.sensory}, trust that your body is tagging an issue that needs attention now.`,
    },
    {
      question: 'Is it bad if I keep having the same dream?',
      answer: `Repeated dreams are usually persistence, not punishment. Your subconscious is resending a message until waking-life behavior changes. Once you address the pressure point behind this symbol, recurring dreams often soften or evolve.`,
    },
    {
      question: 'Could a very vivid dream be prophetic?',
      answer: `Vivid dreams feel prophetic because they are emotionally precise. The intensity of ${config.sensory} suggests high internal relevance, not guaranteed external prediction. Think less fortune-telling and more advanced self-awareness.`,
    },
    {
      question: 'Should I make big decisions based on my dream?',
      answer: `Use the dream as direction, not final evidence. Let it point to what deserves closer scrutiny, then confirm with facts, timing, and conversations in daylight. Dreams are excellent at surfacing truth and terrible at setting deadlines.`,
    },
    {
      question: 'What should I do right after having this dream?',
      answer: `Capture the key image and emotion in one sentence before it fades, then take one grounded action. ${config.actionTip} The action matters more than perfect interpretation.`,
    },
  ]
}

const dreamConfigs: DreamConfig[] = [
  {
    slug: 'snake-dream',
    name: 'Snake Dream',
    keyword: 'snake dream',
    symbol: 'transformation and hidden threat',
    sensory: 'the gleam of scales catching light, that electric stillness before it moves',
    focus: 'the tension between fear and something you know is about to change',
    actionTip:
      "Today, deal with one money or personal thing you've been dodging. You already know what it is — your dream just confirmed it.",
    tradition:
      'The Greeks carved snakes into the staff of Asclepius, the god of healing — because they knew the thing that terrifies you is often the thing that transforms you. Ancient Egyptian dream priests read serpent visions as omens of either powerful enemies or sudden wealth, depending on how the snake behaved. Jung called the snake one of the deepest archetypes in the human psyche: raw life force, shadow energy, the part of you that refuses to stay buried.',
    metaTitle: 'Snake dream? Yeah, money might actually be coming',
    metaDescription:
      "Big snake passing by = cash incoming. Chased by one = a warning you're ignoring. White snake = jackpot signal. Your snake dream means something specific.",
    caseStudies: [
      {
        title: 'A large snake quietly passing by',
        description:
          "No attack, no drama — it just existed there. That's life rearranging itself beneath the surface. A career shift, money turn, or relationship pivot is already underway.",
      },
      {
        title: 'Being chased by a snake',
        description:
          "Whatever you've been avoiding just picked up speed. This is less about outside danger and more about your own postponed decision hunting you down.",
      },
      {
        title: 'Catching or killing a snake',
        description:
          "Control returns here. You're done feeding fear with delay, and your psyche is rehearsing decisive action before you make the move in waking life.",
      },
      {
        title: 'A white or golden snake appearing',
        description:
          'Dream traditions read luminous snakes as rare and charged: sudden luck, high-value opportunity, or protective guidance. Calm energy in the dream usually means support is near.',
      },
    ],
    relatable: [
      "You're in the middle of a career shift — or finally admitting you want one.",
      "There's a money decision you keep postponing, and your nervous system is done waiting.",
      'A relationship needs clearer boundaries, and the dream arrived right on schedule.',
    ],
  },
  {
    slug: 'teeth-dream',
    name: 'Teeth Falling Out Dream',
    keyword: 'teeth falling out dream',
    symbol: 'control slipping and self-image cracking',
    sensory: 'that hollow feeling in your mouth, the sharp click of enamel on your tongue',
    focus: 'the gap between how you want to be seen and how exposed you actually feel',
    actionTip:
      "Today, name one situation where you're performing confidence you don't feel. Just naming it takes half its power away.",
    tradition:
      'Ancient Romans feared teeth dreams as loss and grief omens, while medieval Europeans read them as social embarrassment becoming public. Freud linked the image to fear around desirability and status. Across eras, the message stayed consistent: teeth are social armor, and losing them means vulnerability is breaking through.',
    metaTitle: "Teeth falling out dream — relax, nobody's dying",
    metaDescription:
      "Front teeth = image pressure. Molars = family burden. Blood = burnout warning. Putting them back = recovery mode. Here's what your teeth dream points to.",
    caseStudies: [
      {
        title: 'Front teeth falling out',
        description:
          'Your public face feels unstable. Reputation, visibility, and social confidence are under strain, and your psyche is replaying that fear in dramatic form.',
      },
      {
        title: 'Molars crumbling',
        description:
          'Molars carry load. This points to deep responsibilities — family, long-term obligations, financial maintenance — feeling heavier than you admit.',
      },
      {
        title: 'Teeth falling out with blood',
        description:
          "Blood raises the urgency. You're not just worried; you're depleted. This often shows up when chronic stress is outpacing recovery.",
      },
      {
        title: 'Putting teeth back in',
        description:
          'Repair mode is active. You are already rebuilding confidence, restoring structure, and choosing self-respect after a hit to your pride.',
      },
    ],
    relatable: [
      "You're preparing for judgment day — interview, presentation, performance, or hard conversation.",
      'Someone saw a vulnerable side of you and it unsettled your usual control.',
      "You've been carrying quiet family pressure that nobody else fully sees.",
    ],
  },
  {
    slug: 'chasing-dream',
    name: 'Being Chased Dream',
    keyword: 'being chased dream',
    symbol: 'avoidance hitting its limit',
    sensory: 'legs turning heavy while footsteps close in behind you',
    focus: 'the conflict between wanting relief and refusing confrontation',
    actionTip: 'Today, handle the one task you keep postponing. Ten focused minutes. Start before fear starts talking.',
    tradition:
      'In Greek oneiromancy, being pursued meant an unpaid debt to fate. Medieval dream manuals framed chase dreams as conscience in motion. Jung treated the pursuer as shadow material — parts of self you reject until they run you down.',
    metaTitle: "Chased in a dream? You're dodging one real-life thing",
    metaDescription:
      'Unknown pursuer = unnamed fear. Known pursuer = unresolved relationship. Stuck legs = burnout and avoidance colliding. Your chase dream is a deadline.',
    caseStudies: [
      {
        title: 'Running from someone faceless',
        description:
          "When you can't see who chases you, the threat is internal. Anxiety without a name is still anxiety with power.",
      },
      {
        title: 'Being chased by someone you know',
        description:
          'This usually maps to unfinished conflict. A boundary was crossed, a truth was avoided, and your body is done pretending it is fine.',
      },
      {
        title: 'Trying to scream but no sound comes out',
        description:
          'Classic helplessness script. You want to speak clearly in waking life but fear the consequences of being direct.',
      },
      {
        title: 'You stop running and face the pursuer',
        description:
          'Breakthrough pattern. The mind is rehearsing courage, and this often appears right before decisive action in real life.',
      },
    ],
    relatable: [
      "You've delayed a difficult conversation that's now occupying your whole body.",
      'Work pressure is rising and procrastination stopped working as a coping tool.',
      'You know exactly what needs to change, but fear of backlash keeps you circling.',
    ],
  },
  {
    slug: 'money-dream',
    name: 'Money Dream',
    keyword: 'money dream',
    symbol: 'self-worth, security, and fear of scarcity',
    sensory: 'counting bills fast while your chest stays tight anyway',
    focus: 'the gap between visible success and internal safety',
    actionTip: 'Today, open your banking app and face one number you have been avoiding. Clarity first, strategy second.',
    tradition:
      'Roman augurs treated coin dreams as contracts with destiny — gain if handled wisely, loss if ignored. Folk dream books in Europe said found money meant incoming opportunity, while stolen money meant leaking energy and trust. Jung would call money libido in symbolic form: where your life force gets spent.',
    metaTitle: 'Money dream last night? Your stress has a number',
    metaDescription:
      'Finding cash can mean new value waking up. Losing money points to boundary leaks. Counterfeit money flags self-doubt. Read your money dream clearly.',
    caseStudies: [
      {
        title: 'Finding cash unexpectedly',
        description:
          'Opportunity energy. You are starting to notice value where you used to overlook it — in skills, relationships, or timing.',
      },
      {
        title: 'Losing your wallet',
        description:
          'Identity and security feel exposed. This often appears when expenses, trust, or role stability are uncertain.',
      },
      {
        title: 'Winning money in a game',
        description:
          "Risk appetite is rising. Part of you wants a leap, but the dream asks whether it's strategy or pure escape.",
      },
      {
        title: 'Counting fake bills',
        description:
          "Counterfeit symbols point to impostor syndrome. You're questioning whether your value is real enough to claim.",
      },
    ],
    relatable: [
      'A pay negotiation, major purchase, or debt plan is sitting in your mental tab list.',
      'You are outwardly functioning but privately worried about long-term security.',
      'You keep over-giving time and effort without equivalent return.',
    ],
  },
  {
    slug: 'pregnancy-dream',
    name: 'Pregnancy Dream',
    keyword: 'pregnancy dream',
    symbol: 'creative incubation and irreversible beginnings',
    sensory: 'that full, heavy awareness that something is growing inside your life',
    focus: 'the tension between readiness and fear of change becoming visible',
    actionTip: 'Today, protect one hour for the project or decision you keep calling "someday." Treat it like a prenatal appointment.',
    tradition:
      'Ancient Egyptian dream houses read pregnancy symbols as ideas taking flesh before fortune arrived. In European folklore, pregnancy dreams often appeared before household transitions — moves, marriages, career pivots. Jung framed them as psychic gestation: the self preparing to deliver a new identity.',
    metaTitle: 'Pregnancy dream? Something new wants out',
    metaDescription:
      'Not always about babies. Early pregnancy scenes signal beginnings. Labor scenes signal urgency. Your pregnancy dream tracks what is ready to be born.',
    caseStudies: [
      {
        title: 'Discovering you are pregnant',
        description:
          'A new chapter has already started psychologically, even if your calendar still looks the same.',
      },
      {
        title: 'Very late-stage pregnancy',
        description:
          'You are close to launch. Delay now feels painful because the inner process is complete.',
      },
      {
        title: 'Complicated labor dream',
        description:
          'Delivery anxiety. You want the outcome, but fear the vulnerability required to bring it into the world.',
      },
      {
        title: 'Holding a healthy newborn',
        description:
          'Integration scene. The thing you have been building is ready for real-world care and consistency.',
      },
    ],
    relatable: [
      'You are building something privately and are not ready for outside opinions yet.',
      'A role change is coming, and your identity is updating faster than your confidence.',
      'You sense timing pressure around a creative, relational, or professional move.',
    ],
  },
  {
    slug: 'water-dream',
    name: 'Water Dream',
    keyword: 'water dream',
    symbol: 'emotional truth and regulation capacity',
    sensory: 'cold water on your skin, depth you cannot immediately measure',
    focus: 'how well you are containing feelings that keep spilling through',
    actionTip: 'Today, name the dominant emotion out loud and tie it to one event. Specific language lowers emotional flood.',
    tradition:
      'From Mesopotamian omens to Celtic lore, water dreams were treated as messages from the emotional underworld. Calm water meant harmony with fate; violent water meant unprocessed turmoil. Jung saw water as the unconscious itself — vast, alive, and impossible to fake your way through.',
    metaTitle: 'Water dream? Your emotions just told on you',
    metaDescription:
      'Clear water = emotional clarity. Murky water = confusion. Rising water = overload. Drowning scenes show overwhelm, not weakness.',
    caseStudies: [
      {
        title: 'Swimming in clear water',
        description:
          'You are moving through emotion with skill. Even if life is intense, your inner navigation is functioning.',
      },
      {
        title: 'Murky or muddy water',
        description:
          'Confusion phase. You sense truth but cannot yet separate it from fear, projection, or noise.',
      },
      {
        title: 'Flooding water entering a house',
        description:
          'Private boundaries are breached. Stress has crossed from external pressure into intimate spaces.',
      },
      {
        title: 'Trying not to drown',
        description:
          'This is overload language. Your system needs decompression, not more performance.',
      },
    ],
    relatable: [
      'You are carrying emotions for multiple people at once.',
      'A breakup, transition, or conflict has left your nervous system saturated.',
      'You are functioning well publicly while feeling flooded privately.',
    ],
  },
  {
    slug: 'death-dream',
    name: 'Death Dream',
    keyword: 'death dream',
    symbol: 'endings that create identity renewal',
    sensory: 'the eerie stillness after impact, like time paused mid-breath',
    focus: 'grief over who you were versus relief about who you are becoming',
    actionTip: 'Today, retire one outdated habit or role sentence. Say: "That version of me is complete."',
    tradition:
      'In Hellenistic dream texts, death symbols often meant transformation, not literal loss. Medieval mystics viewed symbolic death as purification before new vocation. Jung described ego death as necessary for individuation — the old mask must crack so the deeper self can breathe.',
    metaTitle: "Death dream? It's ending, not your life",
    metaDescription:
      'Dream death rarely predicts real death. It marks identity shifts, relationship endings, and old patterns collapsing. Your death dream signals transition.',
    caseStudies: [
      {
        title: 'Seeing your own death',
        description:
          'A major self-image is expiring. You are shedding a role that no longer fits your current truth.',
      },
      {
        title: 'Witnessing someone else die',
        description:
          'Your relationship to that person or what they represent is changing fundamentally.',
      },
      {
        title: 'Funeral scenes',
        description:
          'Ceremony means integration. Your mind is trying to give closure a container.',
      },
      {
        title: 'Dying then waking alive',
        description:
          'Rebirth pattern. A feared ending is actually opening emotional space and agency.',
      },
    ],
    relatable: [
      'A breakup, resignation, relocation, or identity pivot is underway.',
      'You are grieving an old dream while sensing a better one emerging.',
      'You know a chapter is done but keep negotiating with finality.',
    ],
  },
  {
    slug: 'exam-dream',
    name: 'Exam Dream',
    keyword: 'exam dream',
    symbol: 'performance anxiety and fear of being exposed',
    sensory: 'blanking on answers while the clock races louder than your thoughts',
    focus: 'the fight between perfectionism and self-trust under pressure',
    actionTip: 'Today, define "good enough" for one task before you start it. Finish at that line instead of moving it.',
    tradition:
      'Renaissance dream interpreters saw exam dreams as moral accounting nights, where conscience graded unresolved duties. Modern depth psychology keeps the same core: tests symbolize evaluation by authority, peers, and your own inner critic. The dream asks what standard you are trying to survive.',
    metaTitle: 'Exam dream at 2am? Pressure is leaking through',
    metaDescription:
      'Missing the exam points to avoidance. Failing despite studying points to impossible standards. Cheating scenes expose fear of being found out.',
    caseStudies: [
      {
        title: 'Arriving late to the exam',
        description:
          'Timing panic. You fear opportunities are closing before you are fully ready.',
      },
      {
        title: 'Forgetting everything on the paper',
        description:
          'Freeze response, not incompetence. Your stress level exceeded cognitive bandwidth.',
      },
      {
        title: 'Taking an exam for a class you never attended',
        description:
          'Impostor pattern. You are being evaluated in an arena where you feel uninitiated.',
      },
      {
        title: 'Passing with relief',
        description:
          'Confidence is returning. Your system is integrating effort and earned capability.',
      },
    ],
    relatable: [
      'A deadline, review, launch, or interview is approaching fast.',
      'You attach self-worth to flawless execution and fear visible mistakes.',
      'You feel observed at work or in family roles and cannot fully exhale.',
    ],
  },
  {
    slug: 'ghost-dream',
    name: 'Ghost Dream',
    keyword: 'ghost dream',
    symbol: 'unfinished emotion and memory that still wants contact',
    sensory: 'cold air, half-seen movement, and that charged silence in the room',
    focus: 'the pull between moving on and needing one more honest conversation',
    actionTip: 'Today, write an unsent message to the person or season this ghost reminds you of. One page, no editing.',
    tradition:
      'From Roman household spirits to Celtic ancestor rites, ghost dreams were considered relationship dreams across worlds. The dead were believed to visit when balance was off among the living. Jung interpreted ghosts as autonomous complexes: emotional fragments seeking acknowledgement and integration.',
    metaTitle: 'Ghost dream? A memory still wants your attention',
    metaDescription:
      'Friendly ghost = guidance from memory. Threatening ghost = repressed fear. Haunted house scenes point to old pain stored in your inner home.',
    caseStudies: [
      {
        title: 'Seeing a silent ghost watching you',
        description:
          'Observation without attack suggests unresolved memory waiting for naming, not panic.',
      },
      {
        title: 'Being chased by a ghost',
        description:
          'Avoided grief or guilt is catching up. The more you run, the louder it gets.',
      },
      {
        title: 'Talking calmly with a ghost',
        description:
          'Integration is underway. You are ready to metabolize old emotional material.',
      },
      {
        title: 'Ghost appearing in your childhood home',
        description:
          'Roots issue. This points to family patterning, old scripts, and inherited emotional weather.',
      },
    ],
    relatable: [
      'You are processing a loss, ending, or unanswered past relationship thread.',
      'A place, song, or date recently triggered powerful old emotion.',
      'You keep saying you are over it while your dreams disagree.',
    ],
  },
  {
    slug: 'ex-dream',
    name: 'Ex Partner Dream',
    keyword: 'ex partner dream',
    symbol: 'unfinished attachment patterns and emotional loops',
    sensory: 'familiar voice, old rooms, and the ache of almost going back',
    focus: 'the tension between nostalgia and the boundary you fought to build',
    actionTip: 'Today, list three things you need in love now that your past relationship could not give.',
    tradition:
      'Classical dream books treated former lovers as omens of repeating cycles unless the dreamer changed conduct. Medieval courtly lore framed ex dreams as tests of loyalty to your present path. Jung would call the ex an inner figure carrying lessons about your own unmet needs.',
    metaTitle: "Dreamed of your ex? The story isn't over in you",
    metaDescription:
      'Romantic reunion dreams can mean longing or closure work. Fighting with an ex points to unresolved anger. Your ex dream is about pattern, not fate.',
    caseStudies: [
      {
        title: 'Getting back together in the dream',
        description:
          'Longing is present, but often for a feeling, not the person. Identify which need is actually resurfacing.',
      },
      {
        title: 'Arguing intensely with your ex',
        description:
          'Suppressed anger seeks completion. Words unsaid in real life are finishing themselves in sleep.',
      },
      {
        title: 'Seeing your ex with someone new',
        description:
          'Comparison wound. This points to self-worth and replacement fears more than relationship destiny.',
      },
      {
        title: 'Ignoring your ex in the dream',
        description:
          'Boundary consolidation. Your psyche is practicing emotional non-engagement and self-protection.',
      },
    ],
    relatable: [
      'A current relationship is triggering old attachment pain.',
      'You are lonely and your mind reached for a familiar emotional template.',
      'You have unfinished closure and keep replaying what-ifs.',
    ],
  },
  {
    slug: 'poop-dream',
    name: 'Poop Dream',
    keyword: 'poop dream',
    symbol: 'release, money flow, and letting go of stuck energy',
    sensory: 'gross relief mixed with embarrassment and immediate lightness',
    focus: 'the clash between what needs to exit and what you keep holding',
    actionTip: 'Today, clear one physical or financial clutter zone: one drawer, one bill, one overdue admin task.',
    tradition:
      'Many European folk traditions surprisingly linked feces dreams with wealth, because waste signaled surplus and fertile cycles. Alchemical texts treated excretion as purification before transformation. Jungian framing agrees symbolically: what you release becomes energy you can reinvest.',
    metaTitle: 'Poop dream? Weirdly, this can mean money',
    metaDescription:
      'Messy poop dreams often point to release and financial reset. Public embarrassment scenes reflect shame. Constipation dreams signal blocked expression.',
    caseStudies: [
      {
        title: 'Relieved after pooping',
        description:
          'Classic discharge pattern. Emotional pressure is ready to move out of your system.',
      },
      {
        title: 'Pooping in public',
        description:
          'Vulnerability fear. You worry that private mess will become public judgment.',
      },
      {
        title: 'Unable to poop',
        description:
          'Stagnation script. You are overcontrolling and blocking natural release.',
      },
      {
        title: 'Cleaning poop repeatedly',
        description:
          'You are stuck in cleanup mode for problems that need boundaries, not endless maintenance.',
      },
    ],
    relatable: [
      'You are overdue for practical cleanup in money, schedule, or home systems.',
      'You feel ashamed about a normal need and keep hiding it behind perfection.',
      'You keep carrying old stress long after it stopped being useful.',
    ],
  },
  {
    slug: 'fire-dream',
    name: 'Fire Dream',
    keyword: 'fire dream',
    symbol: 'destruction, passion, and fast transformation',
    sensory: 'heat on your face, crackling air, and urgency in every breath',
    focus: 'whether your intensity is cleansing your life or consuming it',
    actionTip: 'Today, channel your fire into one constructive move: one hard conversation or one bold application, not ten impulsive actions.',
    tradition:
      'In Greek temple rites, sacred fire symbolized purification before prophecy. Medieval dream lore treated uncontrolled fire as warning against rage and haste. Jung described fire as psychic energy itself — creative if contained, catastrophic if denied then unleashed.',
    metaTitle: 'Fire dream? Your anger and energy are both rising',
    metaDescription:
      'House fire can mean identity reset. Wildfire can mean overwhelm. Controlled flame signals focused drive. Your fire dream asks where to direct power.',
    caseStudies: [
      {
        title: 'Your house catches fire',
        description:
          'Core identity structures are changing fast. Old comfort zones can no longer hold current energy.',
      },
      {
        title: 'Watching distant fire calmly',
        description:
          'You are aware of major change without panic, suggesting readiness to adapt.',
      },
      {
        title: 'Starting a fire accidentally',
        description:
          'Fear of unintended impact. You worry your emotions will damage what you value.',
      },
      {
        title: 'Extinguishing flames successfully',
        description:
          'Self-regulation is strengthening. You can hold intensity without letting it drive the car.',
      },
    ],
    relatable: [
      'You are angry, ambitious, or passionate and unsure where to put that force.',
      'A life area is changing faster than your usual coping pace.',
      'You have been suppressing emotion until it started leaking through dreams.',
    ],
  },
  {
    slug: 'tiger-dream',
    name: 'Tiger Dream',
    keyword: 'tiger dream',
    symbol: 'raw power, predatory focus, and personal dominance',
    sensory: 'striped movement in the dark and that visceral adrenaline spike',
    focus: 'the struggle between your instinctive authority and social restraint',
    actionTip: 'Today, make one bold ask you have been shrinking away from. Keep it clean, direct, and unapologetic.',
    tradition:
      'Across South and East Asian-influenced folklore and later Western occult texts, tigers symbolized sovereign force and guardianship. Medieval bestiaries saw the tiger as untamable appetite. Jungian language reads tiger imagery as instinct power demanding conscious leadership.',
    metaTitle: "Tiger dream? You're done playing small",
    metaDescription:
      'Calm tiger means contained power. Attacking tiger means repressed instinct breaking out. Riding a tiger signals high-risk ambition.',
    caseStudies: [
      {
        title: 'Tiger watching you silently',
        description:
          'Power is present but waiting. You sense capacity you have not fully claimed yet.',
      },
      {
        title: 'Being attacked by a tiger',
        description:
          'Suppressed anger or desire is forcing attention. Ignored instinct rarely stays polite.',
      },
      {
        title: 'Taming or riding a tiger',
        description:
          'Leadership integration. You are learning to direct intensity without denying it.',
      },
      {
        title: 'Tiger protecting you',
        description:
          'Protective instinct is coming online. Boundaries and self-respect are strengthening.',
      },
    ],
    relatable: [
      'You are stepping into a leadership role and feeling the weight of visibility.',
      'You are tired of being underestimated and ready to take up space.',
      'You fear your strongest traits will be judged as too much.',
    ],
  },
  {
    slug: 'baby-dream',
    name: 'Baby Dream',
    keyword: 'baby dream',
    symbol: 'new vulnerability, care needs, and fresh beginnings',
    sensory: 'tiny fingers, fragile breath, and protective urgency in your chest',
    focus: 'the need to nurture what is new without abandoning yourself',
    actionTip: 'Today, support your newest project or habit with one tiny non-negotiable routine. Consistency is care.',
    tradition:
      'Ancient dream manuals often read babies as blessing symbols tied to growth and responsibility. Christian medieval texts framed infant dreams as innocence returning to guide conduct. Jungian views emphasize the divine child archetype: new potential demanding protection.',
    metaTitle: 'Baby dream? Your next chapter is crying to start',
    metaDescription:
      'Crying baby = neglected need. Healthy baby = growth momentum. Losing a baby in dreams points to fear of failing what matters most.',
    caseStudies: [
      {
        title: 'Holding a peaceful baby',
        description:
          'You are ready to nurture a new commitment with steadiness and patience.',
      },
      {
        title: 'Baby crying nonstop',
        description:
          'An unmet need keeps signaling. Ignoring it has become emotionally expensive.',
      },
      {
        title: 'Losing track of a baby',
        description:
          'Fear of dropping responsibility. You worry your current capacity cannot cover all obligations.',
      },
      {
        title: 'Giving birth unexpectedly',
        description:
          'Rapid emergence. A project or identity shift is arriving before you feel prepared.',
      },
    ],
    relatable: [
      'You are starting something meaningful that feels fragile and high-stakes.',
      'You are balancing care for others with depleted personal bandwidth.',
      'You want growth but fear being judged while learning publicly.',
    ],
  },
  {
    slug: 'wedding-dream',
    name: 'Wedding Dream',
    keyword: 'wedding dream',
    symbol: 'commitment, integration, and fear of irreversible choice',
    sensory: 'music, white light, and that heartbeat before saying yes',
    focus: 'the push-pull between devotion and autonomy',
    actionTip: 'Today, define one commitment you are truly ready for and one you are accepting out of pressure. Separate them clearly.',
    tradition:
      'Classical dream lore cast weddings as union of opposites, not only romantic events. Alchemical traditions used sacred marriage imagery for inner integration. Jung echoed this as coniunctio — the psyche attempting to reconcile divided parts into a fuller self.',
    metaTitle: 'Wedding dream? Commitment panic or real desire?',
    metaDescription:
      'Happy ceremony scenes suggest alignment. Missing the wedding points to ambivalence. Unknown partner dreams signal identity integration, not random romance.',
    caseStudies: [
      {
        title: 'Your own joyful wedding',
        description:
          'Alignment signal. You are ready to commit to a path, person, or identity upgrade.',
      },
      {
        title: 'Chaos before the ceremony',
        description:
          'Ambivalence is active. Part of you wants union, part of you fears loss of freedom.',
      },
      {
        title: 'Marrying someone unexpected',
        description:
          'Symbolic union. You are integrating unfamiliar qualities into your self-concept.',
      },
      {
        title: 'Watching someone else get married',
        description:
          'Projection scene. You are observing commitment dynamics you are not yet ready to embody directly.',
      },
    ],
    relatable: [
      'A major life decision is approaching and feels emotionally binding.',
      'You are renegotiating independence inside a close relationship.',
      'You crave deeper commitment but fear choosing wrong and losing options.',
    ],
  },
  {
    slug: 'flying-dream',
    name: 'Flying Dream',
    keyword: 'flying dream',
    symbol: 'freedom drive and perspective expansion',
    sensory: 'weightlessness in your stomach and wind pushing past your ears',
    focus: 'the desire to rise above pressure without disconnecting from reality',
    actionTip: 'Today, create one hour without obligations or notifications. Protect it like an appointment with your future self.',
    tradition:
      'Shamanic and mystical traditions treated flight dreams as soul mobility and expanded perception. Later European dream books tied effortless flight to success and difficult flight to burden. Jung saw flying as transcendence impulses seeking integration with grounded life.',
    metaTitle: 'Flying dream? You need space, now',
    metaDescription:
      'Easy flight = confidence and momentum. Struggling to stay up = pressure overload. Falling from flight points to fear of losing control.',
    caseStudies: [
      {
        title: 'Effortless soaring over landscapes',
        description:
          'Confidence and perspective are high. You are seeing options beyond daily noise.',
      },
      {
        title: 'Flying but barely staying up',
        description:
          'Freedom desire exists, but exhaustion and responsibility keep dragging you down.',
      },
      {
        title: 'Flying to escape danger',
        description:
          'You need distance from a stressful dynamic before you can think clearly.',
      },
      {
        title: 'Losing flight and dropping',
        description:
          'Fear of failure after progress. Success feels fragile and triggers control anxiety.',
      },
    ],
    relatable: [
      'You are overbooked and craving psychological oxygen.',
      'You know your potential is bigger than your current routine.',
      'You need distance from expectation-heavy environments.',
    ],
  },
  {
    slug: 'house-dream',
    name: 'House Dream',
    keyword: 'house dream',
    symbol: 'the structure of your psyche and personal life systems',
    sensory: 'hallways you know and strange new rooms appearing overnight',
    focus: 'which inner spaces are maintained, ignored, or locked away',
    actionTip: 'Today, reset one literal room or corner. External order helps your nervous system hear internal signals.',
    tradition:
      'From Roman domus symbolism to Victorian dream manuals, houses represented the self in layered form. Basements signaled hidden drives, attics higher thought, kitchens nourishment and power. Jungian dreamwork uses house imagery as one of the clearest maps of personality structure.',
    metaTitle: 'House dream? Your inner life needs repairs',
    metaDescription:
      'New rooms suggest emerging potential. Broken rooms show neglected needs. Intruders signal boundary stress. Your house dream is a self-map.',
    caseStudies: [
      {
        title: 'Discovering a new room',
        description:
          'Untapped capacity. You are meeting a part of yourself that was dormant before.',
      },
      {
        title: 'House is falling apart',
        description:
          'Systems fatigue. The routines holding you together need reinforcement or redesign.',
      },
      {
        title: 'Being locked out of your house',
        description:
          'Alienation from self. You are disconnected from your own priorities and rhythms.',
      },
      {
        title: 'Someone breaks into your house',
        description:
          'Boundary violation theme. External demands are invading protected emotional space.',
      },
    ],
    relatable: [
      'You are restructuring routines, roles, or living arrangements.',
      'You keep caring for everyone else while your own baseline needs slip.',
      'You sense internal misalignment but have not paused to map it.',
    ],
  },
  {
    slug: 'thief-dream',
    name: 'Thief Dream',
    keyword: 'thief dream',
    symbol: 'boundary breaches, trust fear, and lost agency',
    sensory: 'the shock of missing valuables and that instant surge of violation',
    focus: 'where your energy is being taken without consent',
    actionTip: 'Today, say one clear no where you usually over-explain. Boundaries stop emotional theft faster than analysis.',
    tradition:
      'Old European dream books saw thieves as warnings about false allies and carelessness of valuables. Esoteric traditions expanded valuables to include time, vitality, and reputation. Jungian framing points to inner thieves too — self-sabotage patterns that steal your own momentum.',
    metaTitle: 'Thief dream? Something feels stolen from you',
    metaDescription:
      'Home robbery dreams flag boundary violations. Catching the thief signals reclaimed power. Being unable to move suggests learned helplessness.',
    caseStudies: [
      {
        title: 'Someone steals your wallet or phone',
        description:
          'Identity and communication insecurity. You fear losing control over what represents you.',
      },
      {
        title: 'Watching a thief but unable to stop them',
        description:
          'Powerlessness script. You see the problem clearly but feel blocked from intervention.',
      },
      {
        title: 'Catching the thief',
        description:
          'Agency returning. You are ready to confront patterns or people draining your resources.',
      },
      {
        title: 'You become the thief',
        description:
          'Compensatory dream. A denied need for control or desire is pushing through shadow behavior.',
      },
    ],
    relatable: [
      'You are overgiving at work or in relationships and feeling resentful.',
      'Trust was recently shaken by a lie, omission, or inconsistency.',
      'You feel your time and attention are constantly hijacked.',
    ],
  },
  {
    slug: 'car-accident-dream',
    name: 'Car Accident Dream',
    keyword: 'car accident dream',
    symbol: 'loss of control, speed anxiety, and course correction',
    sensory: 'screeching brakes, impact shock, and frozen seconds before collision',
    focus: 'the conflict between urgency and sustainable pacing',
    actionTip: 'Today, cancel one nonessential commitment and create margin. Control returns when velocity drops.',
    tradition:
      'Modern dream dictionaries replaced horse omens with vehicle symbolism: the car as life direction and autonomy. Crash imagery became the archetype for forced pause. Depth psychology reads collisions as psyche interventions when conscious pace ignores internal limits.',
    metaTitle: "Car crash dream? You're moving too fast somewhere",
    metaDescription:
      'Driving too fast in dreams warns of overload. Being a passenger shows control issues. Surviving the crash points to resilience and reset.',
    caseStudies: [
      {
        title: 'You cause the accident',
        description:
          'Responsibility pressure is high. You fear one mistake could have outsized consequences.',
      },
      {
        title: 'Someone else crashes into you',
        description:
          'External disruption theme. Another person or system is destabilizing your plans.',
      },
      {
        title: 'Brakes fail before impact',
        description:
          'No-stop signal. You have lost confidence in your ability to slow down commitments.',
      },
      {
        title: 'Walking away from the crash',
        description:
          'Recovery script. You can survive disruption and rebuild smarter structure.',
      },
    ],
    relatable: [
      'You are overcommitted and running on adrenaline.',
      'A project or relationship is accelerating beyond your comfort zone.',
      'You need to reclaim control of direction instead of reacting to urgency.',
    ],
  },
  {
    slug: 'cat-dream',
    name: 'Cat Dream',
    keyword: 'cat dream',
    symbol: 'intuition, independence, and subtle boundaries',
    sensory: 'silent paws, glowing eyes, and a presence that watches before it moves',
    focus: 'trusting your instincts without isolating from connection',
    actionTip: 'Today, follow one quiet instinct immediately instead of polling everyone first.',
    tradition:
      'Egyptian culture revered cats as guardians linked to Bastet, protector of home and feminine power. Medieval Europe swung between sacred and suspicious readings, reflecting fear of untamed intuition. Jung would place the cat near anima symbolism: instinctive knowing that resists control.',
    metaTitle: 'Cat dream? Your intuition is awake and moody',
    metaDescription:
      'Friendly cat means intuitive alignment. Aggressive cat signals boundary tension. Missing cat dreams point to disconnection from your inner compass.',
    caseStudies: [
      {
        title: 'A calm cat approaches you',
        description:
          'Intuition is available. You are in a phase where subtle cues are trustworthy.',
      },
      {
        title: 'A cat scratches or bites',
        description:
          'Boundary warning. You ignored discomfort signals and your psyche escalated the message.',
      },
      {
        title: 'Searching for a lost cat',
        description:
          'You are trying to recover independence or self-trust that got sidelined.',
      },
      {
        title: 'Many cats surrounding you',
        description:
          'Overstimulation by competing instincts. Too many options are diluting decisive action.',
      },
    ],
    relatable: [
      'You need stronger boundaries around energy and availability.',
      'You know the right move quietly but keep overriding it with logic loops.',
      'You are reclaiming independence after people-pleasing fatigue.',
    ],
  },
  {
    slug: 'dog-dream',
    name: 'Dog Dream',
    keyword: 'dog dream',
    symbol: 'loyalty, protection, and relational trust',
    sensory: 'warm fur, alert barking, and immediate emotional recognition',
    focus: 'where trust feels safe versus where loyalty has become self-betrayal',
    actionTip: 'Today, reinforce one loyal relationship and reassess one one-sided bond. Loyalty needs discernment.',
    tradition:
      'Greek myth placed dogs at thresholds — guardians between worlds. Medieval imagery tied dogs to fidelity and moral instinct. Jungian perspectives see dogs as relational instinct and protective drive, revealing how you handle attachment and defense.',
    metaTitle: 'Dog dream? Loyalty, protection, and boundary tests',
    metaDescription:
      'Friendly dog dreams suggest support. Barking dogs flag alerts you ignored. Dog attacks can point to trust wounds or boundary breaches.',
    caseStudies: [
      {
        title: 'A friendly dog follows you',
        description:
          'Support is available. You are not as alone as your stress says you are.',
      },
      {
        title: 'A dog barks aggressively',
        description:
          'Warning signal. Your system detects something off in an environment or relationship.',
      },
      {
        title: 'Being bitten by a dog',
        description:
          'Trust injury theme. Loyalty expectations were broken and the wound is still active.',
      },
      {
        title: 'Losing your dog',
        description:
          'Fear of losing protection or belonging. You may be grieving stability itself.',
      },
    ],
    relatable: [
      'You are evaluating who is truly on your side.',
      'A recent betrayal made you question your judgment.',
      'You are learning to balance kindness with self-protection.',
    ],
  },
  {
    slug: 'deceased-dream',
    name: 'Deceased Loved One Dream',
    keyword: 'deceased loved one dream',
    symbol: 'continuing bonds, grief integration, and emotional guidance',
    sensory: 'their voice feeling unmistakably real, then the ache when you wake',
    focus: 'how love continues while life moves forward',
    actionTip: 'Today, honor them with one concrete action they valued. Let memory become behavior, not only longing.',
    tradition:
      'Ancestor traditions across cultures treated visitation dreams as meaningful contact, not pathology. Medieval Christian writings described the dead appearing to comfort or correct the living. Jungian thought frames such dreams as living memory complexes carrying wisdom, grief, and unfinished feeling.',
    metaTitle: 'Dream of the deceased? Love still has a voice',
    metaDescription:
      'Peaceful visits can aid grief integration. Distressing scenes may reflect guilt or unresolved pain. Your deceased dream often carries relational meaning.',
    caseStudies: [
      {
        title: 'They appear calm and smiling',
        description:
          'Soothing integration scene. Your grief process is making room for peace alongside sadness.',
      },
      {
        title: 'They warn you about something',
        description:
          'The warning often mirrors your own intuition using their trusted voice as delivery.',
      },
      {
        title: 'You cannot reach or hear them',
        description:
          'Distance grief. You are longing for closure that cannot happen in literal conversation.',
      },
      {
        title: 'You relive their final moments',
        description:
          'Traumatic memory loop. This needs gentle processing, not suppression.',
      },
    ],
    relatable: [
      'An anniversary, place, or life milestone reactivated grief material.',
      'You are making decisions and missing their perspective deeply.',
      'You need permission to keep loving them while re-entering life fully.',
    ],
  },
  {
    slug: 'rainbow-dream',
    name: 'Rainbow Dream',
    keyword: 'rainbow dream',
    symbol: 'hope after emotional weather and integrative healing',
    sensory: 'sudden color after gray sky, that breath-out moment of relief',
    focus: 'trusting improvement without pretending the storm never happened',
    actionTip: 'Today, mark one sign of progress you usually dismiss. Evidence of healing matters when motivation dips.',
    tradition:
      'In Biblical and global mythic symbolism, rainbows signified covenant after upheaval. Folk dream traditions interpreted them as peace after conflict and favor after endurance. Jungian lens: rainbow imagery can symbolize psychic integration — opposites held in one arc.',
    metaTitle: 'Rainbow dream? Hope is real, but so is timing',
    metaDescription:
      'Rainbow after rain signals recovery. Faded rainbow can mean fragile optimism. Chasing a rainbow points to goals needing grounded steps.',
    caseStudies: [
      {
        title: 'Bright rainbow after a storm',
        description:
          'Recovery is active. Emotional weather is clearing and perspective is returning.',
      },
      {
        title: 'Double rainbow in the sky',
        description:
          'Amplified affirmation pattern. Two life areas may be improving at once.',
      },
      {
        title: 'Rainbow fading quickly',
        description:
          'You fear hope will vanish. Stabilize progress with routine, not mood.',
      },
      {
        title: 'Trying to reach the rainbow',
        description:
          'Aspirational drive is strong, but the dream asks for practical milestones.',
      },
    ],
    relatable: [
      'You are coming out of burnout, heartbreak, or prolonged uncertainty.',
      'You need proof that effort has not been wasted.',
      'You are rebuilding optimism while still carrying caution.',
    ],
  },
  {
    slug: 'lottery-dream',
    name: 'Lottery Dream',
    keyword: 'lottery dream',
    symbol: 'desire for sudden relief and compressed possibility',
    sensory: 'heart racing at the ticket numbers before reality catches up',
    focus: 'the pull between strategic effort and fantasy rescue',
    actionTip: 'Today, create one realistic "luck system": a weekly action that increases opportunity instead of waiting for miracles.',
    tradition:
      'Fortune dreams in Renaissance Europe were read as appetite omens: what the soul most craved would appear as sudden treasure. Modern depth psychology sees lottery imagery as compensation when life feels constrained. The dream is less about gambling and more about your relationship to agency and hope.',
    metaTitle: 'Lottery dream? Desire is louder than logic',
    metaDescription:
      'Winning the lottery in dreams can mean untapped potential. Losing tickets can mean self-sabotage fear. This dream maps your hope strategy.',
    caseStudies: [
      {
        title: 'Winning a huge jackpot',
        description:
          'Your psyche is simulating instant freedom from pressure. Name which pressure specifically.',
      },
      {
        title: 'Losing the winning ticket',
        description:
          'Fear of missing your shot. You may doubt your ability to hold success.',
      },
      {
        title: 'Numbers almost match',
        description:
          'Near-miss anxiety. You are close to change but still negotiating commitment.',
      },
      {
        title: 'Buying tickets repeatedly',
        description:
          'Repetition points to hope without structure. Desire needs a plan to become result.',
      },
    ],
    relatable: [
      'You feel trapped by finances, schedule, or role constraints.',
      'You crave a breakthrough and are tired of incremental progress.',
      'You need to convert wishful thinking into repeatable action.',
    ],
  },
  {
    slug: 'hair-dream',
    name: 'Hair Dream',
    keyword: 'hair dream',
    symbol: 'identity, attractiveness, and personal power display',
    sensory: 'strands in your hands, texture shifts, and panic at the mirror',
    focus: 'control over how you are seen versus who you are becoming',
    actionTip: 'Today, stop editing yourself for one conversation. Show up as you are and track what happens.',
    tradition:
      'Biblical and classical stories linked hair with strength, status, and vow. Folk dream books read hair loss as prestige anxiety and hair growth as vitality return. Jungian interpretation points to persona shifts: how the social self is changing under pressure.',
    metaTitle: 'Hair dream? Identity shifts are already happening',
    metaDescription:
      'Hair falling out reflects control anxiety. Cutting hair can mean intentional reset. Tangled hair points to mental overload and unresolved decisions.',
    caseStudies: [
      {
        title: 'Hair falling out in clumps',
        description:
          'Acute stress signal. You feel like control is slipping in visible ways.',
      },
      {
        title: 'Cutting your own hair',
        description:
          'Agency move. You are reclaiming authorship over identity and presentation.',
      },
      {
        title: 'Hair suddenly long and healthy',
        description:
          'Vitality and confidence are rebuilding, often after a draining period.',
      },
      {
        title: 'Knotted or tangled hair',
        description:
          'Cognitive clutter. Too many unresolved threads are consuming bandwidth.',
      },
    ],
    relatable: [
      'You are changing roles and unsure how to present yourself now.',
      'You feel judged on appearance, competence, or social image.',
      'Stress has begun showing up through your body and self-perception.',
    ],
  },
  {
    slug: 'blood-dream',
    name: 'Blood Dream',
    keyword: 'blood dream',
    symbol: 'life force, injury, and emotional cost',
    sensory: 'metallic smell, vivid red, and urgency that jolts you awake',
    focus: 'where your energy is leaking versus where healing must begin',
    actionTip: 'Today, identify one energy leak and close it before noon. Your stamina is a non-renewable daily budget.',
    tradition:
      'Ancient sources viewed blood as sacred vitality and covenant substance, making blood dreams serious but not always negative. Medieval interpreters linked bleeding dreams to loss, guilt, or sacrifice. Jungian reading: blood marks psychic cost and the need to restore living energy.',
    metaTitle: 'Blood dream? Your energy bill just came due',
    metaDescription:
      'Bleeding in dreams can signal depletion, guilt, or urgent healing. Blood on hands points to responsibility themes. The image asks where vitality is draining.',
    caseStudies: [
      {
        title: 'You are bleeding and cannot stop it',
        description:
          'Ongoing drain. A stressor keeps taking more than you can replenish.',
      },
      {
        title: 'Seeing someone else bleed',
        description:
          'Empathic overload or relational concern. You may be carrying pain that is not fully yours.',
      },
      {
        title: 'Blood on your hands',
        description:
          'Responsibility and guilt themes. You fear your choices harmed someone or something important.',
      },
      {
        title: 'Menstrual blood in the dream',
        description:
          'Cycle intelligence. The dream may be signaling renewal through release and bodily truth.',
      },
    ],
    relatable: [
      'You are exhausted and still acting like you have unlimited capacity.',
      'You feel responsible for outcomes beyond your true control.',
      'You need immediate recovery practices, not future promises.',
    ],
  },
  {
    slug: 'earthquake-dream',
    name: 'Earthquake Dream',
    keyword: 'earthquake dream',
    symbol: 'foundation shock and forced restructuring',
    sensory: 'ground shaking under your feet while everything familiar tilts',
    focus: 'safety needs colliding with unavoidable change',
    actionTip: 'Today, stabilize your basics: sleep plan, meals, and one priority list. Ground first, then vision.',
    tradition:
      'Ancient omen literature treated earthquakes as cosmic correction signals when order was out of balance. Later dream lore interpreted them as personal upheaval and social instability. Jungian language sees quake dreams as deep structural change in the psyche demanding reorganization.',
    metaTitle: 'Earthquake dream? Your foundation is moving',
    metaDescription:
      'Collapsing buildings in dreams reflect unstable structures in life. Surviving the quake points to resilience. Aftershock dreams show ongoing uncertainty.',
    caseStudies: [
      {
        title: 'Trying to stand during the quake',
        description:
          'You are fighting instability directly and need stronger support systems.',
      },
      {
        title: 'House collapsing from shaking',
        description:
          'An old life structure can no longer hold current reality.',
      },
      {
        title: 'Quake ends and silence follows',
        description:
          'Transition complete. Now comes integration and rebuilding.',
      },
      {
        title: 'Repeated aftershocks',
        description:
          'Ongoing uncertainty. Your system remains hypervigilant after a major disruption.',
      },
    ],
    relatable: [
      'A breakup, layoff, move, or major health concern disrupted your baseline.',
      'You are outgrowing a life structure that once felt safe.',
      'You need practical grounding while identity and plans update.',
    ],
  },
  {
    slug: 'ocean-dream',
    name: 'Ocean Dream',
    keyword: 'ocean dream',
    symbol: 'depth emotion, vast potential, and surrender to scale',
    sensory: 'salt air, endless horizon, and the pull of waves larger than you',
    focus: 'trusting emotional depth without getting swallowed by it',
    actionTip: 'Today, take one long walk without input and let one buried feeling fully surface. No multitasking while you feel.',
    tradition:
      'Seafaring cultures treated ocean dreams as destiny weather reports: calm seas for aligned passage, storms for unresolved conflict. Mystical traditions saw oceans as the collective unconscious itself. Jung used sea imagery for archetypal depth beyond ego control.',
    metaTitle: 'Ocean dream? Your depth is asking to be felt',
    metaDescription:
      'Calm ocean dreams suggest emotional trust. Stormy seas mark inner turbulence. Drowning can signal overwhelm; floating can signal surrender.',
    caseStudies: [
      {
        title: 'Standing at a calm shoreline',
        description:
          'You are approaching deep feelings with readiness and respect.',
      },
      {
        title: 'Caught in a violent storm at sea',
        description:
          'Emotional turbulence is outpacing your regulation strategies.',
      },
      {
        title: 'Diving deep underwater',
        description:
          'You are willing to explore subconscious material and hidden motives.',
      },
      {
        title: 'Lost on open ocean',
        description:
          'Direction anxiety. Vast options are present, but orientation is weak.',
      },
    ],
    relatable: [
      'You are in a life phase with big feelings and no simple map.',
      'You need more emotional honesty than your current routines allow.',
      'You are sensing huge potential and equally huge uncertainty.',
    ],
  },
  {
    slug: 'moon-dream',
    name: 'Moon Dream',
    keyword: 'moon dream',
    symbol: 'intuition cycles, hidden truth, and inner rhythm',
    sensory: 'silver light on everything, quiet night clarity, and magnetic stillness',
    focus: 'aligning with your own timing instead of external urgency',
    actionTip: 'Today, plan around your energy rhythm, not just your calendar. Put your hardest task where your mind is naturally sharpest.',
    tradition:
      'Lunar symbolism has long represented the feminine, cyclical wisdom, and hidden guidance in Greek, Roman, and esoteric traditions. Dream books often linked full moon visions with revelation and new moon visions with incubation. Jung saw moon imagery as anima and unconscious guidance becoming visible.',
    metaTitle: 'Moon dream? Your hidden self wants stage time',
    metaDescription:
      'Full moon dreams often signal clarity. Dark moon dreams suggest inner reset. Eclipsed moon imagery can mark blocked intuition or mixed signals.',
    caseStudies: [
      {
        title: 'Watching a bright full moon',
        description:
          'Revelation phase. A truth is becoming undeniable in a calm, clear way.',
      },
      {
        title: 'Moon disappearing behind clouds',
        description:
          'Intuition is present but temporarily obscured by noise or fear.',
      },
      {
        title: 'Red or unusual moon',
        description:
          'High emotional charge. Instinct and mood are intensifying together.',
      },
      {
        title: 'Walking by moonlight',
        description:
          'Trust-the-process pattern. You can move forward even without full daylight certainty.',
      },
    ],
    relatable: [
      'You are recalibrating to your own pace after burnout or overextension.',
      'You keep receiving intuitive nudges and ignoring them for logic alone.',
      'A hidden truth in love, work, or self-image is surfacing.',
    ],
  },
  {
    slug: 'gift-dream',
    name: 'Gift Dream',
    keyword: 'gift dream',
    symbol: 'receiving value, reciprocity, and readiness to accept support',
    sensory: 'the weight of a wrapped box and curiosity before opening it',
    focus: 'your comfort level with receiving versus always proving',
    actionTip: 'Today, accept one offer of help without minimizing it. Receiving is a skill, not a weakness.',
    tradition:
      'Dream folklore often treated gifts as fate offerings that reveal future themes through the object itself. In religious symbolism, gifts imply grace and responsibility together. Jungian thought sees gifts in dreams as compensatory resources from the unconscious to restore balance.',
    metaTitle: "Gift dream? Receive what you've been resisting",
    metaDescription:
      'Receiving a gift can signal readiness for support. Refusing a gift may show mistrust or unworthiness themes. The object reveals the message.',
    caseStudies: [
      {
        title: 'Receiving a beautiful gift',
        description:
          'You are ready for support and recognition, even if your habit is self-reliance.',
      },
      {
        title: 'Gift box is empty',
        description:
          'Expectation mismatch. You fear promises will not be honored.',
      },
      {
        title: 'Giving someone a gift',
        description:
          'You are offering value, affection, or repair and wanting it received clearly.',
      },
      {
        title: 'A strange or unsettling gift',
        description:
          'Unconscious material arriving in symbolic form. The discomfort is the clue, not an error.',
      },
    ],
    relatable: [
      'You are learning to receive care without guilt.',
      'You are questioning whether reciprocity exists in key relationships.',
      'You have resources available but keep acting like you are alone.',
    ],
  },
  {
    slug: 'love-dream',
    name: 'Love Dream',
    keyword: 'love dream',
    symbol: 'attachment desire, vulnerability, and emotional truth',
    sensory: 'heart warmth, eye contact, and that ache of being fully seen',
    focus: 'the need for intimacy without abandoning personal boundaries',
    actionTip: 'Today, communicate one feeling directly without testing or guessing games. Clarity is intimacy.',
    tradition:
      'Courtly and mystical traditions often treated love dreams as mirrors of soul longing rather than literal predictions. Greek myth linked dream love encounters to Aphrodite themes of desire and consequence. Jung would frame love dreams as anima/animus dynamics seeking integration through relationship.',
    metaTitle: 'Love dream? Your heart is naming the truth',
    metaDescription:
      'Dream love can reflect unmet needs, real desire, or healing attachment patterns. Rejection scenes show fear; mutual warmth shows readiness.',
    caseStudies: [
      {
        title: 'Mutual romantic connection',
        description:
          'Readiness pattern. You are emotionally available enough to share and receive.',
      },
      {
        title: 'Confessing love and being rejected',
        description:
          'Exposure fear. Vulnerability feels dangerous because old wounds are still active.',
      },
      {
        title: 'Falling in love with a stranger',
        description:
          'Projected qualities. You are meeting traits you want to integrate in yourself.',
      },
      {
        title: 'Losing the person you love',
        description:
          'Attachment anxiety. The dream asks for security-building behaviors, not panic.',
      },
    ],
    relatable: [
      'You want deeper connection but fear rejection or engulfment.',
      'Past relationship pain still shapes present reactions.',
      'You are ready to practice honest affection with adult boundaries.',
    ],
  },
  {
    slug: 'romance-dream',
    name: 'Romance Dream',
    keyword: 'romance dream',
    symbol: 'desire for emotional spark and relational renewal',
    sensory: 'charged chemistry, meaningful glances, and cinematic emotional intensity',
    focus: 'balancing fantasy with the daily reality of sustainable love',
    actionTip: 'Today, add one intentional romantic gesture to real life, even if small. Desire grows where attention goes.',
    tradition:
      'Romance motifs in dream lore often represented Venusian themes: attraction, creativity, pleasure, and selective illusion. Poetic traditions treated romantic dreams as letters from longing. Jungian analysis sees romance dreams as encounters with idealized inner figures that can inspire or distort.',
    metaTitle: "Romance dream? You're craving spark and safety",
    metaDescription:
      'Intense romance dreams can reveal longing, novelty hunger, or unmet emotional needs. Repeated scenes suggest a pattern asking for conscious choice.',
    caseStudies: [
      {
        title: 'Romantic date with someone unknown',
        description:
          'Novelty hunger. You want freshness, play, and emotional aliveness back in your life.',
      },
      {
        title: 'Secret romance in the dream',
        description:
          'Hidden desire or hidden fear. You may be splitting public duty from private longing.',
      },
      {
        title: 'Perfect romance that vanishes',
        description:
          'Idealization pattern. The dream highlights desire while exposing fear of impermanence.',
      },
      {
        title: 'Romance with a current partner feels new',
        description:
          'Renewal signal. Your bond is asking for conscious tending, not passive maintenance.',
      },
    ],
    relatable: [
      'Routine replaced passion and you miss feeling emotionally alive.',
      'You crave deeper intimacy but hide behind productivity and busyness.',
      'You are ready to choose love as practice, not just mood.',
    ],
  },
]

const relatedDreamMap: Record<string, string[]> = {
  'snake-dream': ['water-dream', 'tiger-dream', 'chasing-dream', 'money-dream', 'deceased-dream'],
  'teeth-dream': ['hair-dream', 'blood-dream', 'ghost-dream', 'death-dream', 'exam-dream'],
  'chasing-dream': ['ghost-dream', 'car-accident-dream', 'exam-dream', 'thief-dream', 'snake-dream'],
  'money-dream': ['lottery-dream', 'poop-dream', 'snake-dream', 'gift-dream', 'house-dream'],
  'pregnancy-dream': ['baby-dream', 'wedding-dream', 'moon-dream', 'water-dream', 'house-dream'],
  'water-dream': ['ocean-dream', 'snake-dream', 'death-dream', 'rainbow-dream', 'moon-dream'],
  'death-dream': ['deceased-dream', 'ghost-dream', 'teeth-dream', 'water-dream', 'earthquake-dream'],
  'exam-dream': ['chasing-dream', 'teeth-dream', 'car-accident-dream', 'money-dream', 'gift-dream'],
  'ghost-dream': ['deceased-dream', 'death-dream', 'chasing-dream', 'teeth-dream', 'moon-dream'],
  'ex-dream': ['romance-dream', 'wedding-dream', 'love-dream', 'chasing-dream', 'ghost-dream'],
  'poop-dream': ['money-dream', 'lottery-dream', 'snake-dream', 'gift-dream', 'baby-dream'],
  'fire-dream': ['house-dream', 'earthquake-dream', 'death-dream', 'snake-dream', 'moon-dream'],
  'tiger-dream': ['snake-dream', 'dog-dream', 'cat-dream', 'chasing-dream', 'flying-dream'],
  'baby-dream': ['pregnancy-dream', 'wedding-dream', 'cat-dream', 'gift-dream', 'moon-dream'],
  'wedding-dream': ['romance-dream', 'ex-dream', 'pregnancy-dream', 'love-dream', 'gift-dream'],
  'flying-dream': ['ocean-dream', 'rainbow-dream', 'moon-dream', 'house-dream', 'chasing-dream'],
  'house-dream': ['fire-dream', 'earthquake-dream', 'thief-dream', 'water-dream', 'ghost-dream'],
  'thief-dream': ['chasing-dream', 'money-dream', 'house-dream', 'dog-dream', 'ghost-dream'],
  'car-accident-dream': ['chasing-dream', 'death-dream', 'water-dream', 'exam-dream', 'flying-dream'],
  'cat-dream': ['dog-dream', 'snake-dream', 'baby-dream', 'ghost-dream', 'moon-dream'],
  'dog-dream': ['cat-dream', 'tiger-dream', 'thief-dream', 'deceased-dream', 'baby-dream'],
  'deceased-dream': ['ghost-dream', 'death-dream', 'gift-dream', 'moon-dream', 'love-dream'],
  'rainbow-dream': ['moon-dream', 'flying-dream', 'ocean-dream', 'gift-dream', 'baby-dream'],
  'lottery-dream': ['money-dream', 'poop-dream', 'snake-dream', 'gift-dream', 'rainbow-dream'],
  'hair-dream': ['teeth-dream', 'blood-dream', 'water-dream', 'moon-dream', 'cat-dream'],
  'blood-dream': ['death-dream', 'teeth-dream', 'hair-dream', 'water-dream', 'fire-dream'],
  'earthquake-dream': ['house-dream', 'fire-dream', 'death-dream', 'ocean-dream', 'chasing-dream'],
  'ocean-dream': ['water-dream', 'moon-dream', 'flying-dream', 'rainbow-dream', 'snake-dream'],
  'moon-dream': ['ocean-dream', 'rainbow-dream', 'baby-dream', 'deceased-dream', 'love-dream'],
  'gift-dream': ['money-dream', 'love-dream', 'baby-dream', 'wedding-dream', 'deceased-dream'],
  'love-dream': ['romance-dream', 'ex-dream', 'wedding-dream', 'deceased-dream', 'gift-dream'],
  'romance-dream': ['love-dream', 'ex-dream', 'wedding-dream', 'baby-dream', 'flying-dream'],
}

const dreamData: Record<string, DreamEntry> = Object.fromEntries(
  dreamConfigs.map((config) => [
    config.slug,
    {
      title: config.metaTitle,
      description: config.metaDescription,
      content: buildDreamContent(config),
    },
  ])
)

export function generateStaticParams() {
  return dreamConfigs.map((config) => ({ slug: config.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const dream = dreamData[params.slug]
  if (!dream) return {}
  return { title: dream.title, description: dream.description }
}

export default function DreamDetailPage({ params }: { params: { slug: string } }) {
  const config = dreamConfigs.find((item) => item.slug === params.slug)

  if (!config) {
    notFound()
  }

  const faqs = buildFAQs(config)
  const relatedDreams = (relatedDreamMap[config.slug] || [])
    .map((slug) => dreamConfigs.find((item) => item.slug === slug))
    .filter((item): item is DreamConfig => Boolean(item))

  const questionName = config.name.toLowerCase().replace(' dream', '')

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Link href="/" className="inline-flex text-sm text-white/65 hover:text-white/90 transition-colors">
        ← Back to home
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold text-amber-100 tracking-tight">{config.name} Interpretation</h1>

      <div className="flex items-end gap-2 justify-end">
        <div className="max-w-[85%] px-4 py-3 text-sm leading-relaxed bg-amber-600/85 text-white rounded-2xl rounded-br-md">
          I dreamed about {questionName} last night. What does it mean? 😅
        </div>
      </div>

      <div className="flex items-start gap-3">
        <AiAvatar />
        <div className="max-w-[92%] bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl rounded-bl-md p-4 space-y-3">
          <p className="text-white/90 text-sm leading-relaxed">
            Okay — this dream did not show up randomly. Something in your inner life is moving, and your sleep caught
            it before your daytime mind could explain it.
          </p>
          <p className="text-white/85 text-sm leading-relaxed">
            When this symbol appears, it usually points to{' '}
            <span className="text-amber-300 font-medium">{config.symbol}</span>. That is your subconscious naming the
            real theme behind the storyline.
          </p>
          <p className="text-white/85 text-sm leading-relaxed">
            If you can still feel <span className="text-amber-200 italic">{config.sensory}</span>, treat that like a
            highlighted sentence. Not random noise. Not nothing. A direct signal.
          </p>
        </div>
      </div>

      <SectionCard label="Scenario Breakdown" icon="🔍">
        <div className="grid sm:grid-cols-2 gap-3">
          {config.caseStudies.map((item) => (
            <div key={item.title} className="rounded-xl bg-slate-900/55 border border-white/[0.08] p-3">
              <p className="text-amber-200 text-sm font-semibold mb-1.5">{item.title}</p>
              <p className="text-white/70 text-xs leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex items-start gap-3">
        <AiAvatar />
        <div className="max-w-[92%] bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl rounded-bl-md p-4 space-y-3">
          <p className="text-blue-300/70 text-xs font-semibold uppercase tracking-wide">🧠 Through a psychological lens</p>
          <p className="text-white/85 text-sm leading-relaxed">
            Freud would say dreams speak in disguise when daytime language feels too risky. So this is not just a random
            image. It is your mind staging a scene around <span className="text-blue-300">{config.focus}</span>.
          </p>
          <p className="text-white/85 text-sm leading-relaxed">
            Jung would add that recurring symbols are invitations, not threats. The psyche keeps sending this picture
            until you meet what it represents with honesty, boundaries, and action.
          </p>
        </div>
      </div>

      <div className="bg-amber-950/40 border border-amber-400/20 rounded-2xl p-4">
        <p className="text-amber-200/80 text-xs font-semibold uppercase tracking-wide mb-2">📜 In dream folklore</p>
        <p className="text-amber-50/85 text-sm leading-relaxed">{config.tradition}</p>
      </div>

      <div className="flex items-start gap-3">
        <AiAvatar />
        <div className="max-w-[92%] bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl rounded-bl-md p-4 space-y-3">
          <p className="text-purple-300/70 text-xs font-semibold uppercase tracking-wide">
            💭 People who commonly have this dream
          </p>
          <ul className="space-y-2">
            {config.relatable.map((item) => (
              <li key={item} className="text-white/85 text-sm leading-relaxed">
                ● {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <SectionCard label="Frequently Asked" icon="❓">
        <div className="space-y-3">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-xl bg-slate-900/55 border border-white/[0.08] p-3">
              <p className="text-amber-100 text-sm font-semibold mb-1.5">Q. {item.question}</p>
              <p className="text-white/75 text-sm leading-relaxed">A. {item.answer}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="bg-gradient-to-br from-amber-500/20 to-orange-700/20 border border-amber-300/25 rounded-2xl p-4 space-y-2.5">
        <p className="text-amber-200 text-xs font-semibold uppercase tracking-wide">✨ Today&apos;s takeaway</p>
        <p className="text-white/90 text-sm leading-relaxed">
          This dream is not here to scare you. It is here to make one truth harder to ignore. You do not need a life
          overhaul tonight. Just one honest move in the right direction.
        </p>
        <p className="text-white/90 text-sm leading-relaxed">💡 {config.actionTip}</p>
      </div>

      <DreamInput dreamName={config.name} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <SectionCard label="Related Dreams" icon="🔗">
        <div className="grid sm:grid-cols-2 gap-2">
          {relatedDreams.map((item) => (
            <Link
              key={item.slug}
              href={`/dream/${item.slug}`}
              className="px-3 py-2.5 rounded-lg bg-amber-900/20 hover:bg-amber-800/30 border border-amber-200/20 hover:border-amber-200/40 text-amber-50/90 text-sm transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </SectionCard>

      <div className="pt-2">
        <Link href="/" className="inline-flex text-sm text-white/65 hover:text-white/90 transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  )
}
