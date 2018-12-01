const url = process.env.MIX_API_URL;

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
