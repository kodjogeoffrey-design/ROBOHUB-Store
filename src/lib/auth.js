import { supabase, isSupabaseConfigured } from "./supabase.js";

// Admin authentication. Only the store owner signs in; visitors never need an
// account. All write policies in Supabase check auth.role() = 'authenticated'.

function requireClient() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured");
  }
  return supabase;
}

/** Sign in an admin user. Returns the user, throws on bad credentials. */
export async function signIn(email, password) {
  const client = requireClient();
  const { data, error } = await client.auth.signInWithPassword({
    email: String(email ?? "").trim(),
    password: String(password ?? ""),
  });
  if (error) throw new Error(error.message || "Could not sign in");
  return data.user;
}

/** Sign the admin out. */
export async function signOut() {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message || "Could not sign out");
}

/** Current session (or null). Resolves null when Supabase is not configured. */
export async function getSession() {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session ?? null;
}

/** True when an admin is signed in. */
export async function isAuthenticated() {
  const session = await getSession();
  return Boolean(session);
}

/** Subscribe to auth changes; returns an unsubscribe function. */
export function onAuthChange(callback) {
  if (!isSupabaseConfigured) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return () => data?.subscription?.unsubscribe?.();
}
