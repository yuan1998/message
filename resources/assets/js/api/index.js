const url = process.env.MIX_API_URL;

const parseParamater = (obj) => {
    let str = '';

    for(let key in obj) {
        let val = obj[key];
        if (!val)
            continue;

        str += `${key}=${obj[key]}&`;
    }

    return "?" + str;
};

const getMessage = async (param) => {

    let res = await axios.get(url + 'message' + ( param ? parseParamater(param) : '' ));

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
