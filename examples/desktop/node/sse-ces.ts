/**
 * SSEClient + CESParser demo (feature `SSE`).
 *
 * Build wasm first: `make nodejs` (or `make nodejs-full`).
 * Run against a live node events URL, e.g. NCTL `:18101/events`.
 */
import init, { SDK } from "../../../pkg-nodejs/casper_rust_wasm_sdk.js";

const RPC = process.env.CASPER_RPC_URL ?? "http://127.0.0.1:11101/rpc";
const EVENTS = process.env.CASPER_EVENTS_URL ?? "http://127.0.0.1:18101/events";

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
    // Optional: feed execution_result into CESParser once schemas are loaded:
    // const parser = /* CESParser.create via native/MCP */;
    // parser.parseExecutionResultJson(JSON.stringify(body.execution_result));
  });

  // Bounded demo: collect a few frames instead of an endless start().
  // For continuous streaming use: await client.start(/* startFrom? */);
  console.log("SSE client ready against", EVENTS);
  console.log(
    "Call client.start() for a continuous stream, or use MCP sdk_SSE_collect.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
