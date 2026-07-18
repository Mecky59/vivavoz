import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const { userId } = reqBody;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("Missing MP_ACCESS_TOKEN in .env.local");
    }

    // Inicializa o Mercado Pago SDK
    const client = new MercadoPagoConfig({ accessToken, options: { timeout: 10000 } });
    const preference = new Preference(client);

    const origin = request.headers.get("origin") || "https://vivavoz.vercel.app";

    const body = await preference.create({
      body: {
        items: [
          {
            id: "viva-voz-plano-padrao",
            title: "Mensalidade Viva-Voz - Plano Padrão",
            quantity: 1,
            unit_price: 119.90,
            currency_id: "BRL",
          },
        ],
        external_reference: userId,
        notification_url: `${origin}/api/webhooks/mercadopago`,
        back_urls: {
          success: `${origin}/dashboard`,
          failure: `${origin}/dashboard`,
          pending: `${origin}/dashboard`,
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ id: body.id, init_point: body.init_point });
  } catch (error) {
    console.error("Erro ao criar preferência do Mercado Pago:", error);
    return NextResponse.json({ error: "Erro ao criar checkout" }, { status: 500 });
  }
}
