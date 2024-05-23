import { useState } from "react"

function useToast() {
    const [toast,setToast] = useState({
        type: true,
        message: '',
        isLoading: false
    })

    const handleToast = (type:boolean,message:string,isLoading:boolean) => {
        setToast({
            type,
            message,
            isLoading
        })

        setTimeout(() => {
            setToast({
                ...toast,
                isLoading: false
            })
        }, 1000)
    }

    return { toast,handleToast }
}

export default useToast