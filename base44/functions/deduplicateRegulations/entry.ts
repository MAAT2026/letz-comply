import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const all = await base44.asServiceRole.entities.Regulation.list('-date', 200);

  const seen = new Map(); // key -> first record id
  const toDelete = [];

  for (const reg of all) {
    // Normalize title: lowercase, strip punctuation/extra spaces
    const key = reg.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
    if (seen.has(key)) {
      toDelete.push(reg.id);
    } else {
      seen.set(key, reg.id);
    }
  }

  for (const id of toDelete) {
    await base44.asServiceRole.entities.Regulation.delete(id);
  }

  return Response.json({ deleted: toDelete.length, remaining: all.length - toDelete.length });
});