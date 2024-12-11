// @ts-ignore
export async function load({ params }) {
    const data = (async () => {
        const response = await fetch(`http://localhost:7000/dgcnect/tender_details/${params.country}/${params.tender_id}`);
        return await response.json();
    })();

    return {
        tender_details: await data,
        tender_id: params.tender_id,
    };
}