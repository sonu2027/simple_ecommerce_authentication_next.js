type userData = {
    createdAt: string,
    email: string,
    id: number,
    name: string,
    otp: string,
    password: string,
    verified: boolean
}

export async function markedOtpVerified(email: string): Promise<userData> {
    try {
        const response = await fetch('/api/updateOtpVerificationStatus', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
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