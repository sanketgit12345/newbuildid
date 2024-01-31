export const Fileuploadrequestcall = async (apiPath, payload, access_Token) => {
    let headers = {
        "Authorization": `Bearer ${access_Token}`,
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
    };
    const getResponse = await window.axios.post(`${process.env.REACT_APP_BASE_URL}/${apiPath}`, payload, {
        headers: headers,
        credentials: 'include',
    })
    .then(function (result) {
        return result;
    })
    .catch((err) => err.response);

    return getResponse;
};
