'use client'
import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'

function Orders() {
    /*
    const [order, setOrder] = useState(null)
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        const getOrder = async (id:string) => {
            const response = (await fetch(`https://api-local.invernspirit.com/orders/${id}`))
            if(response.status === 404) {
                return null
            }
            if(response.status >= 500) {
                throw new Error('failed to get order')
            }
            if(response.status === 200) {
                return await response.json()
            }
        }

        getOrder(id as string).then(response => setOrder(response.data.order))

    },[])
    */
    return (
        <div>

        </div>
    )
}

export default Orders