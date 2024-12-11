// @ts-ignore
export async function load({ params }) {
    const fetchCountryDetails = (async () => {
        const response = await fetch(`http://localhost:7000/dgcnect/global_explanation/${params.country}`);
        return await response.json();
    })();

    return {
        country: params.country,
        global_details: await fetchCountryDetails,
    };
}