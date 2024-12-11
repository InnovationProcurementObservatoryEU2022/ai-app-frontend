// @ts-ignore
export async function load({ params }) {
    const fetchCountryDetails = (async () => {
        const response = await fetch(`http://localhost:7000/dgcnect/country_details/${params.country}`);
        return await response.json();
    })();

    if (params.tender_id === undefined) {
        console.log('Not defined');
    } else {
        console.log(params.tender_id);
    }


    return {
        country: params.country,
        tender_id: params.tender_id,
        country_details: await fetchCountryDetails,
    };
}