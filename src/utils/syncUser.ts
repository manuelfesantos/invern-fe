import {User} from "@/types/store/user";

export const loadUser = () => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        if (user) {
            console.log("loading user from local storage:", user)
            return JSON.parse(user);
        }
        console.log("no user found on local storage. Initializing an empty user")
        return null
    }
    return null
}

export const syncUser = (user: User | null) => {
    if (typeof window !== 'undefined') {
        user === null
            ? localStorage.removeItem('user')
            : localStorage.setItem('user', JSON.stringify(user));
    }
}