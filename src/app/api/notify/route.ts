import type { NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createClient } from "@supabase/supabase-js";

const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN!});
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET!);

export async function POST(req: NextRequest) {
  const body = await req.json().then((data) => data as {data: {id: string}});

  const transaccion = await new Payment(mp).get({id: body.data.id});

  const pago = {
    id: transaccion.id,
    amount: transaccion.transaction_amount,
    message: transaccion.description
  }

  await sb.from('pagos').insert(pago);

  return Response.json({success: true})
}