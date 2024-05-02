'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
var casper_sdk_1 = require('casper-sdk');
var fs = require('fs').promises;
var http = require('http');
var node_address = 'https://rpc.integration.casperlabs.io';
var sdk = new casper_sdk_1.SDK(node_address);
var server = http.createServer(function (req, res) {
  return __awaiter(void 0, void 0, void 0, function () {
    var peers_object, peers_as_json;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          return [4 /*yield*/, sdk.get_peers()];
        case 1:
          peers_object = _a.sent();
          console.log(peers_object.peers);
          peers_as_json = peers_object.toJson();
          console.log(peers_as_json);
          res.end(JSON.stringify(peers_as_json));
          return [2 /*return*/];
      }
    });
  });
});
var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log('Server is running on port '.concat(PORT));
});
<<<<<<< HEAD
var example1 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var deploy_hash_as_string,
      finalized_approvals,
      get_deploy_options,
      deploy_result,
      deploy,
      timestamp,
      header;
=======
// get_deploy
var example1 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var deploy_hash_as_string, finalized_approvals, get_deploy_options, deploy_result, deploy, timestamp, header;
>>>>>>> 9d6a836 (Deploy watcher + Key generation (#34))
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          deploy_hash_as_string =
            'a8778b2e4bd1ad02c168329a1f6f3674513f4d350da1b5f078e058a3422ad0b9';
          finalized_approvals = true;
          get_deploy_options = sdk.get_deploy_options({
            deploy_hash_as_string: deploy_hash_as_string,
            finalized_approvals: finalized_approvals,
          });
          return [4 /*yield*/, sdk.get_deploy(get_deploy_options)];
        case 1:
          deploy_result = _a.sent();
          deploy = deploy_result.deploy;
          timestamp = deploy.timestamp();
          header = deploy.toJson().header;
          console.log(timestamp, header);
          return [2 /*return*/];
      }
    });
<<<<<<< HEAD
  });
};
var example2 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
=======
}); };
// get_auction_info
var example2 = function () { return __awaiter(void 0, void 0, void 0, function () {
>>>>>>> 9d6a836 (Deploy watcher + Key generation (#34))
    var get_auction_info, auction_state, state_root_hash, block_height;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, sdk.get_auction_info()];
        case 1:
          get_auction_info = _a.sent();
          auction_state = get_auction_info.auction_state;
          state_root_hash = auction_state.state_root_hash.toString();
          block_height = auction_state.block_height.toString();
          console.log(state_root_hash, block_height);
          return [2 /*return*/];
      }
    });
<<<<<<< HEAD
  });
};
var example3 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
=======
}); };
// get_peers
var example3 = function () { return __awaiter(void 0, void 0, void 0, function () {
>>>>>>> 9d6a836 (Deploy watcher + Key generation (#34))
    var get_peers, peers;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, sdk.get_peers()];
        case 1:
          get_peers = _a.sent();
          peers = get_peers.peers;
          peers.forEach(function (peer) {
            console.log(peer);
          });
          return [2 /*return*/];
      }
    });
<<<<<<< HEAD
  });
};
var example4 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
=======
}); };
// get_block
var example4 = function () { return __awaiter(void 0, void 0, void 0, function () {
>>>>>>> 9d6a836 (Deploy watcher + Key generation (#34))
    var get_block, block, block_hash;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, sdk.get_block()];
        case 1:
          get_block = _a.sent();
          block = get_block.block;
          block_hash = block.hash;
          console.log(block_hash);
          return [2 /*return*/];
      }
    });
<<<<<<< HEAD
  });
};
var example5 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var chain_name,
      public_key,
      private_key,
      timestamp,
      ttl,
      payment_amount,
      transfer_amount,
      target_account,
      deploy_params,
      payment_params,
      transfer_deploy,
      transfer_deploy_as_json;
