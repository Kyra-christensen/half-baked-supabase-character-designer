const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createCharacter(){

    const response = await client
        .from('characters')
        .insert([
            {
                head: 'bird',
                middle: 'pink',
                bottom: 'leg',
                catchphrases: [] 
            }
        ]);
    
    return checkError(response);
    // {
    //     ...character, 
    //     user_id: client.auth.user().id, 
}

    // use the newCharacter to create a single new character for this user in supabase
    


export async function updateHead(newHead){
    const user = await getUser();
    console.log(newHead, user.user.id);
    const response = await client
    // in supabase, update the head property
        .from('characters')
        .update({ head: newHead })
    // for the character whose user_id match's the currently logged in user's id
        .match({ user_id: user.user.id })
        .single();
    return checkError(response);    
}


export async function updateMiddle(newMiddle){
    const user = await getUser();

    const response = await client
    // in supabase, update the middle property
        .from('characters')
        .update({ middle: newMiddle })
    // for the character whose user_id match's the currently logged in user's id
        .match({ user_id: user.user.id })
        .single();
    return checkError(response);    
}


export async function updateBottom(newBottom){
    const user = await getUser();

    const response = await client
    // in supabase, update the bottom property
        .from('characters')
        .update({ bottom: newBottom })
    // for the character whose user_id match's the currently logged in user's id
        .match({ user_id: user.user.id })
        .single();
    return checkError(response);    
}


export async function updateChatchphrases(newCatchphrases){
    const user = await getUser();

    const response = await client
    // in supabase, update the catchphrases property
        .from('characters')
        .update({ catchphrases: newCatchphrases })
    // for the character whose user_id match's the currently logged in user's id
        .match({ user_id: user.user.id });

    return checkError(response);    
}


/*
CHALLENGE: how would you use this function? which functions would it replace? what's going on with the brackets in the update() arguments?

export async function updateCharacter(part, value){
    const currentUserId = client.auth.user().id;

    const response = await client
        .from('characters')
        .update({ [part]: value })
        .match({ user_id: currentUserId });

    return checkError(response);    
}
*/


export async function getCharacter() {
    const response = await client
        .from('characters')
        .select()
        .match({ user_id: client.auth.user().id, })
        .single();
    console.log(response);
    return checkError(response);    
}

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectToBuild() {
    if (await getUser()) {
        location.replace('./build');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
