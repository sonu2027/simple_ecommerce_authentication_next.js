export async function markedOtpVerified(email) {
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
        const data = await response.json();
        return data
    } catch (error) {
        throw error
    }
}