=======
}); };
// make_transfer
var example5 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var chain_name, public_key, private_key, timestamp, ttl, payment_amount, transfer_amount, target_account, deploy_params, payment_params, transfer_deploy, transfer_deploy_as_json;
>>>>>>> 9d6a836 (Deploy watcher + Key generation (#34))
    return __generator(this, function (_a) {
      chain_name = 'casper-net-1';
      public_key =
        '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
      private_key = undefined;
      timestamp = (0, casper_sdk_1.getTimestamp)();
      ttl = '1h';
      payment_amount = '100000000';
      transfer_amount = '2500000000';
      target_account =
        '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54';
      deploy_params = new casper_sdk_1.DeployStrParams(
        chain_name,
        public_key,
        private_key,
        timestamp,
        ttl
      );
      payment_params = new casper_sdk_1.PaymentStrParams(payment_amount);
      transfer_deploy = sdk.make_transfer(
        transfer_amount,
        target_account,
        undefined, // transfer_id
        deploy_params,
        payment_params
      );
      transfer_deploy_as_json = transfer_deploy.toJson();
      console.log(transfer_deploy_as_json);
      return [2 /*return*/];
    });
<<<<<<< HEAD
  });
};
var example6 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var node_address,
      sdk,
      chain_name,
      public_key,
      private_key,
      timestamp,
      ttl,
      payment_amount,
      transfer_amount,
      target_account,
      deploy_params,
      payment_params,
      transfer_result,
      transfer_result_as_json;
=======
}); };
// transfer
var example6 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var node_address, sdk, chain_name, public_key, private_key, timestamp, ttl, payment_amount, transfer_amount, target_account, deploy_params, payment_params, transfer_result, transfer_result_as_json;
>>>>>>> 9d6a836 (Deploy watcher + Key generation (#34))
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          node_address = 'http://127.0.0.1:11101';
          sdk = new casper_sdk_1.SDK(node_address);
          chain_name = 'casper-net-1';
          public_key =
            '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
          private_key =
            '-----BEGIN PRIVATE KEY-----\n\n-----END PRIVATE KEY-----';
          timestamp = (0, casper_sdk_1.getTimestamp)();
          ttl = '1h';
          payment_amount = '100000000';
          transfer_amount = '2500000000';
          target_account =
            '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54';
          deploy_params = new casper_sdk_1.DeployStrParams(
            chain_name,
            public_key,
            private_key,
            timestamp,
            ttl
          );
          payment_params = new casper_sdk_1.PaymentStrParams(payment_amount);
          return [
            4 /*yield*/,
            sdk.transfer(
              transfer_amount,
              target_account,
              undefined, // transfer_id
              deploy_params,
              payment_params
            ),
          ];
        case 1:
          transfer_result = _a.sent();
          transfer_result_as_json = transfer_result.toJson();
          console.log(transfer_result_as_json);
          return [2 /*return*/];
      }
    });
<<<<<<< HEAD
  });
};
var example7 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var chain_name,
      public_key,
      payment_amount,
      contract_hash,
      deploy_params,
      session_params,
      payment_params,
      deploy,
      deploy_as_json;
=======
}); };
// make_deploy
var example7 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var chain_name, public_key, payment_amount, contract_hash, deploy_params, session_params, payment_params, deploy, deploy_as_json;
>>>>>>> 9d6a836 (Deploy watcher + Key generation (#34))
    return __generator(this, function (_a) {
      chain_name = 'integration-test';
      public_key =
        '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
      payment_amount = '5000000000';
      contract_hash =
        'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
      deploy_params = new casper_sdk_1.DeployStrParams(chain_name, public_key);
      session_params = new casper_sdk_1.SessionStrParams();
      session_params.session_hash = contract_hash;
      session_params.session_entry_point = 'set_variables';
      payment_params = new casper_sdk_1.PaymentStrParams(payment_amount);
      deploy = sdk.make_deploy(deploy_params, session_params, payment_params);
      deploy_as_json = deploy.toJson();
      console.log(deploy_as_json);
      return [2 /*return*/];
    });
<<<<<<< HEAD
  });
};
var example8 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var node_address,
      sdk,
      chain_name,
      public_key,
      private_key,
      payment_amount,
      contract_hash,
      deploy_params,
      session_params,
      payment_params,
      deploy_result,
      deploy_result_as_json;
