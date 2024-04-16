import Plan from "@/components/producto";
import { IProduct, Product } from "@/mock/producto";
import MercadoPagoConfig, { Preference } from "mercadopago";
import Link from "next/link";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!})

export default function Home() {
  async function pagar(){
    "use server"

    const prod = Product;

    const preference = await new Preference(client)
    .create({
      body: {
        items: [
          {
            id: 'pago',
            title: prod.title,
            quantity: 1,
            unit_price: prod.price
          }
        ]
      }
    })

    redirect(preference.init_point!)
  }

  return (
    <>
      {/* <Plan /> */}
      <h1>Prueba</h1>
      <form action={pagar}>
        <button type="submit">Pagar</button>
      </form>
    </>
  );
}
