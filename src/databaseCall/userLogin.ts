type userData = {
    createdAt: string,
    email: string,
    id: number,
    name: string,
    otp: string,
    password: string,
    verified: boolean
}

export async function userLogin(useremail:string, userpassword:string):Promise<userData>{
    try {
        const response = await fetch('/api/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ useremail, userpassword }),
        });
        if (!response.ok) {
            throw new Error('Failed to login user');
        }
        const data = await response.json() as userData;
        return data
    } catch (error) {
        throw error
    }
}