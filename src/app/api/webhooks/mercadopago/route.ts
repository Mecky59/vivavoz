import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { supabase } from "@/lib/supabase/client";
export async function POST(request: Request) {
  try {
    // Mercado Pago pode enviar os dados na URL ou no Corpo (Body)
    const url = new URL(request.url);
    const queryType = url.searchParams.get("type");
    const queryDataId = url.searchParams.get("data.id");
    
    let body: any = {};
    try {
      body = await request.json();
    } catch (e) {}

    const type = queryType || body.type;
    const dataId = queryDataId || body.data?.id;

    // Se não for um aviso de pagamento, apenas ignoramos e retornamos 200 OK
    if (type !== "payment" || !dataId) {
      return NextResponse.json({ received: true });
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("Missing MP_ACCESS_TOKEN");
    }

    // 1. SEGURANÇA MÁXIMA: Em vez de apenas confiar na mensagem recebida, 
    // nós usamos o ID recebido para perguntar diretamente ao Mercado Pago oficial se esse pagamento existe mesmo.
    const client = new MercadoPagoConfig({ accessToken });
    const payment = new Payment(client);
    const paymentData = await payment.get({ id: dataId });

    // 2. Se o pagamento realmente existir e estiver aprovado
    if (paymentData.status === "approved") {
      const userId = paymentData.external_reference; // É o ID do usuário que enviamos lá no checkout!
      
      if (userId) {
        // 3. Atualizamos o banco de dados (Supabase) liberando o acesso do aluno
        const { error: supabaseError } = await supabase
          .from("user_payments")
          .upsert({
            user_id: userId,
            has_paid: true,
            payment_id: String(paymentData.id),
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });

        if (supabaseError) {
          console.error("Erro ao salvar no Supabase:", supabaseError);
          throw new Error("Falha ao atualizar pagamento no Supabase");
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    // Mesmo com erro, retornamos 200 para o Mercado Pago parar de reenviar a mesma notificação
    return NextResponse.json({ success: false, message: "Webhook handler failed" }, { status: 200 });
  }
}
