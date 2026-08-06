import fs from 'fs';
import path from 'path';
import { Browser, Page } from 'puppeteer';
import * as config from './config';

import { SDK, publicKeyFromSecretKey, PublicKey } from 'casper-rust-wasm-sdk';

const sdk = new SDK();

export const variables = {
  browser: undefined as unknown as Browser,
  page: undefined as unknown as Page,
  state_root_hash_default: '',
  secret_key: '',
  account: '',
  account_hash: '',
  entity_account: '',
  target: '',
  block_height: '',
  block_hash: '',
  deploy_hash: '',
  transaction_hash: '',
  dictionary_key: '',
  dictionary_uref: '',
  contract_cep78_entity: '',
  contract_cep78_hash: '',
  contract_cep78_package_hash: '',
  delete_key_at_root_after_test: false,
  sdk: undefined as unknown as typeof SDK,
};

const clearResultSel = '[e2e-id="clear result"]';

/** Click clear when present; returns whether a clear was performed. */
async function clearResultPaneIfPresent(): Promise<boolean> {
  if (!variables.page) {
    throw new Error('Puppeteer page is not initialized.');
  }
  const present = await variables.page.$(clearResultSel);
  if (!present) {
    return false;
  }
  // page.click() holds an ElementHandle; Angular CD can detach it mid-click.
  let clicked = false;
  for (let attempt = 0; attempt < 5; attempt++) {
    clicked = await variables.page.evaluate((selector) => {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (!el) {
        return false;
      }
      el.click();
      return true;
    }, clearResultSel);
    if (clicked) {
      break;
    }
    await delay(100);
  }
  if (!clicked) {
    throw new Error(`No element found for selector: ${clearResultSel}`);
  }
  await variables.page.waitForFunction(
    (selector) => !document.querySelector(selector),
    {},
    clearResultSel
  );
  return true;
}

export async function clear() {
  if (!variables.page) {
    throw new Error('Puppeteer page is not initialized.');
  }
  await variables.page.waitForSelector(clearResultSel);
  await clearResultPaneIfPresent();
  // wait for document to refresh
  await delay(1000);
  const result = await variables.page.evaluate(() => {
    return document.querySelector('[e2e-id="result"]')?.textContent;
  });
  expect(result).toBeUndefined();
}

export async function clearInput(id: string) {
  if (!variables.page) {
    throw new Error('Puppeteer page is not initialized.');
  }
  await variables.page.waitForSelector(id);
  await variables.page.$eval(id, (input: any) => {
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
  });
}

export async function submit() {
  if (!variables.page) {
    throw new Error('Puppeteer page is not initialized.');
  }
  // Drop prior pane so getResult can wait for a fresh result even when the
  // next RPC JSON is identical to the previous pane text.
  await clearResultPaneIfPresent();
  await variables.page.waitForSelector('[e2e-id="submit"]');
  await variables.page.click('[e2e-id="submit"]');
}

export async function sign() {
  if (!variables.page) {
    throw new Error('Puppeteer page is not initialized.');
  }
  await variables.page.waitForSelector('[e2e-id="sign"]');
  await variables.page.click('[e2e-id="sign"]');
}

export async function getResult(options?: { existingOk?: boolean }) {
  if (!variables.page) {
    throw new Error('Puppeteer page is not initialized.');
  }
  if (options?.existingOk) {
    await variables.page.waitForSelector('[e2e-id="result"]');
    const existing = await variables.page.evaluate(() => {
      return document.querySelector('[e2e-id="result"]')?.textContent;
    });
    expect(existing).toBeDefined();
    return existing;
  }
  await variables.page.waitForFunction(() => {
    const text =
      document.querySelector('[e2e-id="result"]')?.textContent ?? null;
    return text != null && text.length > 0;
  });
  const result = await variables.page.evaluate(() => {
    return document.querySelector('[e2e-id="result"]')?.textContent;
  });
  expect(result).toBeDefined();
  return result;
}

export async function selectAction(action: string) {
  if (!variables.page) {
    throw new Error('Puppeteer page is not initialized.');
  }
  await delay(400);
  await variables.page.waitForSelector('[e2e-id="state_root_hash"]');
  await variables.page.waitForSelector('[e2e-id="selectActionElt"]');
  await variables.page.select('[e2e-id="selectActionElt"]', action);
  await variables.page.waitForSelector('[e2e-id="selectActionElt"]');
  const action_selected = await variables.page.evaluate(() => {
    return (
      document.querySelector('[e2e-id="selectActionElt"]') as HTMLSelectElement
    ).value;
  });
  expect(action_selected).toBe(action);
  // wait for document to refresh
  await delay(400);
}

export async function setSecretKey() {
  if (!variables.page) {
    throw new Error('Puppeteer page is not initialized.');
  }
  await variables.page.waitForSelector('[e2e-id="secretKeyElt"]');
  const elementHandle = await variables.page.$('[e2e-id="secretKeyElt"]');
  const resolvedPath = path.resolve(__dirname, '../', config.key_name);
  if (fs.existsSync(resolvedPath)) {
    if (elementHandle) {
      await (
        elementHandle as import('puppeteer').ElementHandle<HTMLInputElement>
      ).uploadFile(resolvedPath);
    } else {
      console.error('Element handle for secretKeyElt is null.');
    }
  } else {
    console.error(`File ${resolvedPath} does not exist.`);
  }
  await variables.page.waitForSelector('[e2e-id="publicKeyElt"]');
  await variables.page.waitForSelector('[e2e-id="main_purse"]');
  await variables.page.waitForSelector('[e2e-id="account_hash"]');
}

