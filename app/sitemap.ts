import type { MetadataRoute } from 'next'

const BASE_URL = 'https://dream-free-en.vercel.app'

const dreamSlugs = [
  'snake-dream',
  'teeth-dream',
  'chasing-dream',
  'money-dream',
  'pregnancy-dream',
  'water-dream',
  'death-dream',
  'exam-dream',
  'ghost-dream',
  'ex-dream',
  'poop-dream',
  'fire-dream',
  'tiger-dream',
  'baby-dream',
  'wedding-dream',
  'flying-dream',
  'house-dream',
  'thief-dream',
  'car-accident-dream',
  'cat-dream',
  'dog-dream',
  'deceased-dream',
  'rainbow-dream',
  'lottery-dream',
  'hair-dream',
  'blood-dream',
  'earthquake-dream',
  'ocean-dream',
  'moon-dream',
  'gift-dream',
  'love-dream',
  'romance-dream',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const dreamPages = dreamSlugs.map((slug) => ({
    url: `${BASE_URL}/dream/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...dreamPages,
  ]
}
