// Functions for getting data from APIs

// We don't really care if the api keys are public tbh
const SAFETY_API = "https://test.api.amadeus.com/v1/safety/safety-rated-locations";
const SAFETY_API_OAUTH = "https://test.api.amadeus.com/v1/security/oauth2/token";
const SAFETY_API_KEY = "UvPpbAOni232viR4TIzfjv1fg9ItdE2D";
const SAFETY_API_SECRET = "hPXuy9gdS59DR7Aq";

const RESTROOM_API = "https://refugerestrooms.org/api/v1/restrooms/by_location";



async function getSafetyLatLong(coords) {
    /*
    Returns lgbtq safety ratings for an array of coordinates
    - Input: [ [lat1, lng1], [lat2, lng2], ... ]
    - Returns: [ rating for location 1, rating for location 2, ... ]
    */
    const l = coords.length;
    const oauthResponse = await fetch(SAFETY_API_OAUTH, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials&client_id=" + SAFETY_API_KEY + "&client_secret=" + SAFETY_API_SECRET
    });
    const oauthJson = await oauthResponse.json();

    const rateLimit = 750;  // a little under 2 requests per second
    let safetyArray = new Array(l).fill(0);
    return new Promise((resolve, reject) => {
        for (let i = 0; i < l; i++) {
            const index = i;
            const api_url = SAFETY_API + "?" + new URLSearchParams([
                ["latitude", coords[index][0]],
                ["longitude", coords[index][1]],
                ["radius", 5],
                ["page[limit]", 25]
            ]).toString();
            setTimeout(() => {
                fetch(api_url, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + oauthJson["access_token"]
                    }
                }).then(res => res.json())
                .then(safetyData => {
                    if ("data" in safetyData) {
                        // Average all the lgbt safety values and put it in safetyArray
                        let safety = 0;
                        const numDistricts = safetyData["data"].length;
                        safetyData["data"].forEach(safetyRatedLocation => {
                            safety += safetyRatedLocation["safetyScores"]["lgbtq"];
                        });
                        safety /= numDistricts * 100;
                        safetyArray[index] = safety;
                    }
                    if (index === l - 1) {
                        // Finished putting in all the lgbt safety values!
                        resolve(safetyArray);
                    }
                });
            }, index * rateLimit);
        }
    });
}

async function getRestroomsLatLong(coordinate) {
    /*
    Returns restroom data for a specific [lat, long] coordinate
    - Input: [lat, lng]
    - Returns: [ {"name": x, "latitude": x, "longitude": x}, ...]
    */
    const api_url = RESTROOM_API + "?" + new URLSearchParams([
        ["page", 0],
        ["per_page", 20],
        ["pad", 0],
        ["unisex", true],
        ["lat", coordinate[0]],
        ["lng", coordinate[1]]
    ]).toString();
    return fetch(api_url, {
        method: "GET"
    }).then(res => res.json());
}

function test() {
    // Ignore lol
    const coords = [
        [40.70216643615087, -73.90386154754485],
        [40.7640833870421, -74.02162125140073],
        [40.84880046756148, -73.88738205530939]
    ];
    getSafetyLatLong(coords).then(safetyArray => {
        console.log(coords);
        console.log(safetyArray);
    });
    coords.forEach(coord => {
        getRestroomsLatLong(coord).then(restroomArray => {
            console.log(restroomArray[0]["name"]);
        });
    })
}

export {getSafetyLatLong, getRestroomsLatLong};
