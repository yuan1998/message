
const url = "http://message.test/api/";

const getMessage = async (options) => {
    let res = await axios.get(url + 'message');

    return res;
};

const message = async (id) => {
    let res = await axios.get(url + 'message/' + id);
    return res;
};


const checkNew = async () => {
  let at = localStorage._last_date;
  let res = await axios.post(url + 'message/check',{at});

  return res;
};

export default {
    getMessage,
    message,
    checkNew
}
