// Server-side catalog fetch keeps cross-origin concerns out of the gallery.
// Override only for development against a local Portal instance.
const endpoint = process.env.PORTAL_MODULE_CATALOG_URL || 'https://portal.raidguild.org/api/public/modules';

export async function GET() {
  try {
    const docs = [];
    let page: number | null = 1;
    for (let count = 0; page !== null && count < 1000; count++) {
      const url = new URL(endpoint);
      url.searchParams.set('page', String(page));
      const response = await fetch(url, { next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) });
      if (!response.ok) throw new Error('Catalog unavailable');
      const body = await response.json();
      if (!Array.isArray(body.docs)) throw new Error('Invalid catalog');
      for (const item of body.docs) {
        if (!item || typeof item.id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(item.id) || typeof item.title !== 'string' || typeof item.description !== 'string' || typeof item.category !== 'string') throw new Error('Invalid card');
        const href = new URL(item.href);
        if (href.protocol !== 'https:' || href.username || href.password) throw new Error('Unsafe link');
        const image = typeof item.image === 'string' && new URL(item.image).protocol === 'https:' ? item.image : null;
        docs.push({ id: item.id, title: item.title, description: item.description, category: item.category, image, href: href.href });
      }
      if (body.nextPage === null) page = null;
      else if (Number.isSafeInteger(body.nextPage) && body.nextPage > page!) page = body.nextPage;
      else throw new Error('Invalid pagination');
    }
    if (page !== null) throw new Error('Incomplete catalog');
    return Response.json({ docs }, { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=300' } });
  } catch {
    return Response.json({ error: 'Catalog temporarily unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
