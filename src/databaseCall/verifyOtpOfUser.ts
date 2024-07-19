export async function verifyOtpOfUser(e, inputOtp, useremail) {
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
        const data = await response.json();
        return data
    } catch (error) {
        throw error
    }
}