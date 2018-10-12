
const url = "http://message.test/api/";

const getMessage = async (options) => {
    let res = await axios.get(url + 'message');

    return res;
};


export default {
    getMessage,
}
