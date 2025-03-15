const axios = require("axios");
const cheerio = require("cheerio");
const { URL } = require("url");

const SECURITY_HEADERS = [
  "x-content-type-options",
  "strict-transport-security",
  "x-frame-options",
  "content-security-policy",
];

async function scanPage(url, visited = new Set(), vulnerabilities = []) {
  if (visited.has(url)) return vulnerabilities;
  visited.add(url);

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    console.log(`🔍 Scanning: ${url}`);

    // Check for missing security headers
    let missingHeaders = [];
    SECURITY_HEADERS.forEach((header) => {
      if (!response.headers[header]) missingHeaders.push(header);
    });
    if (missingHeaders.length) {
      vulnerabilities.push(
        `🚨 MISSING HTTP SECURITY HEADERS: ${missingHeaders.join(
          ", "
        )} (${url})`
      );
    }

    // Check for outdated software versions in headers
    const serverHeader = response.headers["server"];
    if (serverHeader) {
      if (/apache\/2\.4\.[0-6]/i.test(serverHeader)) {
        vulnerabilities.push(
          `⚠️ OUTDATED SOFTWARE VERSION DETECTED: ${serverHeader} (${url})`
        );
      }
    }

    // Check for insecure forms
    $("form").each((_, form) => {
      const method = $(form).attr("method") || "GET";
      const action = $(form).attr("action") || "MISSING";
      if (method.toUpperCase() === "GET" || action === "MISSING") {
        vulnerabilities.push(
          `❌ INSECURE FORM: method="${method}", action="${action}" (${url})`
        );
      }
    });

    // Recursively scan internal links
    const linkPromises = [];
    $("a[href]").each((_, link) => {
      let href = $(link).attr("href");
      if (!href.startsWith("http")) {
        href = new URL(href, url).href;
      }
      if (href.startsWith(url) && !visited.has(href)) {
        linkPromises.push(scanPage(href, visited, vulnerabilities));
      }
    });

    await Promise.all(linkPromises); // Wait for all nested scans to complete
  } catch (error) {
    console.error(`❌ Failed to scan ${url}: ${error.message}`);
  }

  return vulnerabilities;
}

module.exports = { scanPage };
