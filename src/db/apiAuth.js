import supabase from "./supabase";

// db/apiAuth.js (example with Supabase; adapt for your backend)
export async function login({ email, password }) {
  const res = await supabase.auth.signInWithPassword({ email, password });
  if (res.error || !res.data?.user) {
    throw new Error(res.error?.message || 'Invalid email or password');
  }
  return res.data; // => { user, session }
}

export async function getCurrentUser(){
    const { data: session, error } = await supabase.auth.getSession();
    if(!session.session) return null;
    if(error) throw new Error(error.message);
    return session.session?.user;
}