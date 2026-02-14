export async function fetchAPI<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        cache: options?.cache || "no-store", // kita set no-store karena ingin mendapat data lebih real time atau lebih updated
    })

    if (!res.ok) {
        let errorMessage = `failed to fetch data from ${endpoint}`;
        try {
            const errorData = await res.json();
            errorMessage = errorData.Message || errorData.error || errorMessage;
        }   catch(e) {
            console.log(e)
        }

        throw new Error(errorMessage);
    }

    return res.json();
}

export function getImageUrl(path: string) {
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_API_ROOT}/${path}`;
}