=======
}); };
// deploy
var example8 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var node_address, sdk, chain_name, public_key, private_key, payment_amount, contract_hash, deploy_params, session_params, payment_params, deploy_result, deploy_result_as_json;
>>>>>>> 9d6a836 (Deploy watcher + Key generation (#34))
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          node_address = 'http://127.0.0.1:11101';
          sdk = new casper_sdk_1.SDK(node_address);
          chain_name = 'casper-net-1';
          public_key =
            '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
          private_key =
            '-----BEGIN PRIVATE KEY-----\n\n    -----END PRIVATE KEY-----';
          payment_amount = '5000000000';
          contract_hash =
            'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
          deploy_params = new casper_sdk_1.DeployStrParams(
            chain_name,
            public_key,
            private_key
          );
          session_params = new casper_sdk_1.SessionStrParams();
          session_params.session_hash = contract_hash;
          session_params.session_entry_point = 'set_variables';
          payment_params = new casper_sdk_1.PaymentStrParams(payment_amount);
          return [
            4 /*yield*/,
            sdk.deploy(deploy_params, session_params, payment_params),
          ];
        case 1:
          deploy_result = _a.sent();
          deploy_result_as_json = deploy_result.toJson();
          console.log(deploy_result_as_json);
          return [2 /*return*/];
      }
    });
<<<<<<< HEAD
  });
};
var example9 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var node_address,
      sdk,
      chain_name,
      public_key,
      private_key,
      payment_amount,
      contract_hash,
      entry_point,
      deploy_params,
      session_params,
      payment_params,
      deploy,
      put_deploy_result,
      put_deploy_result_as_json;
=======
}); };
// put_deploy
var example9 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var node_address, sdk, chain_name, public_key, private_key, payment_amount, contract_hash, entry_point, deploy_params, session_params, payment_params, deploy, put_deploy_result, put_deploy_result_as_json;
>>>>>>> 9d6a836 (Deploy watcher + Key generation (#34))
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          node_address = 'http://127.0.0.1:11101';
          sdk = new casper_sdk_1.SDK(node_address);
          chain_name = 'casper-net-1';
          public_key =
            '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
          private_key =
            '-----BEGIN PRIVATE KEY-----\n\n    -----END PRIVATE KEY-----';
          payment_amount = '5000000000';
          contract_hash =
            'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
          entry_point = 'set_variables';
          deploy_params = new casper_sdk_1.DeployStrParams(
            chain_name,
            public_key,
            private_key
          );
          session_params = new casper_sdk_1.SessionStrParams();
          session_params.session_hash = contract_hash;
          session_params.session_entry_point = entry_point;
          payment_params = new casper_sdk_1.PaymentStrParams(payment_amount);
          deploy = casper_sdk_1.Deploy.withPaymentAndSession(
            deploy_params,
            session_params,
            payment_params
          );
          return [4 /*yield*/, sdk.put_deploy(deploy)];
        case 1:
          put_deploy_result = _a.sent();
          put_deploy_result_as_json = put_deploy_result.toJson();
          console.log(put_deploy_result_as_json);
          return [2 /*return*/];
      }
    });
  });
};
var example10 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var node_address,
      sdk,
      chain_name,
      public_key,
      private_key,
      payment_amount,
      transfer_amount,
      target_account,
      deploy_params,
      payment_params,
      transfer_deploy,
      put_deploy_result,
      put_deploy_result_as_json;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          node_address = 'http://127.0.0.1:11101';
          sdk = new casper_sdk_1.SDK(node_address);
          chain_name = 'casper-net-1';
          public_key =
            '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
          private_key =
            '-----BEGIN PRIVATE KEY-----\n\n    -----END PRIVATE KEY-----';
          payment_amount = '100000000';
          transfer_amount = '2500000000';
          target_account =
            '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54';
          deploy_params = new casper_sdk_1.DeployStrParams(
            chain_name,
            public_key,
            private_key
          );
          payment_params = new casper_sdk_1.PaymentStrParams(payment_amount);
          transfer_deploy = casper_sdk_1.Deploy.withTransfer(
            transfer_amount,
            target_account,
            undefined, // transfer_id
            deploy_params,
            payment_params
          );
          return [4 /*yield*/, sdk.put_deploy(transfer_deploy)];
        case 1:
          put_deploy_result = _a.sent();
          put_deploy_result_as_json = put_deploy_result.toJson();
          console.log(put_deploy_result_as_json);
          return [2 /*return*/];
      }
    });
