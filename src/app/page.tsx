"use client"

import Plan from "@/components/producto";
import { IProduct, Product } from "@/mock/producto";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<null | string>(null);

  useEffect(() => {
    const generateLink = async () => {
      try{
        const res = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(Product),
          headers: {
            "Content-Type": "application/json"
          }
        })
        
        const data = await res.json()

        setUrl(data.link)

        } catch(error){
        console.log(error)
      }
    }
    if(url === null){
      generateLink()
    }
    }, [url]
  )

  console.log(url)
  return (
    <>
      {/* <Plan /> */}
      <h1>Prueba</h1>
      {url === null ?
        null : <Link href={url} target="_blank">Pagar</Link>
      }
    </>
  );
}
