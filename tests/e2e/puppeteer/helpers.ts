const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
import * as config from './config';

const { Browser, Page } = puppeteer;

const casper_sdk = require('casper-rust-wasm-sdk');
const { SDK, privateToPublicKey, PublicKey } = casper_sdk;

export const variables = {
  browser: undefined as typeof Browser | undefined,
  page: undefined as typeof Page | undefined,
  state_root_hash_default: '',
  private_key: '',
  account: '',
  account_hash: '',
  target: '',
  block_height: '',
  block_hash: '',
  deploy_hash: '',
  dictionary_key: '',
  dictionary_uref: '',
  contract_cep78_hash: '',
  delete_key_at_root_after_test: false,
  sdk: undefined as typeof SDK | undefined,
};

export async function clear() {
  await variables.page.waitForSelector('[e2e-id="clear result"]');
  await variables.page.click('[e2e-id="clear result"]');
  await variables.page.waitForFunction(() => !document.querySelector('[e2e-id="clear result"]'));
  await delay(100);
  let result = await variables.page.evaluate(() => {
    return document.querySelector('[e2e-id="result"]')?.textContent;
  });
  expect(result).toBeUndefined();
}

export async function clearInput(id: string) {
  await variables.page.waitForSelector(id);
  await variables.page.$eval(id, (input: { value: string; }) => {
    input.value = '';
  });
  await variables.page.$eval(id, (e: { blur: () => any; }) => e.blur());
}

export async function submit() {
  await variables.page.waitForSelector('[e2e-id="submit"]');
  await variables.page.click('[e2e-id="submit"]');
}

export async function sign() {
  await variables.page.waitForSelector('[e2e-id="sign"]');
  await variables.page.click('[e2e-id="sign"]');
}

export async function getResult() {
  await variables.page.waitForSelector('[e2e-id="result"]');
  const result = await variables.page.evaluate(() => {
    return document.querySelector('[e2e-id="result"]')?.textContent;
  });
  expect(result).toBeDefined();
  return result;
}

export async function seletAction(action: string) {
  await variables.page.waitForSelector('[e2e-id="state_root_hash"]');
  await variables.page.waitForSelector('[e2e-id="selectActionElt"]');
  await variables.page.select('[e2e-id="selectActionElt"]', action);
  await variables.page.waitForSelector('[e2e-id="selectActionElt"]');
  const action_selected = await variables.page.evaluate(() => {
    return (document.querySelector('[e2e-id="selectActionElt"]') as HTMLSelectElement).value;
  });
  expect(action_selected).toBe(action);
}

export async function setPrivateKey() {
  await variables.page.waitForSelector('[e2e-id="privateKeyElt"]');
  const elementHandle = await variables.page.$('[e2e-id="privateKeyElt"]');
  const resolvedPath = path.resolve(__dirname, '../', config.key_name);
  if (fs.existsSync(resolvedPath)) {
    await elementHandle.uploadFile(resolvedPath);
  } else {
    console.error(`File [resolvedPath} does not exist.`);
  }
  await variables.page.waitForSelector('[e2e-id="publicKeyElt"]');
  await variables.page.waitForSelector('[e2e-id="main_purse"]');
  await variables.page.waitForSelector('[e2e-id="account_hash"]');
}

export async function setWasm(file_name: string) {
  await variables.page.waitForSelector('[e2e-id="wasmElt"]');
  const elementHandle = await variables.page.$('[e2e-id="wasmElt"]');
  const resolvedPath = path.resolve(__dirname, '../../wasm', file_name);
  if (fs.existsSync(resolvedPath)) {
    await elementHandle.uploadFile(resolvedPath);
  } else {
    console.error(`File [resolvedPath} does not exist.`);
  }
  await variables.page.waitForSelector('[e2e-id="wasmName"]');
  const name = await variables.page.evaluate(() => {
    return document.querySelector('[e2e-id="wasmName"]')?.textContent;
  });
  expect(name).toContain(file_name);
}

export async function screenshot() {
  await variables.page.screenshot({ path: "test.png" });
}

export function delay(time: number | undefined) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

export async function setupFixtures() {
  variables.sdk = new SDK();

  // User 1 as target for default account
  let copy_key_to_root_folder = true;
  variables.private_key = readPEMFile(`${config.key_path}${config.key_name}`, copy_key_to_root_folder);
  variables.account = privateToPublicKey(variables.private_key);

  // User 2 as target for transfers etc
  const key_path_target = config.key_path.replace('user-1', 'user-2');
  const private_key_target = readPEMFile(`${key_path_target}${config.key_name}`);
  variables.target = privateToPublicKey(private_key_target);

  if (!variables.account) {
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
      console.info(`Deleted file: ${filePathToDelete}`);
    } else {
      console.info(`File not found: ${filePathToDelete}`);
    }
  } catch (error) {
    console.error(`Error deleting file: ${filePathToDelete}`, error);
  }
}

export async function get_state_root_hash() {
  const get_state_root_hash_options = variables.sdk.get_state_root_hash_options({
    node_address: config.node_address
  });
  const get_state_root_hash_result = await variables.sdk.get_state_root_hash(get_state_root_hash_options);
  variables.state_root_hash_default = get_state_root_hash_result?.state_root_hash.toString();
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
    return "";
  }
}

function copyFile(src: string, dest: string) {
  try {
    fs.copyFileSync(src, dest);
    console.info(`Copied ${src} to ${dest}`);
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error);
  }
}

async function get_block() {
  const chain_get_block_options = variables.sdk.get_block_options({
    node_address: config.node_address
  });
  const block_result = await variables.sdk.get_block(chain_get_block_options);
  variables.block_hash = block_result?.block?.hash;
  variables.block_height = block_result?.block?.header.height.toString();
}