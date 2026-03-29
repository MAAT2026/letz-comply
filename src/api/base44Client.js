/**
 * Supabase client — replaces the old Base44 SDK client.
 *
 * Environment variables (set in .env or Vercel dashboard):
 *   VITE_SUPABASE_URL       – your Supabase project URL
 *   VITE_SUPABASE_ANON_KEY  – your Supabase anon/public key
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------------------------------------------------------------------------
// Compatibility shim — keeps existing code working with minimal changes.
// Every `base44.entities.X.list / create / update / delete` call and
// `base44.auth.*` call is routed through Supabase instead.
// ---------------------------------------------------------------------------

const makeEntityApi = (tableName) => ({
  async list(orderBy, limit = 100) {
    const ascending = orderBy && !orderBy.startsWith('-');
    const column = orderBy ? orderBy.replace(/^-/, '') : 'created_at';
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order(column, { ascending })
      .limit(limit);
    if (error) throw error;
    return data || [];
  },
  async create(record) {
    const { data, error } = await supabase
      .from(tableName)
      .insert(record)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async update(id, updates) {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async delete(id) {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
});

// Auth shim — wraps Supabase Auth to match the old base44.auth API surface
const authShim = {
  async me() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) throw error || new Error('Not authenticated');
    // Return user_metadata so callers get the same shape (function, segment, etc.)
    return { id: user.id, email: user.email, ...user.user_metadata };
  },
  async updateMe(metadata) {
    const { error } = await supabase.auth.updateUser({ data: metadata });
    if (error) throw error;
  },
  async logout(redirectUrl) {
    await supabase.auth.signOut();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  },
  redirectToLogin(redirectUrl) {
    // Navigate to our own login page (to be built) or Supabase hosted login
    const target = redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : '/login';
    window.location.href = target;
  },
};

// Integrations shim — for the LLM call in GapAnalysisPanel
const integrationsShim = {
  Core: {
    async InvokeLLM(params) {
      // TODO: Replace with direct API call to your preferred LLM provider
      // For now, return a helpful placeholder
      return {
        reply: "AI Gap Analysis is being migrated to a new provider. This feature will be available again shortly. In the meantime, please review the learning paths for guidance on your regulatory knowledge gaps.",
      };
    },
  },
};

/**
 * Drop-in replacement for the old `base44` object.
 * All existing imports of `import { base44 } from "@/api/base44Client"`
 * continue to work without changes.
 */
export const base44 = {
  auth: authShim,
  entities: {
    Regulation: makeEntityApi('regulations'),
    UserAction: makeEntityApi('user_actions'),
    CalendarEvent: makeEntityApi('calendar_events'),
    RegulatoryDeadline: makeEntityApi('regulatory_deadlines'),
    IndustryEvent: makeEntityApi('industry_events'),
    Project: makeEntityApi('projects'),
    Fund: makeEntityApi('funds'),
    Mandate: makeEntityApi('mandates'),
  },
  integrations: integrationsShim,
};
