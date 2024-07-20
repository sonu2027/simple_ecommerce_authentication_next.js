type status = {
    emailstatus: string
}

export const sendEmailVerification = async (email: string):Promise<status> => {
    try {
        const response = await fetch('/api/sendEmailVerificationCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) {
            throw new Error('Failed to send email otp');
        }
        const data = await response.json() as status;
        return data
    } catch (error) {
        throw error
    }
}