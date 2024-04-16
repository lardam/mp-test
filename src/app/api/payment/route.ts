import { NextResponse, type NextRequest } from "next/server";

import mercadopago, { payment } from "mercadopago";
import { MercadoPagoConfig } from "mercadopago/configuration";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { IProduct } from "@/mock/producto";

if(process.env.MP_ACCESS_TOKEN){
    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN,
    });
}

export async function POST(req: NextRequest) {
    const producto: IProduct = await req.json();

    try{
        const preference: CreatePreferencePayload = {
            items: [{
                title: producto.title,
                unit_price: producto.price,
                quantity: 1
            }],
            auto_return: "approved",
            back_urls: {
                success: "http://localhost:3000",
                failure: "http://localhost:3000"
            },
            // notification_url: "http://localhost:3000/api/notify"
        }

        const res = await mercadopago.preferences.create(preference);

        console.log(res)

        return new Response(JSON.stringify({ link: res.body.init_point }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    catch(error){
        console.log(error)
        return new Response(
            JSON.stringify({
                message: "Internal Server Error - payment",
                error: error
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    }
}