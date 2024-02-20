export const Postrequestcall = async (apiPath, payload, token) => {
    try {
        let auth = {};
        if (
            typeof token !== "undefined" &&
            token !== null &&
            token !== ""
        ) {
            auth = {
                "Authorization": `Bearer ${token}`
            }
        }
        let headers = {
            ...auth,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        const getResponse = await window.axios.post(`${process.env.REACT_APP_BASE_URL}/${apiPath}`, payload, {
            headers: headers
        }).then(function (result) {
            return result;
        }).catch((err) => err.response);
        return getResponse;
    }
    catch (error) {
        throw error;
    }
}