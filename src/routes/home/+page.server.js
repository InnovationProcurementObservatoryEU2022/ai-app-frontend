// @ts-ignore
export async function load({ params }) {
    const data = (async () => {
        const response = await fetch('http://localhost:7000/dgcnect/countries_data');
        return await response.json();
    })();

    return {
        countries: await data,
    };
}
