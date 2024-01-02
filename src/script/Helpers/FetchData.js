export class FetchData {
    static fetch = async (config) => {
        if (!config) return console.log('provide config');

        const res = await fetch(
            config.url,
            {
                method: config.method,
                headers: {
                    'Content-Type': config.contentType
                },
                body: config.body
            }
        );

        if (res.ok) {
            if (res.headers.get('Content-Type').includes('application/json')) {
                return await res.json();
            } else {
                return await res.text();
            }
        } else {
            console.log(`Error: ${res.status}`);
        }
    };
}