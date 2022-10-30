import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'


export const UploadExport = async (file: File[]): Promise<string> => {
    const formData: FormData = new FormData()

    formData.append("file", file[0])

    // formData.append(file[0].name, , file[0].name)

    const axiosConfig = {
        headers: {
            'Content-Type' : 'multipart/form',
            'Cache-Control' : 'no-cache'
        },
    }

    const result = await axios.post(
        "/api/upload",
        formData,
        axiosConfig
    )
    .then((resp) => {
        if (resp.status === 200){
            return 'Working!'
        } else {
            return 'Did not work! We should print the error here!'
        }
    })
    .catch((err) => {
        const error = err as AxiosError
    });

    return 'result';
}

