
const url = "http://message.test/api/";

const getMessage = async (options) => {
    let res = await axios.get(url + 'message');

    return res;
};

const message = async (id) => {
    let res = await axios.get(url + 'message/' + id);
    return res;
};


export default {
    getMessage,
    message
}
