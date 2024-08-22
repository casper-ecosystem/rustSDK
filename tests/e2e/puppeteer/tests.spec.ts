import * as config from './config';
const path = require('path');
import { setupFixtures, variables as test, deleteFile, getResult, clear, clearInput, setSecretKey, seletAction, setWasm, submit, get_state_root_hash, sign, screenshot, delay, get_block } from './helpers';
const puppeteer = require('puppeteer');

describe('Angular App Tests', () => {
  beforeAll(async () => {
    setupFixtures();
    test.browser = await puppeteer.launch({ headless: 'new' });
    test.page = await test.browser.newPage();
    await test.page.goto(config.app_address);
    await test.page.setViewport({
      width: 1920,
      height: 1080,
    });
    // test.page
    //   .on('console', (message: { type: () => string; text: () => any; }) =>
    //     console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
    //   .on('pageerror', (message: any) => console.log(message))
    //   .on('requestfailed', (request: { failure: () => { (): any; new(): any; errorText: any; }; url: () => any; }) =>
    //     console.log(`${request.failure().errorText} ${request.url()}`));
  });

  describe('Loading', () => {
    it('should have a title', async () => {
      const title = await test.page.title();
      expect(title).toBe('Casper Client');
    });

    it('should have a state_root_hash', async () => {
      await test.page.waitForSelector('[e2e-id="state_root_hash"]');
      const state_root_hash = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="state_root_hash"]')?.textContent;
      });
      const pattern = /^state root hash is ([0-9a-f]{64})$/i;
      expect(state_root_hash).toMatch(pattern);
      test.state_root_hash_default = (state_root_hash.match(pattern) || [])[1] || '';
      expect(test.state_root_hash_default).toBeDefined();
    });

    it('should have action to get_node_status by default', async () => {
      await test.page.waitForSelector('[e2e-id="selectActionElt"]');
      const action = await test.page.evaluate(() => {
        return (document.querySelector('[e2e-id="selectActionElt"]') as HTMLSelectElement).value;
      });
      expect(action).toBe('get_node_status');
      await getResult();
    });

    it('should have chain_name and node_address', async () => {
      await test.page.waitForSelector('[e2e-id="selectActionElt"]');
      const chainname = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="chain_name"]')?.textContent;
      });
      const node_address = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="node_address"]')?.textContent;
      });
      expect(chainname).toBe(config.chain_name);
      expect(node_address).toBe(config.app_address);
    });

    it('should clear result', async () => {
      await test.page.waitForSelector('[e2e-id="clear result"]');
      let result = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(result).toBeDefined();
      await clear();
      result = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(result).toBeUndefined();
    });
  });

  describe('Setting public key and get account info', () => {
    it('should set public key', async () => {
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      const account_input = await test.page.evaluate(() => {
        return (document.querySelector('[e2e-id="publicKeyElt"]') as HTMLInputElement).value;
      });
      const pattern = /^[0-9a-f]{66}$/i;
      expect(account_input).toMatch(pattern);
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await test.page.waitForSelector('[e2e-id="account_hash"]');
    });

    it('should have a main purse uref', async () => {
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      const main_purse = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="main_purse"]')?.textContent;
      });
      const pattern = /^main purse is uref-[0-9a-f\-]{68}$/i;
      expect(main_purse).toMatch(pattern);
    });

    it('should have an account hash', async () => {
      await test.page.waitForSelector('[e2e-id="account_hash"]');
      const account_hash = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="account_hash"]')?.textContent;
      });
      const pattern = /^account hash is account-hash-[0-9a-f]{64}$/i;
      expect(account_hash).toMatch(pattern);
    });
  });


  describe('Contract install deploy', () => {
    beforeEach(async () => {
      await test.page.reload();
      await seletAction('install_deploy');
      await setSecretKey();
      await test.page.waitForSelector('[e2e-id="paymentAmountElt"]');
      await test.page.waitForSelector('[e2e-id="argsSimpleElt"]');
      await clearInput('[e2e-id="argsSimpleElt"]');
      await test.page.waitForSelector('[e2e-id="argsJsonElt"]');
      await clearInput('[e2e-id="argsJsonElt"]');
    });

    it('should install hello contract', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      await setWasm(config.contract_hello);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeDefined();
      deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      deploy = JSON.parse(deploy);
      expect(deploy?.deploy_hash).toBeDefined();
      test.deploy_hash = deploy.deploy_hash;
    });
  });

  describe('Contract install transaction', () => {
    beforeEach(async () => {
      await test.page.reload();
      await seletAction('install');
      await setSecretKey();
      await test.page.waitForSelector('[e2e-id="paymentAmountElt"]');
      await test.page.waitForSelector('[e2e-id="argsSimpleElt"]');
      await clearInput('[e2e-id="argsSimpleElt"]');
      await test.page.waitForSelector('[e2e-id="argsJsonElt"]');
      await clearInput('[e2e-id="argsJsonElt"]');
    });

    it('should install cep78 contract', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount_contract_cep78);
      await test.page.type('[e2e-id="argsJsonElt"]', config.args_json);
      await setWasm(config.contract_cep78);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');

      let transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeDefined();
      transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      transaction = JSON.parse(transaction);
      expect(transaction?.transaction_hash).toBeDefined();
      test.transaction_hash = transaction.transaction_hash?.Version1?.toString();
    });
  });

  describe.skip('Rpc call get_account', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_account');
    });
    afterEach(async () => {
      await clear();
    });

    it('should get_account from public key', async () => {
      await test.page.waitForSelector('[e2e-id="accountIdentifierElt"]');
      await clearInput('[e2e-id="accountIdentifierElt"]');
      await test.page.type('[e2e-id="accountIdentifierElt"]', test.account);
      await submit();
      const result = await getResult();
      const pattern = /\"account-hash-[0-9a-f]{64}\"/i;
      expect(result).toMatch(pattern);
    });

    it('should get_account from account hash', async () => {
      await test.page.waitForSelector('[e2e-id="accountIdentifierElt"]');
      await clearInput('[e2e-id="accountIdentifierElt"]');
      await test.page.type('[e2e-id="accountIdentifierElt"]', test.account_hash);
      await submit();
      const result = await getResult();
      const pattern = new RegExp(`"${test.account_hash}"`, 'i');
      expect(result).toMatch(pattern);
    });

    it('should get_account from public key with block', async () => {
      await test.page.waitForSelector('[e2e-id="accountIdentifierElt"]');
      await clearInput('[e2e-id="accountIdentifierElt"]');
      await test.page.type('[e2e-id="accountIdentifierElt"]', test.account);
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.type('[e2e-id="blockIdentifierHeightElt"]', test.block_height);
      await submit();
      let result = await getResult();
      const pattern = /\"account-hash-[0-9a-f]{64}\"/i;
      expect(result).toMatch(pattern);
      await clear();
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.type('[e2e-id="blockIdentifierHashElt"]', test.block_hash);
      await submit();
      result = await getResult();
      expect(result).toMatch(pattern);
    });
  });

  describe('Rpc call get_auction_info', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_auction_info');
    });
    afterEach(async () => {
      await clear();
    });

    it('should get_auction_info', async () => {
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_balance', () => {
    beforeAll(async () => {
      await test.page.reload();
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('get_balance');
      await test.page.waitForSelector('[e2e-id="purseUrefElt"]');
      await test.page.waitForSelector('[e2e-id="stateRootHashElt"]');
    });

    afterEach(async () => {
      await clear();
    });

    it('should get_balance with state root hash', async () => {
      await test.page.type('[e2e-id="stateRootHashElt"]', test.state_root_hash_default);
      let main_purse = await test.page.evaluate(() => {
        return (document.querySelector('[e2e-id="purseUrefElt"]') as HTMLInputElement).value;
      });
      expect(main_purse).toBeDefined();
      await submit();
      await getResult();
    });

    it('should get_balance without state root hash', async () => {
      await clearInput('[e2e-id="stateRootHashElt"]');
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_block', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_block');
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.waitForSelector('[e2e-id="blockIdentifierHashElt"]');
    });
    afterEach(async () => {
      await clear();
    });

    it('should get_block', async () => {
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await submit();
      await getResult();
    });

    it('should get_block with block height', async () => {
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await test.page.type('[e2e-id="blockIdentifierHeightElt"]', test.block_height);
      await submit();
      await getResult();
    });

    it('should get_block with block hash', async () => {
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await test.page.type('[e2e-id="blockIdentifierHashElt"]', test.block_hash);
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_block_transfers', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_block_transfers');
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
    });
    afterEach(async () => {
      await clear();
    });

    it('should get_block_transfers', async () => {
      await submit();
      await getResult();
    });

    it('should get_block_transfers with block height', async () => {
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.type('[e2e-id="blockIdentifierHeightElt"]', test.block_height);
      await submit();
      await getResult();
    });

    it('should get_block_transfers with block hash', async () => {
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await test.page.type('[e2e-id="blockIdentifierHashElt"]', test.block_hash);
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_chainspec', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_chainspec');
    });
    afterEach(async () => {
      await clear();
    });
    it('should get_chainspec', async () => {
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_era_info', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_era_info');
      await test.page.waitForSelector('[e2e-id="blockIdentifierHashElt"]');
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
    });

    afterEach(async () => {
      await clear();
    });

    it('should get_era_info', async () => {
      await submit();
      await getResult();
    });

    it('should get_era_info with block height', async () => {
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.type('[e2e-id="blockIdentifierHeightElt"]', test.block_height);
      await submit();
      await getResult();
    });

    it('should get_era_info with block hash', async () => {
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.waitForSelector('[e2e-id="blockIdentifierHashElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await test.page.type('[e2e-id="blockIdentifierHashElt"]', test.block_hash);
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_node_status', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_node_status');
    });
    afterEach(async () => {
      await clear();
    });
    it('should get_node_status', async () => {
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_peers', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_peers');
    });
    afterEach(async () => {
      await clear();
    });

    it('should get_peers', async () => {
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_state_root_hash', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_state_root_hash');
    });
    afterEach(async () => {
      await clear();
    });
    it('should get_state_root_hash', async () => {
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_validator_changes', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_validator_changes');
    });
    afterEach(async () => {
      await clear();
    });
    it('should get_validator_changes', async () => {
      await submit();
      await getResult();
    });
  });

  describe('Rpc call list_rpcs', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('list_rpcs');
    });
    afterEach(async () => {
      await clear();
    });
    it('should list_rpcs', async () => {
      await submit();
      await getResult();
    });
  });

  describe('Rpc call query_balance', () => {
    beforeAll(async () => {
      await test.page.reload();
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('query_balance');
      await test.page.waitForSelector('[e2e-id="stateRootHashElt"]');
      await test.page.waitForSelector('[e2e-id="purseIdentifierElt"]');
    });

    afterEach(async () => {
      await clear();
    });

    it('should query_balance with purse identifier', async () => {
      await test.page.type('[e2e-id="stateRootHashElt"]', test.state_root_hash_default);
      await submit();
      await getResult();
    });

    it('should query_balance without state root hash', async () => {
      await clearInput('[e2e-id="stateRootHashElt"]');
      await submit();
      await getResult();
    });

    it('should query_balance with public key', async () => {
      await clearInput('[e2e-id="purseIdentifierElt"]');
      await test.page.type('[e2e-id="purseIdentifierElt"]', test.account);
      await submit();
      await getResult();
    });

    it('should query_balance with account hash', async () => {
      await clearInput('[e2e-id="purseIdentifierElt"]');
      await test.page.type('[e2e-id="purseIdentifierElt"]', test.account_hash);
      await submit();
      await getResult();
    });

    it('should query_balance with block height', async () => {
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.type('[e2e-id="blockIdentifierHeightElt"]', test.block_height);
      await submit();
      await getResult();
    });

    it('should query_balance with block hash', async () => {
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await test.page.type('[e2e-id="blockIdentifierHashElt"]', test.block_hash);
      await submit();
      await getResult();
    });
  });

  describe('Rpc call query_balance details', () => {
    beforeAll(async () => {
      await test.page.reload();
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('query_balance_details');
      await test.page.waitForSelector('[e2e-id="stateRootHashElt"]');
      await test.page.waitForSelector('[e2e-id="purseIdentifierElt"]');
    });

    afterEach(async () => {
      await clear();
    });

    it('should query_balance details with purse identifier', async () => {
      await test.page.type('[e2e-id="stateRootHashElt"]', test.state_root_hash_default);
      await submit();
      await getResult();
    });

    it('should query_balance details without state root hash', async () => {
      await clearInput('[e2e-id="stateRootHashElt"]');
      await submit();
      await getResult();
    });

    it('should query_balance details with public key', async () => {
      await clearInput('[e2e-id="purseIdentifierElt"]');
      await test.page.type('[e2e-id="purseIdentifierElt"]', test.account);
      await submit();
      await getResult();
    });

    it('should query_balance details with account hash', async () => {
      await clearInput('[e2e-id="purseIdentifierElt"]');
      await test.page.type('[e2e-id="purseIdentifierElt"]', test.account_hash);
      await submit();
      await getResult();
    });

    it('should query_balance details with block height', async () => {
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.type('[e2e-id="blockIdentifierHeightElt"]', test.block_height);
      await submit();
      await getResult();
    });

    it('should query_balance details with block hash', async () => {
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await test.page.type('[e2e-id="blockIdentifierHashElt"]', test.block_hash);
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_deploy', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_deploy');
    });

    afterEach(async () => {
      await clear();
    });

    it('should get_deploy', async () => {
      expect(test.deploy_hash).toBeDefined();
      await test.page.waitForSelector('[e2e-id="deployHashElt"]');
      await clearInput('[e2e-id="deployHashElt"]');
      await test.page.type('[e2e-id="deployHashElt"]', test.deploy_hash);
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_transaction', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_transaction');
    });

    afterEach(async () => {
      await clear();
    });

    it('should get_transaction', async () => {
      expect(test.deploy_hash).toBeDefined();
      await test.page.waitForSelector('[e2e-id="transactionHashElt"]');
      await clearInput('[e2e-id="transactionHashElt"]');
      await test.page.type('[e2e-id="transactionHashElt"]', test.transaction_hash);
      await submit();
      await getResult();
    });
  });

  describe('Rpc call query_global_state', () => {
    beforeAll(async () => {
      await test.page.reload();
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('query_global_state');
      await test.page.waitForSelector('[e2e-id="stateRootHashElt"]');
      await test.page.waitForSelector('[e2e-id="queryKeyElt"]');
      await test.page.waitForSelector('[e2e-id="queryPathElt"]');
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
    });

    afterEach(async () => {
      await clear();
    });

    it('should query_global_state with account key', async () => {
      await test.page.type('[e2e-id="stateRootHashElt"]', test.state_root_hash_default);
      await test.page.type('[e2e-id="queryKeyElt"]', test.account_hash);
      await submit();
      await getResult();
    });

    it('should query_global_state without state root hash', async () => {
      await clearInput('[e2e-id="queryKeyElt"]');
      await test.page.type('[e2e-id="queryKeyElt"]', test.account_hash);
      await clearInput('[e2e-id="stateRootHashElt"]');
      await submit();
      await getResult();
    });

    it('should query_global_state with block height', async () => {
      await clearInput('[e2e-id="stateRootHashElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.type('[e2e-id="blockIdentifierHeightElt"]', test.block_height);
      await clearInput('[e2e-id="queryKeyElt"]');
      await test.page.type('[e2e-id="queryKeyElt"]', test.account_hash);
      await submit();
      await getResult();
    });

    it('should query_global_state with block hash', async () => {
      await clearInput('[e2e-id="stateRootHashElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await test.page.type('[e2e-id="blockIdentifierHashElt"]', test.block_hash);
      await clearInput('[e2e-id="queryKeyElt"]');
      await test.page.type('[e2e-id="queryKeyElt"]', test.account_hash);
      await submit();
      await getResult();
    });

    it(`should query_global_state with test_hello_key`, async () => {
      await clearInput('[e2e-id="stateRootHashElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await clearInput('[e2e-id="stateRootHashElt"]');
      await test.page.type('[e2e-id="queryPathElt"]', config.test_hello_key);
      await clearInput('[e2e-id="queryKeyElt"]');
      await test.page.type('[e2e-id="queryKeyElt"]', test.account_hash);
      await submit();
      await getResult();
      await clearInput('[e2e-id="queryKeyElt"]');
      await clearInput('[e2e-id="queryPathElt"]');
    });

    it(`should query_global_state with account key and path and get entity`, async () => {
      expect(test.account).toBeDefined();
      expect(config.contract_cep78_key).toBeDefined();
      await test.page.reload();
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('query_global_state');
      await clearInput('[e2e-id="queryPathElt"]');
      await clearInput('[e2e-id="stateRootHashElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await clearInput('[e2e-id="stateRootHashElt"]');
      await clearInput('[e2e-id="queryKeyElt"]');
      await test.page.type('[e2e-id="queryKeyElt"]', test.account_hash);
      await submit();
      await getResult();
      let result = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      let result_json = JSON.parse(result);

      // Get account entity
      expect(result_json?.stored_value.CLValue.parsed).toBeDefined();
      test.entity_account = result_json?.stored_value.CLValue.parsed.toString();

      // Test a global key
      await clearInput('[e2e-id="queryPathElt"]');
      await test.page.type('[e2e-id="queryPathElt"]', config.contract_cep78_key + '/collection_name');
      await clear();
      await submit();
      await getResult();
      result = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      result_json = JSON.parse(result);
      expect(result_json?.stored_value.CLValue.parsed).toEqual(config.collection_name);
    });
  });

  describe('Rpc call get_entity', () => {
    beforeAll(async () => {
      await get_state_root_hash(); // refresh state root hash
      await test.page.reload();
      await seletAction('get_entity');
    });
    afterEach(async () => {
      await clear();
    });

    it('should get_entity from public key', async () => {
      await test.page.waitForSelector('[e2e-id="entityIdentifierElt"]');
      await clearInput('[e2e-id="entityIdentifierElt"]');
      await test.page.type('[e2e-id="entityIdentifierElt"]', test.account);
      await submit();
      const result = await getResult();
      const pattern = /\"account-hash-[0-9a-f]{64}\"/i;
      expect(result).toMatch(pattern);
    });

    it('should get_entity from account hash', async () => {
      await test.page.waitForSelector('[e2e-id="entityIdentifierElt"]');
      await clearInput('[e2e-id="entityIdentifierElt"]');
      await test.page.type('[e2e-id="entityIdentifierElt"]', test.account_hash);
      await submit();
      const result = await getResult();
      const pattern = new RegExp(`"${test.account_hash}"`, 'i');
      expect(result).toMatch(pattern);
    });

    it('should get_entity from public key with block', async () => {
      await test.page.waitForSelector('[e2e-id="entityIdentifierElt"]');
      await clearInput('[e2e-id="entityIdentifierElt"]');
      await test.page.type('[e2e-id="entityIdentifierElt"]', test.account);
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.type('[e2e-id="blockIdentifierHeightElt"]', test.block_height);
      await submit();
      let result = await getResult();
      const pattern = /\"account-hash-[0-9a-f]{64}\"/i;
      expect(result).toMatch(pattern);
      await clear();
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.type('[e2e-id="blockIdentifierHashElt"]', test.block_hash);
      await submit();
      result = await getResult();
      expect(result).toMatch(pattern);
    });

    it(`should get_entity from entity account to set contract hash`, async () => {
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await test.page.waitForSelector('[e2e-id="entityIdentifierElt"]');
      await clearInput('[e2e-id="entityIdentifierElt"]');
      await test.page.type('[e2e-id="entityIdentifierElt"]', test.entity_account);
      await submit();
      await getResult();
      const result = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      const result_json = JSON.parse(result);
      const named_keys = result_json?.entity_result?.AddressableEntity.named_keys as Array<{ name: string; key: string; }>;
      test.contract_cep78_entity = named_keys.find(key => key.name === config.contract_cep78_key)?.key || '';
      test.contract_cep78_package_hash = named_keys.find(key => key.name === config.package_cep78_key)?.key || '';
      expect(test.contract_cep78_entity).toBeDefined();
      if (!test.contract_cep78_entity) {
        throw 'test.contract_cep78_entity missing';
      }
      test.contract_cep78_hash = test.contract_cep78_entity.replace('entity-contract', 'hash');
    });
  });

  describe('Contract query_contract_key', () => {
    beforeEach(async () => {
      await get_state_root_hash(); // refresh state root hash
      await test.page.reload();
      await seletAction('query_contract_key');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await test.page.waitForSelector('[e2e-id="queryKeyElt"]');
      await test.page.waitForSelector('[e2e-id="queryPathElt"]');
    });

    afterEach(async () => {
      await clear();
    });

    it('should query_contract_key with contract entity', async () => {
      await get_block();
      await test.page.type('[e2e-id="blockIdentifierHashElt"]', test.block_hash);
      await test.page.type('[e2e-id="queryKeyElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="queryPathElt"]', 'installer');
      await submit();
      await getResult();
    });

    it('should query_contract_key with contract entity without state root hash', async () => {
      await test.page.type('[e2e-id="queryKeyElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="queryPathElt"]', 'installer');
      await submit();
      await getResult();
    });
  });

  describe('Contract call entry point deploy', () => {
    beforeEach(async () => {
      await test.page.reload();
      await setSecretKey();
      await seletAction('call_entrypoint_deploy');
      await test.page.waitForSelector('[e2e-id="paymentAmountElt"]');
      await test.page.waitForSelector('[e2e-id="sessionHashElt"]');
      await test.page.waitForSelector('[e2e-id="entryPointElt"]');
      await test.page.waitForSelector('[e2e-id="argsSimpleElt"]');
      await clearInput('[e2e-id="argsSimpleElt"]');
      await test.page.waitForSelector('[e2e-id="argsJsonElt"]');
      await clearInput('[e2e-id="argsJsonElt"]');
    });
    afterEach(async () => {
      await clear();
    });

    it('should call entry point with contract hash', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      let call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeDefined();
    });

    it('should should call entry point with contract name', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.waitForSelector('[e2e-id="sessionNameElt"]');
      await test.page.type('[e2e-id="sessionNameElt"]', config.contract_cep78_key);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      let call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeDefined();
    });

    it('should should call entry point with contract hash and args simple', async () => {
      let args_simple_mint =
        `token_meta_data:String='test_meta_data',token_owner:Key='${test.account_hash}'`;
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', args_simple_mint);
      let call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeDefined();
    });

    it('should should call entry point with contract hash and args json', async () => {
      let args_json_mint = `[{"name": "token_meta_data", "type": "String", "value": "test_meta_data_json"},
      {"name": "token_owner", "type": "Key", "value": "${test.account_hash}"}]`;
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsJsonElt"]', args_json_mint);
      let call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeDefined();
    });

    it('should should call entry point with package hash and args simple', async () => {
      let args_simple_mint =
        `token_meta_data:String='test_meta_data',token_owner:Key='${test.account_hash}'`;
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_package_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', args_simple_mint);
      await test.page.waitForSelector('[e2e-id="callPackageElt"]');
      await test.page.click('[e2e-id="callPackageElt"]');
      await test.page.waitForSelector('[e2e-id="versionElt"]');
      await test.page.type('[e2e-id="versionElt"]', "1");
      let call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeDefined();
    });
  });

  describe('Contract call entry point transaction', () => {
    beforeEach(async () => {
      await test.page.reload();
      await setSecretKey();
      await seletAction('call_entrypoint');
      await test.page.waitForSelector('[e2e-id="paymentAmountElt"]');
      await test.page.waitForSelector('[e2e-id="entityHashElt"]');
      await test.page.waitForSelector('[e2e-id="entryPointElt"]');
      await test.page.waitForSelector('[e2e-id="argsSimpleElt"]');
      await clearInput('[e2e-id="argsSimpleElt"]');
      await test.page.waitForSelector('[e2e-id="argsJsonElt"]');
      await clearInput('[e2e-id="argsJsonElt"]');
    });
    afterEach(async () => {
      await clear();
    });

    it('should call entry point with entity hash', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      let call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeDefined();
    });

    it('should should call entry point with entity name', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.waitForSelector('[e2e-id="entityAliasElt"]');
      await test.page.type('[e2e-id="entityAliasElt"]', config.contract_cep78_key);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      let call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeDefined();
    });

    it('should should call entry point with entity hash and args simple', async () => {
      let args_simple_mint =
        `token_meta_data:String='test_meta_data',token_owner:Key='${test.account_hash}'`;
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', args_simple_mint);
      let call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeDefined();
    });

    it('should should call entry point with contract entity hash and args json', async () => {
      let args_json_mint = `[{"name": "token_meta_data", "type": "String", "value": "test_meta_data_json"},
      {"name": "token_owner", "type": "Key", "value": "${test.account_hash}"}]`;
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsJsonElt"]', args_json_mint);
      let call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeDefined();
    });

    it('should should call entry point with entity package hash and args simple', async () => {
      let args_simple_mint =
        `token_meta_data:String='test_meta_data',token_owner:Key='${test.account_hash}'`;
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_package_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', args_simple_mint);
      await test.page.waitForSelector('[e2e-id="callPackageElt"]');
      await test.page.click('[e2e-id="callPackageElt"]');
      await test.page.waitForSelector('[e2e-id="versionElt"]');
      await test.page.type('[e2e-id="versionElt"]', "1");
      let call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      call = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(call).toBeDefined();
    });
  });

  describe('Contract query_contract_dict', () => {
    beforeEach(async () => {
      await test.page.reload();
      await get_state_root_hash(); // refresh state root hash
      await seletAction('query_contract_dict');
      await test.page.waitForSelector('[e2e-id="stateRootHashElt"]');
      await test.page.waitForSelector('[e2e-id="seedEntityHashElt"]');
      await test.page.waitForSelector('[e2e-id="seedNameElt"]');
      await test.page.waitForSelector('[e2e-id="itemKeyElt"]');
    });

    afterEach(async () => {
      await clear();
    });

    it('should query_contract_dict with contract entity', async () => {
      await get_block();
      await test.page.type('[e2e-id="stateRootHashElt"]', test.state_root_hash_default);
      await test.page.type('[e2e-id="seedEntityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="seedNameElt"]', 'events');
      await test.page.type('[e2e-id="itemKeyElt"]', '0');
      await submit();
      await getResult();
    });

    it('should query_contract_dict with contract entity without state root hash', async () => {
      await test.page.type('[e2e-id="seedEntityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="seedNameElt"]', 'events');
      await test.page.type('[e2e-id="itemKeyElt"]', '0');
      await submit();
      await getResult();
    });
  });

  describe('Deploy util make_deploy', () => {
    beforeEach(async () => {
      await test.page.reload();
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('make_deploy');
      await test.page.waitForSelector('[e2e-id="paymentAmountElt"]');
      await test.page.waitForSelector('[e2e-id="sessionHashElt"]');
      await test.page.waitForSelector('[e2e-id="entryPointElt"]');
      await test.page.waitForSelector('[e2e-id="argsSimpleElt"]');
      await clearInput('[e2e-id="argsSimpleElt"]');
      await test.page.waitForSelector('[e2e-id="argsJsonElt"]');
      await clearInput('[e2e-id="argsJsonElt"]');
      await test.page.waitForSelector('[e2e-id="TTLElt"]');
    });
    afterEach(async () => {
      await clear();
    });
    it('should make_deploy with contract hash', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });

    it('should make_deploy with contract name', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.waitForSelector('[e2e-id="sessionNameElt"]');
      await test.page.type('[e2e-id="sessionNameElt"]', "enhanced-nft-1");
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });

    it('should make_deploy with contract hash and args simple', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });

    it('should make_deploy with contract hash and args json', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsJsonElt"]', config.args_json);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });

    it('should make_deploy with package hash and args simple', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_package_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      await test.page.waitForSelector('[e2e-id="callPackageElt"]');
      await test.page.click('[e2e-id="callPackageElt"]');
      await test.page.waitForSelector('[e2e-id="versionElt"]');
      await test.page.type('[e2e-id="versionElt"]', "1");
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });

    it('should make_deploy without TTL', async () => {
      await clearInput('[e2e-id="TTLElt"]');
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });

    it('should make_deploy with module bytes', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      await setWasm(config.contract_hello);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_deploy).toBeDefined();
    });
  });

  describe('Transaction util make_transaction', () => {
    beforeEach(async () => {
      await test.page.reload();
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('make_transaction');
      await test.page.waitForSelector('[e2e-id="paymentAmountElt"]');
      await test.page.waitForSelector('[e2e-id="entityHashElt"]');
      await test.page.waitForSelector('[e2e-id="entryPointElt"]');
      await test.page.waitForSelector('[e2e-id="argsSimpleElt"]');
      await clearInput('[e2e-id="argsSimpleElt"]');
      await test.page.waitForSelector('[e2e-id="argsJsonElt"]');
      await clearInput('[e2e-id="argsJsonElt"]');
      await test.page.waitForSelector('[e2e-id="TTLElt"]');
    });

    afterEach(async () => {
      await clear();
    });

    it('should make_transaction with contract hash', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transaction).toBeDefined();
    });

    it('should make_transaction with contract name', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.waitForSelector('[e2e-id="entityAliasElt"]');
      await test.page.type('[e2e-id="entityAliasElt"]', "enhanced-nft-1");
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transaction).toBeDefined();
    });

    it('should make_transaction with contract hash and args simple', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transaction).toBeDefined();
    });

    it('should make_transaction with contract hash and args json', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsJsonElt"]', config.args_json);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transaction).toBeDefined();
    });

    it('should make_transaction with package hash and args simple', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_package_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      await test.page.waitForSelector('[e2e-id="callPackageElt"]');
      await test.page.click('[e2e-id="callPackageElt"]');
      await test.page.waitForSelector('[e2e-id="versionElt"]');
      await test.page.type('[e2e-id="versionElt"]', "1");
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transaction).toBeDefined();
    });

    it('should make_transaction without TTL', async () => {
      await clearInput('[e2e-id="TTLElt"]');
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transaction).toBeDefined();
    });

    it('should make_transaction with module bytes', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      await setWasm(config.contract_hello);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transaction).toBeDefined();
    });
  });

  describe('Deploy util make_transfer', () => {
    beforeEach(async () => {
      await test.page.reload();
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('make_transfer');
      await test.page.waitForSelector('[e2e-id="transferAmountElt"]');
      await test.page.waitForSelector('[e2e-id="targetAccountElt"]');
    });
    afterEach(async () => {
      await clear();
    });

    it('should make_transfer', async () => {
      await clearInput('[e2e-id="transferAmountElt"]');
      await clearInput('[e2e-id="targetAccountElt"]');
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transfer = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer).toBeDefined();
    });

    it('should make_transfer without TTL', async () => {
      await clearInput('[e2e-id="transferAmountElt"]');
      await clearInput('[e2e-id="targetAccountElt"]');
      await clearInput('[e2e-id="TTLElt"]');
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transfer = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer).toBeDefined();
    });
  });

  describe('Transaction util make_transfer_transaction', () => {
    beforeEach(async () => {
      await test.page.reload();
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('make_transfer_transaction');
      await test.page.waitForSelector('[e2e-id="transferAmountElt"]');
      await test.page.waitForSelector('[e2e-id="targetAccountElt"]');
    });
    afterEach(async () => {
      await clear();
    });

    it('should make_transfer_transaction', async () => {
      await clearInput('[e2e-id="transferAmountElt"]');
      await clearInput('[e2e-id="targetAccountElt"]');
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transfer_transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer_transaction).toBeDefined();
    });

    it('should make_transfer_transaction without TTL', async () => {
      await clearInput('[e2e-id="transferAmountElt"]');
      await clearInput('[e2e-id="targetAccountElt"]');
      await clearInput('[e2e-id="TTLElt"]');
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transfer_transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer_transaction).toBeDefined();
    });
  });

  describe('Deploy util sign_deploy', () => {
    beforeAll(async () => {
      await test.page.reload();
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('make_transfer');
      await test.page.waitForSelector('[e2e-id="transferAmountElt"]');
      await test.page.waitForSelector('[e2e-id="targetAccountElt"]');
    });

    it('should sign_deploy', async () => {
      await clearInput('[e2e-id="transferAmountElt"]');
      await clearInput('[e2e-id="targetAccountElt"]');
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await getResult();
      let make_transfer = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer).toBeDefined();
      await seletAction('sign_deploy');
      const unsigned_deploy = await test.page.evaluate(() => {
        const textarea = document.querySelector('[e2e-id="deployJsonElt"]') as HTMLTextAreaElement;
        return textarea?.value;
      });
      expect(unsigned_deploy).toContain(`"approvals": []`);
      await setSecretKey();
      await sign();
      await delay(300);
      const signed_deploy = await test.page.evaluate(() => {
        const textarea = document.querySelector('[e2e-id="deployJsonElt"]') as HTMLTextAreaElement;
        return textarea?.value;
      });
      expect(signed_deploy).not.toContain(`"approvals": []`);
    });
  });

  describe('Transaction util sign_transaction', () => {
    beforeAll(async () => {
      await test.page.reload();
      await test.page.waitForSelector('[e2e-id="publicKeyElt"]');
      await clearInput('[e2e-id="publicKeyElt"]');
      await test.page.type('[e2e-id="publicKeyElt"]', test.account);
      await test.page.$eval('[e2e-id="publicKeyElt"]', (e: { blur: () => any; }) => e.blur());
      await test.page.waitForSelector('[e2e-id="main_purse"]');
      await seletAction('make_transfer_transaction');
      await test.page.waitForSelector('[e2e-id="transferAmountElt"]');
      await test.page.waitForSelector('[e2e-id="targetAccountElt"]');
    });

    it('should sign_transaction', async () => {
      await clearInput('[e2e-id="transferAmountElt"]');
      await clearInput('[e2e-id="targetAccountElt"]');
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await getResult();
      let make_transfer_transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer_transaction).toBeDefined();
      await seletAction('sign_transaction');
      const unsigned_transaction = await test.page.evaluate(() => {
        const textarea = document.querySelector('[e2e-id="transactionJsonElt"]') as HTMLTextAreaElement;
        return textarea?.value;
      });
      expect(unsigned_transaction).toContain(`"approvals": []`);
      await setSecretKey();
      await sign();
      await delay(300);
      const signed_transaction = await test.page.evaluate(() => {
        const textarea = document.querySelector('[e2e-id="transactionJsonElt"]') as HTMLTextAreaElement;
        return textarea?.value;
      });
      expect(signed_transaction).not.toContain(`"approvals": []`);
    });
  });

  describe('Deploy util put_deploy', () => {
    beforeAll(async () => {
      await test.page.reload();
      await setSecretKey();
      await seletAction('make_transfer');
      await test.page.waitForSelector('[e2e-id="transferAmountElt"]');
      await test.page.waitForSelector('[e2e-id="targetAccountElt"]');
    });

    it('should put_deploy a transfer', async () => {
      await clearInput('[e2e-id="transferAmountElt"]');
      await clearInput('[e2e-id="targetAccountElt"]');
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transfer = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer).toBeDefined();
      await seletAction('put_deploy');
      const signed_deploy = await test.page.evaluate(() => {
        const textarea = document.querySelector('[e2e-id="deployJsonElt"]') as HTMLTextAreaElement;
        return textarea?.value;
      });
      expect(signed_deploy).not.toContain(`"approvals": []`);
      await submit();
      await getResult();
    });
  });

  describe('Transaction util put_transaction', () => {
    beforeAll(async () => {
      await test.page.reload();
      await setSecretKey();
      await seletAction('make_transfer_transaction');
      await test.page.waitForSelector('[e2e-id="transferAmountElt"]');
      await test.page.waitForSelector('[e2e-id="targetAccountElt"]');
    });

    it('should put_transaction a transfer', async () => {
      await clearInput('[e2e-id="transferAmountElt"]');
      await clearInput('[e2e-id="targetAccountElt"]');
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let make_transfer = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(make_transfer).toBeDefined();
      await seletAction('put_transaction');
      const signed_transaction = await test.page.evaluate(() => {
        const textarea = document.querySelector('[e2e-id="transactionJsonElt"]') as HTMLTextAreaElement;
        return textarea?.value;
      });
      expect(signed_transaction).not.toContain(`"approvals": []`);
      await submit();
      await getResult();
    });
  });

  describe('Deploy deploy', () => {
    beforeEach(async () => {
      await test.page.reload();
      await setSecretKey();
      await seletAction('deploy');
      await test.page.waitForSelector('[e2e-id="paymentAmountElt"]');
      await test.page.waitForSelector('[e2e-id="sessionHashElt"]');
      await test.page.waitForSelector('[e2e-id="entryPointElt"]');
      await test.page.waitForSelector('[e2e-id="argsSimpleElt"]');
      await clearInput('[e2e-id="argsSimpleElt"]');
      await test.page.waitForSelector('[e2e-id="argsJsonElt"]');
      await clearInput('[e2e-id="argsJsonElt"]');
    });
    afterEach(async () => {
      await clear();
    });

    it('should deploy with contract hash', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      let deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeDefined();
    });

    it('should deploy with contract name', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.waitForSelector('[e2e-id="sessionNameElt"]');
      await test.page.type('[e2e-id="sessionNameElt"]', "enhanced-nft-1");
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      let deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeDefined();
    });

    it('should deploy with contract hash and args simple', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      let deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeDefined();
    });

    it('should deploy with contract hash and args json', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsJsonElt"]', config.args_json);
      let deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeDefined();
    });

    it('should deploy with package hash and args simple', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_package_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      await test.page.waitForSelector('[e2e-id="callPackageElt"]');
      await test.page.click('[e2e-id="callPackageElt"]');
      await test.page.waitForSelector('[e2e-id="versionElt"]');
      await test.page.type('[e2e-id="versionElt"]', "1");
      let deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeDefined();
    });

    it('should deploy without TTL', async () => {
      await clearInput('[e2e-id="TTLElt"]');
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="sessionHashElt"]', test.contract_cep78_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      let deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeDefined();
    });

    it('should deploy with module bytes', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      await setWasm(config.contract_hello);
      let deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      deploy = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(deploy).toBeDefined();
    });
  });

  describe('Deploy transaction', () => {
    beforeEach(async () => {
      await test.page.reload();
      await setSecretKey();
      await seletAction('transaction');
      await test.page.waitForSelector('[e2e-id="paymentAmountElt"]');
      await test.page.waitForSelector('[e2e-id="entityHashElt"]');
      await test.page.waitForSelector('[e2e-id="entryPointElt"]');
      await test.page.waitForSelector('[e2e-id="argsSimpleElt"]');
      await clearInput('[e2e-id="argsSimpleElt"]');
      await test.page.waitForSelector('[e2e-id="argsJsonElt"]');
      await clearInput('[e2e-id="argsJsonElt"]');
    });
    afterEach(async () => {
      await clear();
    });

    it('should deploy a transaction with contract hash', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      let transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeDefined();
    });

    it('should deploy a transaction with contract name', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.waitForSelector('[e2e-id="entityAliasElt"]');
      await test.page.type('[e2e-id="entityAliasElt"]', "enhanced-nft-1");
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      let transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeDefined();
    });

    it('should deploy a transaction with contract hash and args simple', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      let transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeDefined();
    });

    it('should deploy a transaction with contract hash and args json', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsJsonElt"]', config.args_json);
      let transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeDefined();
    });

    it('should deploy a transaction with package hash and args simple', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_package_hash);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      await test.page.waitForSelector('[e2e-id="callPackageElt"]');
      await test.page.click('[e2e-id="callPackageElt"]');
      await test.page.waitForSelector('[e2e-id="versionElt"]');
      await test.page.type('[e2e-id="versionElt"]', "1");
      let transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeDefined();
    });

    it('should deploy a transaction without TTL', async () => {
      await clearInput('[e2e-id="TTLElt"]');
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="entityHashElt"]', test.contract_cep78_entity);
      await test.page.type('[e2e-id="entryPointElt"]', config.entrypoint);
      let transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeDefined();
    });

    it('should deploy a transaction with module bytes', async () => {
      await test.page.type('[e2e-id="paymentAmountElt"]', config.payment_amount);
      await test.page.type('[e2e-id="argsSimpleElt"]', config.args_simple);
      await setWasm(config.contract_hello);
      let transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeUndefined();
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      transaction = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transaction).toBeDefined();
    });
  });

  describe('Deploy transfer', () => {
    beforeEach(async () => {
      await test.page.reload();
      await setSecretKey();
      await seletAction('transfer');
      await test.page.waitForSelector('[e2e-id="transferAmountElt"]');
      await test.page.waitForSelector('[e2e-id="targetAccountElt"]');
    });
    afterEach(async () => {
      await clear();
    });

    it('should transfer', async () => {
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let transfer = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transfer).toBeDefined();
    });

    it('should transfer without TTL', async () => {
      await clearInput('[e2e-id="TTLElt"]');
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let transfer = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transfer).toBeDefined();
    });
  });

  describe('Deploy transfer transaction', () => {
    beforeEach(async () => {
      await test.page.reload();
      await setSecretKey();
      await seletAction('transfer_transaction');
      await test.page.waitForSelector('[e2e-id="transferAmountElt"]');
      await test.page.waitForSelector('[e2e-id="targetAccountElt"]');
    });
    afterEach(async () => {
      await clear();
    });

    it('should transfer', async () => {
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let transfer = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transfer).toBeDefined();
    });

    it('should transfer without TTL', async () => {
      await clearInput('[e2e-id="TTLElt"]');
      await test.page.type('[e2e-id="transferAmountElt"]', config.transfer_amount);
      await test.page.type('[e2e-id="targetAccountElt"]', test.target);
      await submit();
      await test.page.waitForSelector('[e2e-id="result"]');
      let transfer = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(transfer).toBeDefined();
    });
  });

  describe('Rpc call get_dictionary_item', () => {
    beforeAll(async () => {
      await test.page.reload();
      await get_state_root_hash(); // refresh state root hash before querying contract dict

      await seletAction('get_entity');
      await test.page.waitForSelector('[e2e-id="entityIdentifierElt"]');
      await clearInput('[e2e-id="entityIdentifierElt"]');
      await test.page.type('[e2e-id="entityIdentifierElt"]', test.contract_cep78_entity);
      await submit();
      await getResult();
      const result = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      const result_json = JSON.parse(result);
      const named_keys = result_json?.entity_result?.AddressableEntity.named_keys as Array<{ name: string; key: string; }>;
      test.dictionary_uref = named_keys.find(key => key.name === 'events')?.key || '';

      await seletAction('get_dictionary_item');
      await test.page.waitForSelector('[e2e-id="stateRootHashElt"]');
      await test.page.waitForSelector('[e2e-id="selectDictIdentifierElt"]');
      await test.page.waitForSelector('[e2e-id="seedEntityHashElt"]');
      await test.page.waitForSelector('[e2e-id="seedNameElt"]');
      await test.page.waitForSelector('[e2e-id="itemKeyElt"]');
    });

    afterEach(async () => {
      await clear();
    });

    it('should get_dictionary_item with contract hash with state root hash', async () => {
      await test.page.waitForSelector('[e2e-id="selectDictIdentifierElt"]');
      await test.page.select('[e2e-id="selectDictIdentifierElt"]', "newFromEntityInfo");
      await test.page.waitForSelector('[e2e-id="stateRootHashElt"]');
      await test.page.type('[e2e-id="stateRootHashElt"]', test.state_root_hash_default);
      await test.page.waitForSelector('[e2e-id="seedEntityHashElt"]');
      await test.page.type('[e2e-id="seedEntityHashElt"]', test.contract_cep78_entity);
      await test.page.waitForSelector('[e2e-id="seedNameElt"]');
      await test.page.type('[e2e-id="seedNameElt"]', 'events');
      await test.page.waitForSelector('[e2e-id="itemKeyElt"]');
      await clearInput('[e2e-id="itemKeyElt"]');
      await test.page.type('[e2e-id="itemKeyElt"]', '0');
      await submit();
      await getResult();
    });

    it('should get_dictionary_item with contract hash without state root hash', async () => {
      await test.page.waitForSelector('[e2e-id="stateRootHashElt"]');
      await clearInput('[e2e-id="stateRootHashElt"]');
      await submit();
      await getResult();
      const result = await test.page.evaluate(() => {
        return document.querySelector('[e2e-id="result"]')?.textContent;
      });
      expect(result).toBeDefined();
      const result_json = JSON.parse(result);
      expect(result_json.dictionary_key).toBeDefined();
      test.dictionary_key = result_json.dictionary_key;
    });

    it('should get_dictionary_item with dictionary key', async () => {
      await test.page.waitForSelector('[e2e-id="selectDictIdentifierElt"]');
      await test.page.select('[e2e-id="selectDictIdentifierElt"]', "newFromDictionaryKey");
      await test.page.waitForSelector('[e2e-id="seedKeyElt"]');
      await clearInput('[e2e-id="seedKeyElt"]');
      await test.page.type('[e2e-id="seedKeyElt"]', test.dictionary_key);
      await submit();
      await getResult();
    });

    it('should get_dictionary_item with dictionary uref', async () => {
      await test.page.waitForSelector('[e2e-id="selectDictIdentifierElt"]');
      await test.page.select('[e2e-id="selectDictIdentifierElt"]', "newFromSeedUref");
      await test.page.waitForSelector('[e2e-id="seedUrefElt"]');
      await test.page.type('[e2e-id="seedUrefElt"]', test.dictionary_uref);
      await test.page.waitForSelector('[e2e-id="itemKeyElt"]');
      await clearInput('[e2e-id="itemKeyElt"]');
      await test.page.type('[e2e-id="itemKeyElt"]', '0');
      await submit();
      await getResult();
    });
  });

  describe('Rpc call get_era_summary', () => {
    beforeAll(async () => {
      await test.page.reload();
      await seletAction('get_era_summary');
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.waitForSelector('[e2e-id="blockIdentifierHashElt"]');
    });
    afterEach(async () => {
      await clear();
    });
    it('should get_era_summary', async () => {
      await submit();
      await getResult();
    });

    it('should get_era_summary with block height', async () => {
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.type('[e2e-id="blockIdentifierHeightElt"]', test.block_height);
      await submit();
      await getResult();
    });

    it('should get_era_summary with block hash', async () => {
      await test.page.waitForSelector('[e2e-id="blockIdentifierHeightElt"]');
      await test.page.waitForSelector('[e2e-id="blockIdentifierHashElt"]');
      await clearInput('[e2e-id="blockIdentifierHeightElt"]');
      await clearInput('[e2e-id="blockIdentifierHashElt"]');
      await test.page.type('[e2e-id="blockIdentifierHashElt"]', test.block_hash);
      await submit();
      await getResult();
    });
  });

  afterAll(async () => {
    if (test.delete_key_at_root_after_test) {
      deleteFile(path.resolve(__dirname, '../', config.key_name));
    }
    // deleteFile(path.resolve(__dirname, '../', "test.png"));
    await test.browser.close();
  });
});