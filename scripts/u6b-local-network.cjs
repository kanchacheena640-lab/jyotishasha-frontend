// QA/build preload: fail closed before connecting to any non-loopback host.
const net = require('node:net');
const dns = require('node:dns');
const local = host => !host || ['localhost', '127.0.0.1', '::1', '[::1]'].includes(host);
const connect = net.Socket.prototype.connect;
net.Socket.prototype.connect = function (...args) {
  const normalized = net._normalizeArgs(args)[0];
  if (!local(normalized.host)) throw new Error('U6B QA blocks external network connections');
  return connect.apply(this, args);
};
const lookup = dns.lookup;
dns.lookup = function (host, ...args) {
  if (!local(host)) throw new Error('U6B QA blocks external DNS');
  return lookup.call(this, host, ...args);
};
process.env.BACKEND_URL = 'http://127.0.0.1:5000';
process.env.NEXT_PUBLIC_BACKEND_URL = 'http://127.0.0.1:5000';
process.env.NEXT_TELEMETRY_DISABLED = '1';
// Avoid the pre-existing locked .next/trace file without deleting/replacing prior output.
// This changes only the in-memory config for this QA invocation.
if (process.env.U6B_BUILD_OUTPUT === '1') require('../next.config.js').distDir = '.next-u6b-build';
if (process.env.U6B_DEV_OUTPUT === '1') require('../next.config.js').distDir = '.next-u6b-dev';
