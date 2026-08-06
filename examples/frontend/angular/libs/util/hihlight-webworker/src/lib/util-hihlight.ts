import hljs from 'highlight.js';

/** Accepts a pre-stringified JSON string or an object (stringified here). */
export const highlight = (message: object | string) => {
  if (message === null || message === undefined) {
    return message;
  }
  const text =
    typeof message === 'string' ? message : JSON.stringify(message, null, 2);
  return hljs.highlight(text, { language: 'json' }).value;
};