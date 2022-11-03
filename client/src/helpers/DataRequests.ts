import axios, { AxiosError } from "axios";
import React, { FunctionComponent } from "react";

// export const RecordsRequest = async (type: string, record: string): Promise<Object> => {
//   try {
//     const { data, status, statusText } = await axios.get(
//       `/api/${type}/${record}`
//     );
//     return JSON.parse(data.data);
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.response?.status === 404) {
//         console.error(`/api/${type}/${record} is not a valid endpoint`);
//         return error.response.statusText;
//       }
//       if (error.response?.status === 504) {
//         console.error(`Api refuses to connect`);
//         return error.response.statusText;
//       }
//       return error.response?.statusText as string;
//     } else {
//       console.error(error);
//       return "An unexpected error occurred";
//     }
//   }
// };

export const RecordsRequest = async (type: string, record: string): Promise<Object> => {
    const result = axios({
        url: `/api/${type}/${record}`,
        method: "GET"
    }).then((resp) => {
        return JSON.parse(resp.data)
    })
    .catch((error) => {
        console.log(error)
        return error;
    })

    return result
  };
  