<<<<<<< HEAD
  });
};
var example11 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    function loadFile() {
      return __awaiter(this, void 0, void 0, function () {
        var fileBuffer, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              return [
                4 /*yield*/,
                fs.readFile(__dirname + '/../../../tests/wasm/cep78.wasm'),
              ];
            case 1:
              fileBuffer = _a.sent();
              return [2 /*return*/, fileBuffer.buffer]; // Returns an ArrayBuffer
            case 2:
              error_1 = _a.sent();
              throw new Error('Error reading file: ' + error_1.message);
            case 3:
              return [2 /*return*/];
          }
        });
      });
    }
    var node_address,
      sdk,
      chain_name,
      private_key,
      public_key,
      deploy_params,
      session_params,
      payment_amount,
      buffer,
      wasm,
      wasmBuffer,
      install_result,
      install_result_as_json;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          node_address = 'http://127.0.0.1:11101';
          sdk = new casper_sdk_1.SDK(node_address);
          chain_name = 'casper-net-1';
          private_key =
            '-----BEGIN PRIVATE KEY-----\n\n    -----END PRIVATE KEY-----';
          public_key = (0, casper_sdk_1.privateToPublicKey)(private_key);
          deploy_params = new casper_sdk_1.DeployStrParams(
            chain_name,
            public_key,
            private_key
          );
          session_params = new casper_sdk_1.SessionStrParams();
          session_params.session_args_json = JSON.stringify([
            {
              name: 'collection_name',
              type: 'String',
              value: 'enhanced-nft-1',
            },
            { name: 'collection_symbol', type: 'String', value: 'ENFT-1' },
            { name: 'total_token_supply', type: 'U64', value: 10 },
            { name: 'ownership_mode', type: 'U8', value: 0 },
            { name: 'nft_kind', type: 'U8', value: 1 },
            { name: 'allow_minting', type: 'Bool', value: true },
            { name: 'owner_reverse_lookup_mode', type: 'U8', value: 0 },
            { name: 'nft_metadata_kind', type: 'U8', value: 2 },
            { name: 'identifier_mode', type: 'U8', value: 0 },
            { name: 'metadata_mutability', type: 'U8', value: 0 },
            { name: 'events_mode', type: 'U8', value: 1 },
          ]);
          payment_amount = '500000000000';
          return [4 /*yield*/, loadFile()];
        case 1:
          buffer = _a.sent();
          wasm = buffer && new Uint8Array(buffer);
          wasmBuffer = wasm === null || wasm === void 0 ? void 0 : wasm.buffer;
          if (!wasmBuffer) {
            console.error('Failed to read wasm file.');
            return [2 /*return*/];
          }
          session_params.session_bytes =
            casper_sdk_1.Bytes.fromUint8Array(wasm);
          return [
            4 /*yield*/,
            sdk.install(deploy_params, session_params, payment_amount),
          ];
        case 2:
          install_result = _a.sent();
          install_result_as_json = install_result.toJson();
          console.log(install_result_as_json.deploy_hash);
          return [2 /*return*/];
      }
