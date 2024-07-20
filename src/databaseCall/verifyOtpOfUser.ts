type userData = {
    createdAt: string,
    email: string,
    id: number,
    name: string,
    otp: string,
    password: string,
    verified: boolean
}

export async function verifyOtpOfUser(e: React.FormEvent<HTMLFormElement>, inputOtp: string[], useremail: string):Promise<userData> {
    let otp = ""
    inputOtp.map((e) => otp += e)

    try {
        const response = await fetch('/api/verifyOtp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ useremail, otp }),
        });
        if (!response.ok) {
            throw new Error('Failed to verify user');
        }
        const data = await response.json() as userData;
        return data
    } catch (error) {
        throw error
    }
}