export async function setWasm(file_name: string) {
  if (!variables.page) {
    throw new Error('Puppeteer page is not initialized.');
  }
  await variables.page.waitForSelector('[e2e-id="wasmElt"]');
  const elementHandle = await variables.page.$('[e2e-id="wasmElt"]');
  const resolvedPath = path.resolve(__dirname, '../../wasm', file_name);
  if (fs.existsSync(resolvedPath)) {
    if (elementHandle) {
      await (
        elementHandle as import('puppeteer').ElementHandle<HTMLInputElement>
      ).uploadFile(resolvedPath);
    } else {
      console.error('Element handle for wasmElt is null.');
    }
  } else {
    console.error(`File ${resolvedPath} does not exist.`);
  }
  await variables.page.waitForSelector('[e2e-id="wasmName"]');
  const name = await variables.page.evaluate(() => {
    return document.querySelector('[e2e-id="wasmName"]')?.textContent;
  });
  expect(name).toContain(file_name);
}

export async function screenshot() {
  if (!variables.page) {
    throw new Error('Puppeteer page is not initialized.');
  }
  await variables.page.screenshot({ path: 'test.png' });
}

export function delay(time: number | undefined) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

export async function setupFixtures() {
  let copy_key_to_root_folder = true;

  // User 1 as target for default account
  if (config.secret_key_user_1) {
    variables.secret_key = `-----BEGIN PRIVATE KEY----- ${config.secret_key_user_1} -----END PRIVATE KEY-----`;
    variables.account = publicKeyFromSecretKey(variables.secret_key);
    const copyFilePath = path.resolve(__dirname, '../', config.key_name);
    writeFile(variables.secret_key, copyFilePath);
    variables.delete_key_at_root_after_test = copy_key_to_root_folder;
  } else {
    variables.secret_key = readPEMFile(
      `${config.key_path}${config.key_name}`,
      copy_key_to_root_folder
    );
    variables.account = publicKeyFromSecretKey(variables.secret_key);
  }

  // User 2 as target for transfers etc
  if (config.secret_key_user_2) {
    const secret_key_target = `-----BEGIN PRIVATE KEY----- ${config.secret_key_user_2} -----END PRIVATE KEY-----`;
    variables.target = publicKeyFromSecretKey(secret_key_target);
  } else {
    const key_path_target = config.key_path.replace('user-1', 'user-2');
    const secret_key_target = readPEMFile(
      `${key_path_target}${config.key_name}`
    );
    variables.target = publicKeyFromSecretKey(secret_key_target);
  }

  if (!variables.account || !variables.target) {
    console.error('Missing account');
  }
  let public_key = new PublicKey(variables.account);
  if (!public_key) {
    console.error('Missing public_key');
  }
  variables.account_hash = public_key.toAccountHash().toFormattedString();
  get_block();
  if (!variables.account_hash) {
    console.error('Missing account_hash');
  }
  get_state_root_hash();
}

export function deleteFile(filePathToDelete: string) {
  try {
    if (fs.existsSync(filePathToDelete)) {
      fs.unlinkSync(filePathToDelete);
    }
  } catch (error) {
    console.error(`Error deleting file: ${filePathToDelete}`, error);
  }
}

export async function get_state_root_hash() {
  const get_state_root_hash_options = sdk.get_state_root_hash_options({
    rpc_address: config.rpc_address,
  });
  const get_state_root_hash_result = await sdk.get_state_root_hash(
    get_state_root_hash_options
  );
  variables.state_root_hash_default =
    get_state_root_hash_result?.state_root_hash
      ? get_state_root_hash_result.state_root_hash.toString()
      : '';
}

function readPEMFile(key_path?: string, copy?: boolean): string {
  let pemFilePath = key_path ? path.resolve(__dirname, key_path) : null;
  variables.delete_key_at_root_after_test = true;
  if (!pemFilePath || !fs.existsSync(pemFilePath)) {
    pemFilePath = path.resolve(__dirname, config.key_name);
    variables.delete_key_at_root_after_test = false;
  }
  try {
    const data = fs.readFileSync(pemFilePath, 'utf8');
    if (copy) {
      const copyFilePath = path.resolve(__dirname, '../', config.key_name);
      copyFile(pemFilePath, copyFilePath);
    }
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function copyFile(src: string, dest: string) {
  try {
    fs.copyFileSync(src, dest);
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error);
  }
}

function writeFile(content: string, dest: string) {
  try {
    fs.writeFileSync(dest, content);
  } catch (error) {
    console.error(`Error writing content to ${dest}:`, error);
  }
}

export async function get_block() {
  const chain_get_block_options = sdk.get_block_options({
    rpc_address: config.rpc_address,
  });
  const block_result = await sdk.get_block(chain_get_block_options);
  variables.block_hash = block_result?.block?.hash?.toString();
  variables.block_height = block_result?.block?.header?.height?.toString();
}