=======
}); };
// install
var example11 = function () { return __awaiter(void 0, void 0, void 0, function () {
    function loadFile() {
        return __awaiter(this, void 0, void 0, function () {
            var fileBuffer, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.readFile(__dirname + '/../../../tests/wasm/cep78.wasm')];
                    case 1:
                        fileBuffer = _a.sent();
                        return [2 /*return*/, fileBuffer.buffer]; // Returns an ArrayBuffer
                    case 2:
                        error_1 = _a.sent();
                        throw new Error('Error reading file: ' + error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    var node_address, events_address, sdk, chain_name, private_key, public_key, deploy_params, session_params, payment_amount, buffer, wasm, wasmBuffer, install_result, install_result_as_json, eventParseResult, cost;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                node_address = 'http://127.0.0.1:11101';
                events_address = 'http://127.0.0.1:18101/events/main';
                sdk = new casper_sdk_1.SDK(node_address);
                chain_name = 'casper-net-1';
                private_key = "-----BEGIN PRIVATE KEY-----\n    -----END PRIVATE KEY-----";
                public_key = (0, casper_sdk_1.privateToPublicKey)(private_key);
                deploy_params = new casper_sdk_1.DeployStrParams(chain_name, public_key, private_key);
                session_params = new casper_sdk_1.SessionStrParams();
                session_params.session_args_json = JSON.stringify([
                    { "name": "collection_name", "type": "String", "value": "enhanced-nft-1" },
                    { "name": "collection_symbol", "type": "String", "value": "ENFT-1" },
                    { "name": "total_token_supply", "type": "U64", "value": 100 },
                    { "name": "ownership_mode", "type": "U8", "value": 0 },
                    { "name": "nft_kind", "type": "U8", "value": 1 },
                    { "name": "allow_minting", "type": "Bool", "value": true },
                    { "name": "owner_reverse_lookup_mode", "type": "U8", "value": 0 },
                    { "name": "nft_metadata_kind", "type": "U8", "value": 2 },
                    { "name": "identifier_mode", "type": "U8", "value": 0 },
                    { "name": "metadata_mutability", "type": "U8", "value": 0 },
                    { "name": "events_mode", "type": "U8", "value": 1 }
                ]);
                payment_amount = '500000000000';
                return [4 /*yield*/, loadFile()];
            case 1:
                buffer = _d.sent();
                wasm = buffer && new Uint8Array(buffer);
                wasmBuffer = wasm === null || wasm === void 0 ? void 0 : wasm.buffer;
                if (!wasmBuffer) {
                    console.error('Failed to read wasm file.');
                    return [2 /*return*/];
                }
                session_params.session_bytes = casper_sdk_1.Bytes.fromUint8Array(wasm);
                return [4 /*yield*/, sdk.install(deploy_params, session_params, payment_amount)];
            case 2:
                install_result = _d.sent();
                install_result_as_json = install_result.toJson();
                console.log(install_result_as_json.deploy_hash);
                return [4 /*yield*/, sdk.waitDeploy(events_address, install_result_as_json.deploy_hash)];
            case 3:
                eventParseResult = _d.sent();
                cost = (_c = (_b = (_a = eventParseResult.body) === null || _a === void 0 ? void 0 : _a.DeployProcessed) === null || _b === void 0 ? void 0 : _b.execution_result.Success) === null || _c === void 0 ? void 0 : _c.cost;
                //  console.log(eventParseResult.body.DeployProcessed);
                console.log("install cost ".concat(cost));
                return [2 /*return*/];
        }
    });
}); };
// call_entrypoint
var example12 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var node_address, events_address, sdk, chain_name, private_key, public_key, contract_hash, entry_point, token_owner, payment_amount, deploy_params, session_params, call_entrypoint_result, call_entrypoint_result_as_json, deploy_hash_results, watcher, deploySubscriptions, getEventHandlerFn, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                node_address = 'http://127.0.0.1:11101';
                events_address = 'http://127.0.0.1:18101/events/main';
                sdk = new casper_sdk_1.SDK(node_address);
                chain_name = 'casper-net-1';
                private_key = "-----BEGIN PRIVATE KEY-----\n    -----END PRIVATE KEY-----";
                public_key = (0, casper_sdk_1.privateToPublicKey)(private_key);
                contract_hash = 'hash-7705c58f20c445c605ba1bf5adab66686a8f891879d6012e07fe24c8bf3af3f2';
                entry_point = 'mint';
                token_owner = 'account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611';
                payment_amount = '5000000000';
                deploy_params = new casper_sdk_1.DeployStrParams(chain_name, public_key, private_key);
                session_params = new casper_sdk_1.SessionStrParams();
                session_params.session_hash = contract_hash;
                session_params.session_entry_point = entry_point;
                session_params.session_args_simple = ["token_meta_data:String='test_meta_data'", "token_owner:Key='".concat(token_owner, "'")];
                return [4 /*yield*/, sdk.call_entrypoint(deploy_params, session_params, payment_amount)];
            case 1:
                call_entrypoint_result = _a.sent();
                call_entrypoint_result_as_json = call_entrypoint_result.toJson();
                deploy_hash_results = [call_entrypoint_result_as_json.deploy_hash];
                watcher = sdk.watchDeploy(events_address);
                deploySubscriptions = [];
                getEventHandlerFn = function (deployHash) {
                    var eventHandlerFn = function (eventParseResult) {
                        var _a, _b, _c, _d, _e, _f;
                        console.log("callback for ".concat(deployHash));
                        if (eventParseResult.err) {
                            return false;
                        }
                        else if ((_b = (_a = eventParseResult.body) === null || _a === void 0 ? void 0 : _a.DeployProcessed) === null || _b === void 0 ? void 0 : _b.execution_result.Success) {
                            console.log((_d = (_c = eventParseResult.body) === null || _c === void 0 ? void 0 : _c.DeployProcessed) === null || _d === void 0 ? void 0 : _d.execution_result.Success);
                            return true;
                        }
                        else {
                            console.error((_f = (_e = eventParseResult.body) === null || _e === void 0 ? void 0 : _e.DeployProcessed) === null || _f === void 0 ? void 0 : _f.execution_result.Failure);
                            return false;
                        }
                        ;
                    };
                    return eventHandlerFn;
                };
                deploy_hash_results.map(function (deploy_hash) { return __awaiter(void 0, void 0, void 0, function () {
                    var eventHandlerFn, deploySubscription;
                    return __generator(this, function (_a) {
                        eventHandlerFn = getEventHandlerFn(deploy_hash);
                        console.log(deploy_hash);
                        deploySubscription = new casper_sdk_1.DeploySubscription(deploy_hash, eventHandlerFn);
                        deploySubscriptions.push(deploySubscription);
                        return [2 /*return*/];
                    });
                }); });
                watcher.subscribe(deploySubscriptions);
                return [4 /*yield*/, watcher.start()];
            case 2:
                results = _a.sent();
                watcher.stop();
                console.log(results);
                return [2 /*return*/];
        }
