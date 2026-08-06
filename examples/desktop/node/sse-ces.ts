/**
 * SSEClient + CESParser demo (feature `SSE`).
 *
 * Build wasm first: `make nodejs` (packs include SSE).
 * Run against a live node events URL, e.g. NCTL `:18101/events`.
 *
 * CESParser needs a contract installed with CES schema keys
 * (`__events` / `__events_schema`). For CEP-78 that is `events_mode: 2`.
 */
import init, { SDK } from "../../../pkg-nodejs/casper_rust_wasm_sdk.js";

const RPC = process.env.CASPER_RPC_URL ?? "http://127.0.0.1:11101/rpc";
const EVENTS = process.env.CASPER_EVENTS_URL ?? "http://127.0.0.1:18101/events";
/** Optional: `hash-…` or bare hex of a CES-enabled contract. */
const CONTRACT_HASH = process.env.CASPER_CES_CONTRACT_HASH;
/** Optional: hex transaction hash whose execution_result should contain CES transforms. */
const TX_HASH = process.env.CASPER_CES_TX_HASH;

async function main() {
  await init();
  const sdk = new SDK(RPC);

  const client = sdk.SSE_client(EVENTS);
  client.subscribe("ApiVersion", (raw: { eventType: string; data: string }) => {
    console.log("ApiVersion", raw.data);
  });
  client.subscribe(
    "BlockAdded",
    (raw: { lastEventId: string; data: string }) => {
      console.log("BlockAdded id=", raw.lastEventId);
    },
  );
  client.subscribe("TransactionProcessed", (raw: { data: string }) => {
    const body = JSON.parse(raw.data).TransactionProcessed;
    console.log("TransactionProcessed", body?.transaction_hash ?? body?.hash);
  });

  console.log("SSE client ready against", EVENTS);
  console.log(
    "Call client.start() for a continuous stream, or use MCP sdk_SSE_collect.",
  );

  if (!CONTRACT_HASH) {
    console.log(
      "Set CASPER_CES_CONTRACT_HASH to exercise CESParser::create / parse.",
    );
    return;
  }

  const parser = await (sdk as any).CES_parser(
    [CONTRACT_HASH],
    null,
    RPC,
  );
  console.log("CESParser contractCount=", parser.contractCount());

  if (!TX_HASH) {
    console.log(
      "Set CASPER_CES_TX_HASH (e.g. a mint) to parseExecutionResultJson.",
    );
    return;
  }

  const opts = sdk.get_transaction_options({
    transaction_hash_as_string: TX_HASH,
    finalized_approvals: true,
  });
  const tx = await sdk.get_transaction(opts);
  const txJson = tx.toJson() as any;
  const execution =
    txJson?.execution_info?.execution_result ?? txJson?.execution_result;
  if (!execution) {
    console.error("transaction has no execution_result");
    process.exit(1);
  }
  const events = parser.parseExecutionResultJson(JSON.stringify(execution));
  for (const row of events) {
    if (!row.error && row.event?.name) {
      console.log("CES event", row.event.name, row.event);
    } else if (row.error) {
      console.log("CES parse soft-error", row.error);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
