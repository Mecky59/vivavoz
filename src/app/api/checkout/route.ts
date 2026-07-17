import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("Missing MP_ACCESS_TOKEN in .env.local");
    }

    // Inicializa o Mercado Pago SDK
    const client = new MercadoPagoConfig({ accessToken, options: { timeout: 10000 } });
    const preference = new Preference(client);

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
        back_urls: {
          success: "https://seusite.com.br/dashboard?status=success",
          failure: "https://seusite.com.br/dashboard?status=failure",
          pending: "https://seusite.com.br/dashboard?status=pending",
        },
        // auto_return removido pois exige HTTPS válido e domínio real
      },
    });

    return NextResponse.json({ id: body.id, init_point: body.init_point });
  } catch (error) {
    console.error("Erro ao criar preferência do Mercado Pago:", error);
    return NextResponse.json({ error: "Erro ao criar checkout" }, { status: 500 });
  }
}
