"use client";

import React, { useState, useEffect } from 'react'
import { IProduct } from '@/mock/producto'
import axios from 'axios';
import Link from 'next/link';

interface MercadoPagoButtonProps {
    product: IProduct;
}

const MercadoPagoButton = ({ product }: MercadoPagoButtonProps) => {
    const [url, setUrl] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const generateLink = async () => {
            setLoading(true)

            try {
                const { data: preference } = await axios.post("/api/checkout", {
                    product
                });

                setUrl(preference.url)
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        };

        generateLink();
    }, [product])


    return (
        <div>
            {
                loading ? (
                    <button>
                        cargando
                    </button>
                ) : null
            }
            {
                url === null ?
                null : (
                    <>
                        <Link target='_blank' href={url}>Comprar ahora</Link>
                    </>
                )
            }
        </div>
    )
}

export default MercadoPagoButton