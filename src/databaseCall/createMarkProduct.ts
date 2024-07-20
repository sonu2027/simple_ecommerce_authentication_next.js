interface MarkProductResponse {
    userId: number;
    productId: string;
}

export async function createMarkProduct(userId: number, productId: string): Promise<MarkProductResponse> {
    try {
        const response = await fetch('/api/markProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, productId }),
        });

        if (!response.ok) {
            throw new Error('Failed to mark product for user');
        }

        const data = await response.json() as MarkProductResponse;

        return data;
    } catch (error) {
        throw error;
    }
}
