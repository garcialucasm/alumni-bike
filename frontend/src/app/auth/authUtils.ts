export interface I_AuthHeader {
    headers: {
        Authorization: string;
        'Content-Type': string
    };
}

export function authHeader(): I_AuthHeader {
    const token = getTokenFromCookies("ipcBikeApp_authToken");
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
};

export function getTokenFromCookies(name: string) {
    try {
        if (typeof document !== 'undefined') {
            const cookies = document.cookie.split(';');
            const cookieName = `${name}=`;

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.startsWith(cookieName)) {
                    return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
                }
            }
        }
    }
    catch {
        throw new Error("Cookie error: error getting cookies")
    }
};

export async function setCookie(name: string, value: string, days: number = 7) {
    try {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);

        const cookieValue =
            encodeURIComponent(value) +
            (days ? `; expires=${expirationDate.toUTCString()}` : "");

        document.cookie = `${name}=${cookieValue}; path=/; Secure; SameSite=None`;
        return true
    } catch (error) {
        throw new Error("Error setting cookie: " + error)
    }
};