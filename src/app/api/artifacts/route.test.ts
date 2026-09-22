import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GET } from './route';

test('catalog consumer follows pages and projects only gallery fields', async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ docs: [{ id: `tool-${calls}`, title: 'Tool', description: 'Description', category: 'tools', href: 'https://portal.raidguild.org/modules/tool', image: null, privateField: 'not forwarded' }], nextPage: calls === 1 ? 2 : null });
  };
  try {
    const response = await GET();
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.docs.length, 2);
    assert.equal(body.docs[0].image, null);
    assert.equal('privateField' in body.docs[0], false);
  } finally { globalThis.fetch = original; }
});

test('empty catalog stays empty and upstream errors are not cached', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => Response.json({ docs: [], nextPage: null });
    assert.deepEqual(await (await GET()).json(), { docs: [] });
    globalThis.fetch = async () => new Response(null, { status: 403 });
    const response = await GET();
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('cache-control'), 'no-store');
  } finally { globalThis.fetch = original; }
});

test('unsafe links fail closed', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ docs: [{ id: 'tool', title: 'Tool', description: 'Description', category: 'tools', href: 'javascript:alert(1)' }], nextPage: null });
  try { assert.equal((await GET()).status, 503); }
  finally { globalThis.fetch = original; }
});
