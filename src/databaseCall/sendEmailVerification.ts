export const sendEmailVerification = async (email) => {
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
        const data = await response.json();
        console.log('Email otp sent successfully:', data);
        return data
    } catch (error) {
        console.error('Error sending email otp:', error);
        throw error
    }
}