>>>>>>> 9d6a836 (Deploy watcher + Key generation (#34))
    });
  });
};
var example12 = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var node_address,
      sdk,
      chain_name,
      private_key,
      public_key,
      contract_hash,
      entry_point,
      token_owner,
      payment_amount,
      deploy_params,
      session_params,
      call_entrypoint_result,
      call_entrypoint_result_as_json;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          node_address = 'http://127.0.0.1:11101';
          sdk = new casper_sdk_1.SDK(node_address);
          chain_name = 'casper-net-1';
          private_key =
            '-----BEGIN PRIVATE KEY-----\n\n    -----END PRIVATE KEY-----';
          public_key = (0, casper_sdk_1.privateToPublicKey)(private_key);
          contract_hash =
            'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
          entry_point = 'mint';
          token_owner =
            'account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611';
          payment_amount = '5000000000';
          deploy_params = new casper_sdk_1.DeployStrParams(
            chain_name,
            public_key,
            private_key
          );
          session_params = new casper_sdk_1.SessionStrParams();
          session_params.session_hash = contract_hash;
          session_params.session_entry_point = entry_point;
          session_params.session_args_simple = [
            "token_meta_data:String='test_meta_data'",
            "token_owner:Key='".concat(token_owner, "'"),
          ];
          return [
            4 /*yield*/,
            sdk.call_entrypoint(deploy_params, session_params, payment_amount),
          ];
        case 1:
          call_entrypoint_result = _a.sent();
          call_entrypoint_result_as_json = call_entrypoint_result.toJson();
          console.log(call_entrypoint_result_as_json.deploy_hash);
          return [2 /*return*/];
      }
    });
  });
};
