import axios from "axios";

export const RecordsRequest = async (type: string, record: string): Promise<Object> => {
    const result = axios({
        url: `/api/${type}/${record}`,
        method: "GET"
    }).then((resp) => {
        const data = JSON.stringify(resp.data)
        return JSON.parse(data)
    })
    .catch((error) => {
        console.log(error)
        return error;
    })

    return result
  };
  