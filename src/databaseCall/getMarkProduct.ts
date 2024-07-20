interface MarkedProduct {
    userId: number;
    productId: string;
}

export const getMarkProduct = async (userId: number): Promise<MarkedProduct[]> => {
    try {
        const response = await fetch("/api/getMarkProducts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId })
        })

        if (!response.ok) {
            throw new Error('Failed to get marked product');
        }
        const data = await response.json() as MarkedProduct[];
        return data
    } catch (error) {
        throw error
    }
}