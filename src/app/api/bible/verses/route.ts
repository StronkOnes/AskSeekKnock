import { NextRequest, NextResponse } from 'next/server';
import { bookMapping } from '@/lib/bible-mapping';

const bookAliases: Record<string, string> = {
  psalm: 'Psalms',
  ps: 'Psalms',
  '1 sam': '1 Samuel',
  '2 sam': '2 Samuel',
  '1 kgs': '1 Kings',
  '2 kgs': '2 Kings',
  '1 chr': '1 Chronicles',
  '2 chr': '2 Chronicles',
  '1 cor': '1 Corinthians',
  '2 cor': '2 Corinthians',
  '1 thes': '1 Thessalonians',
  '2 thes': '2 Thessalonians',
  '1 tim': '1 Timothy',
  '2 tim': '2 Timothy',
  '1 pet': '1 Peter',
  '2 pet': '2 Peter',
  '1 jn': '1 John',
  '1 jhn': '1 John',
  '2 jn': '2 John',
  '3 jn': '3 John',
  song: 'Song of Solomon',
  'song of sol': 'Song of Solomon',
  ecclesiastes: 'Ecclesiastes',
  deut: 'Deuteronomy',
  lev: 'Leviticus',
  num: 'Numbers',
  gen: 'Genesis',
  ex: 'Exodus',
  exod: 'Exodus',
  josh: 'Joshua',
  judg: 'Judges',
  ruth: 'Ruth',
  esth: 'Esther',
  prov: 'Proverbs',
  isa: 'Isaiah',
  jer: 'Jeremiah',
  lam: 'Lamentations',
  ezek: 'Ezekiel',
  dan: 'Daniel',
  hos: 'Hosea',
  joel: 'Joel',
  amos: 'Amos',
  obad: 'Obadiah',
  jonah: 'Jonah',
  mic: 'Micah',
  nah: 'Nahum',
  hab: 'Habakkuk',
  zeph: 'Zephaniah',
  hag: 'Haggai',
  zech: 'Zechariah',
  mal: 'Malachi',
  matt: 'Matthew',
  mat: 'Matthew',
  mk: 'Mark',
  lk: 'Luke',
  jn: 'John',
  jhn: 'John',
  rom: 'Romans',
  gal: 'Galatians',
  eph: 'Ephesians',
  phil: 'Philippians',
  col: 'Colossians',
  heb: 'Hebrews',
  jas: 'James',
  rev: 'Revelation',
};

const refRegex = /^(\d\s+)?([a-zA-Z]+(?:\s+[a-zA-Z]+)*)\s+(\d+):(\d+)$/;

function normalizeBookName(input: string): string | null {
  const clean = input.toLowerCase().trim().replace(/\s+/g, ' ');

  const reverseMapping: Record<string, string> = {};
  Object.values(bookMapping).forEach((name) => {
    reverseMapping[name.toLowerCase()] = name;
  });

  if (reverseMapping[clean]) return reverseMapping[clean];

  if (bookAliases[clean]) return bookAliases[clean];

  const parts = clean.split(' ');
  if (parts.length > 1) {
    const numberedKey = `${parts[0]} ${parts.slice(1).join(' ')}`;
    if (reverseMapping[numberedKey]) return reverseMapping[numberedKey];
  }

  return null;
}

function getBookId(bookName: string): string | null {
  const lower = bookName.toLowerCase().trim();
  for (const [id, name] of Object.entries(bookMapping)) {
    if (name.toLowerCase() === lower) return id;
  }
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword');
  const reference = searchParams.get('reference');
  const translation = searchParams.get('translation') || 'KJV';

  if (!keyword && !reference) {
    return NextResponse.json({ error: 'Keyword or reference is required' }, { status: 400 });
  }

  try {
    if (reference) {
      const match = reference.trim().match(refRegex);

      if (match) {
        const prefix = match[1]?.trim() || '';
        const bookNamePart = match[2].trim();
        const chapter = match[3];
        const verse = match[4];

        const fullBookName = prefix ? `${prefix} ${bookNamePart}` : bookNamePart;
        const normalized = normalizeBookName(fullBookName);

        if (normalized) {
          const bookId = getBookId(normalized);
          if (bookId) {
            const url = `https://bolls.life/get-verse/${translation}/${bookId}/${chapter}/${verse}/`;
            const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
            const data = await response.json();

            if (response.ok && data.text) {
              return NextResponse.json(data);
            }
          }
        }
      }

      const fallbackUrl = `https://bolls.life/search/${translation}/?search=${encodeURIComponent(reference)}`;
      const fallbackResponse = await fetch(fallbackUrl, { signal: AbortSignal.timeout(10000) });
      const fallbackData = await fallbackResponse.json();

      if (fallbackResponse.ok && Array.isArray(fallbackData) && fallbackData.length > 0) {
        const first = fallbackData[0];
        const bookName = first.book_name || bookMapping[first.book.toString()] || `Book ${first.book}`;
        return NextResponse.json({
          text: first.text,
          reference: `${bookName} ${first.chapter}:${first.verse}`,
        });
      }

      return NextResponse.json({ error: 'Verse not found' }, { status: 404 });
    }

    const url = `https://bolls.life/search/${translation}/?search=${encodeURIComponent(keyword)}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from Bible API' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
