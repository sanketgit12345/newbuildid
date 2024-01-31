export const Getrequestcall = async (apiPath,token) => {
    let auth = {};
    if (
        typeof token !== "undefined" &&
        token !== null &&
        token !== ""
    ) {
       auth = {
          "Authorization" : `Bearer ${token}`
       }
    }
   let headers = {
        ...auth,
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
    const getResponse = await window.axios.get(`${process.env.REACT_APP_BASE_URL}/${apiPath}`, {
        headers: headers
    }).then(function (result) {
        return result;
    }).catch((err) => err.response);
    return getResponse;
}