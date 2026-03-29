import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Get all new regulations not yet notified
    const newRegs = await base44.asServiceRole.entities.Regulation.filter({ notified: false });
    if (!newRegs || newRegs.length === 0) {
      return Response.json({ success: true, message: "No new regulations to notify about" });
    }

    // Get all users
    const users = await base44.asServiceRole.entities.User.list();
    let emailsSent = 0;

    for (const user of users) {
      if (!user.email) continue;

      const userEntityType = user.entityType || "other";
      const userFunction = user.function || null;

      // Filter regulations relevant to this user
      const relevant = newRegs.filter(reg => {
        if (!reg.entity_relevance || reg.entity_relevance.length === 0) return true;
        return reg.entity_relevance.includes(userEntityType) || reg.entity_relevance.includes("other");
      });

      if (relevant.length === 0) continue;

      // Build email body
      const regList = relevant.map(reg => {
        const insight = userFunction && reg.function_insights?.[userFunction];
        return `
<div style="margin-bottom:24px;padding:16px;border:1px solid #e5e7eb;border-radius:8px;">
  <p style="margin:0 0 4px 0;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">${reg.source} · ${reg.date} · ${reg.topic}</p>
  <h3 style="margin:0 0 8px 0;font-size:15px;color:#111827;">${reg.title}</h3>
  <p style="margin:0 0 12px 0;font-size:13px;color:#374151;">${reg.summary}</p>
  ${insight ? `
  <div style="background:#f0f9ff;border-left:3px solid #00b4d8;padding:10px 14px;border-radius:0 6px 6px 0;">
    <p style="margin:0 0 4px 0;font-size:12px;font-weight:600;color:#0077a8;">What this means for you (${userFunction})</p>
    <p style="margin:0;font-size:12px;color:#374151;">${insight.headline}</p>
  </div>` : ''}
  ${reg.url ? `<p style="margin:8px 0 0 0;"><a href="${reg.url}" style="font-size:12px;color:#00b4d8;">View source →</a></p>` : ''}
</div>`;
      }).join('');

      const subject = relevant.length === 1
        ? `LetzComply Alert: ${relevant[0].title}`
        : `LetzComply: ${relevant.length} new regulatory updates for you`;

      await base44.asServiceRole.integrations.Core.SendEmail({
        to: user.email,
        subject,
        body: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9fafb;">
  <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#00b4d8,#e63946);padding:20px 24px;">
      <h1 style="margin:0;color:white;font-size:20px;font-weight:700;">LetzComply</h1>
      <p style="margin:4px 0 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Luxembourg Fund Regulation Monitor</p>
    </div>
    <div style="padding:24px;">
      <p style="margin:0 0 20px 0;font-size:14px;color:#374151;">Hi ${user.full_name || 'there'},</p>
      <p style="margin:0 0 20px 0;font-size:14px;color:#374151;">Here ${relevant.length === 1 ? 'is' : 'are'} <strong>${relevant.length} new regulatory update${relevant.length > 1 ? 's' : ''}</strong> relevant to your profile:</p>
      ${regList}
      <p style="margin:24px 0 0 0;font-size:12px;color:#9ca3af;">You're receiving this because you're registered on LetzComply.</p>
    </div>
  </div>
</body>
</html>`
      });

      emailsSent++;
    }

    // Mark all as notified
    for (const reg of newRegs) {
      await base44.asServiceRole.entities.Regulation.update(reg.id, { notified: true });
    }

    return Response.json({ success: true, emailsSent, regulationsNotified: newRegs.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});