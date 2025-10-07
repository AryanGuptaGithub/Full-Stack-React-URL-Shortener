import supabase, { supabaseUrl } from "./supabase";


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

export async function signup({ name, email, password, profile_pic }){
    const filename = `dp-${name.split("").join("-")}-${Math.random()}`;
    const {error:storageError} = await supabase.storage.from("profile_pic").upload(filename, profile_pic);

    if(storageError) throw new Error(storageError.message);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options:{
            data:{
                name,
                profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${filename}`,
            }
        }
    })

    if(error) throw new Error(error.message);
    return data;
}


export async function Logout(){
        const {error} = await supabase.auth.signOut();
         if(error) throw new Error(error.message);
}