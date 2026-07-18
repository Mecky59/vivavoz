const { createClient } = require('@supabase/supabase-js');

async function testSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    console.error("Missing env vars");
    return;
  }

  const supabaseAnon = createClient(supabaseUrl, anonKey);
  const supabaseServer = createClient(supabaseUrl, serviceKey);

  console.log("1. Testing Server UPSERT (Webhook behavior)...");
  const { data: upsertData, error: upsertError } = await supabaseServer
    .from('user_payments')
    .upsert({
      user_id: 'test_user_from_webhook',
      has_paid: true,
      payment_id: 'webhook_123',
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });

  if (upsertError) {
    console.error("❌ Server UPSERT failed:", upsertError);
  } else {
    console.log("✅ Server UPSERT successful.");
  }

  console.log("2. Testing Anon SELECT (Client behavior)...");
  const { data: selectData, error: selectError } = await supabaseAnon
    .from('user_payments')
    .select('has_paid')
    .eq('user_id', 'test_user_from_webhook')
    .single();

  if (selectError) {
    console.error("❌ Anon SELECT failed:", selectError);
  } else {
    console.log("✅ Anon SELECT successful. Data:", selectData);
  }
}

testSupabase();
