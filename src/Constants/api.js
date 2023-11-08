export const trustedBy = {
    google: "./google_logo.png",
    digitalOcean: "./digital-ocean.png",
    microsoft: "./microsoft.png",
    instagram: "./instagram.jpg",
    Hostinger: "./Hostinger-logo.png"
}

export const regex = {
    nameRegex : /^[a-zA-Z][\sa-zA-Z]{3,15}$/i,
    usernameRegex : /^[a-z][a-z0-9_]{3,15}$/i,
    emailRegex : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.\-_]+\.[a-zA-Z]{2,}$/i,
    password : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/i,
    confirm : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/i,
    title: /^[a-zA-Z0-9][\W\w]{9,79}$/i,
    description: /^[a-zA-Z0-9][\W\w]{9,4999}$/i
}