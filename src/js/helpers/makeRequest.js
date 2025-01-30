import { TIMEOUT_SEC } from '../config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const makeRequest = async function (url) {
  try {
    const fetchRes = await fetch(url);
    const res = await Promise.race([fetchRes, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}. ${data.message}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};
