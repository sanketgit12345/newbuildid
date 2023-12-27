export const Postrequestcall = async (apiPath, payload) => {
    // let auth = {};
    // if (
    //     typeof access_token !== "undefined" &&
    //     access_token !== null &&
    //     access_token !== ""
    // ) {
    //    auth = {
    //       "Authorization" : `Bearer ${access_token}`
    //    }
    // }
   let headers = {
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