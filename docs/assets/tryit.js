/* elevaite365 "Try it" console for the External API endpoint reference.
 *
 * Security rules this file follows, deliberately:
 *
 *  - The API key is typed by the reader and read straight from the password
 *    input at call time. It is never copied into a variable that outlives the
 *    request, never written to localStorage, sessionStorage or cookies, never
 *    put in a URL, and never sent anywhere except the allowlisted host below.
 *  - Destination hosts are a hard-coded allowlist. Nothing in the page (or in
 *    an API response) can redirect a request somewhere else.
 *  - Request paths come from fixed templates in the markup. Path parameters
 *    are URL-encoded, so a value cannot escape into another path segment.
 *  - Responses are rendered with textContent only. An API response can never
 *    inject markup or script into the page.
 *  - The generated curl command shows an environment variable, not the key,
 *    so the key cannot leak through a copied snippet or a screenshot.
 *  - Requests use credentials: 'omit' and no-referrer, and time out.
 *
 * Cross-origin note: as of external-api spec 1.1.0 the API only sends CORS
 * headers for /scenarios/{id}/lookup/, and only to dev.azure.com and
 * *.visualstudio.com. Until help.elevaite365.com is added to that allowlist,
 * Send will fail in the browser and the panel falls back to the curl command.
 */
(function () {
  "use strict";

  // Allowlist. A request can only ever be sent to one of these origins.
  var REGIONS = [
    { id: "au", label: "Australia", origin: "https://api.elevaite365.com" },
    { id: "eu", label: "Europe", origin: "https://eu-api.elevaite365.com" },
    { id: "us", label: "United States", origin: "https://us-api.elevaite365.com" },
    { id: "sg", label: "Singapore", origin: "https://sg-api.elevaite365.com" }
  ];

  var BASE_PATH = "/v1/api/external";
  var TIMEOUT_MS = 30000;
  var MAX_BODY_CHARS = 200000;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function originFor(regionId) {
    for (var i = 0; i < REGIONS.length; i++) {
      if (REGIONS[i].id === regionId) return REGIONS[i].origin;
    }
    return null;
  }

  /* ---------- shared credentials panel ---------- */

  function buildAuthPanel(host) {
    host.textContent = "";
    host.classList.add("tryit-auth");

    var head = el("div", "tryit-auth__head");
    head.appendChild(el("span", "tryit-auth__title", "Your instance"));
    host.appendChild(head);

    var row = el("div", "tryit-row");

    var regionWrap = el("label", "tryit-field");
    regionWrap.appendChild(el("span", "tryit-label", "Region"));
    var region = el("select", "tryit-input");
    region.setAttribute("data-tryit-region", "");
    REGIONS.forEach(function (r) {
      var opt = el("option", null, r.label + " (" + r.origin.replace("https://", "") + ")");
      opt.value = r.id;
      region.appendChild(opt);
    });
    regionWrap.appendChild(region);
    row.appendChild(regionWrap);

    var keyWrap = el("label", "tryit-field tryit-field--grow");
    keyWrap.appendChild(el("span", "tryit-label", "API key"));
    var key = el("input", "tryit-input");
    key.type = "password";
    key.placeholder = "X-API-Key";
    key.autocomplete = "off";
    key.spellcheck = false;
    key.setAttribute("autocapitalize", "off");
    key.setAttribute("autocorrect", "off");
    key.setAttribute("data-tryit-key", "");
    key.setAttribute("data-1p-ignore", "");
    key.setAttribute("data-lpignore", "true");
    keyWrap.appendChild(key);
    row.appendChild(keyWrap);

    var clear = el("button", "tryit-btn tryit-btn--ghost", "Clear key");
    clear.type = "button";
    clear.addEventListener("click", function () {
      key.value = "";
      key.focus();
    });
    row.appendChild(clear);

    host.appendChild(row);
    host.appendChild(el("p", "tryit-note",
      "The key stays in this browser tab and is sent only to the region you pick above. " +
      "It is not stored, and clearing it or leaving the page removes it."));

    // Nothing should ever submit this input as part of a form.
    key.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") ev.preventDefault();
    });

    return host;
  }

  /* ---------- per-endpoint panel ---------- */

  // "name:where:Label:placeholder", where "where" is body, path or query.
  // A leading "?" on the name marks it optional; a trailing "#" marks it an
  // integer, so it goes into the JSON body as a number rather than a string.
  function parseParams(spec) {
    if (!spec) return [];
    return spec.split(",").map(function (item) {
      var bits = item.split(":");
      var name = bits[0].trim();
      var optional = name.charAt(0) === "?";
      if (optional) name = name.slice(1);
      var isInt = name.charAt(name.length - 1) === "#";
      if (isInt) name = name.slice(0, -1);
      return {
        name: name,
        where: (bits[1] || "body").trim(),
        label: (bits[2] || name).trim(),
        optional: optional,
        type: isInt ? "integer" : "string",
        placeholder: bits.slice(3).join(":").trim()
      };
    }).filter(function (p) { return p.name; });
  }

  function buildUrl(origin, path, params, values) {
    var filled = path.replace(/\{([a-z_]+)\}/g, function (match, name) {
      return encodeURIComponent(values[name] || "");
    });
    var query = [];
    params.forEach(function (p) {
      if (p.where !== "query") return;
      var value = values[p.name];
      if (!value) return;
      query.push(encodeURIComponent(p.name) + "=" + encodeURIComponent(value));
    });
    return origin + BASE_PATH + filled + (query.length ? "?" + query.join("&") : "");
  }

  function bodyFor(params, values) {
    var body = null;
    params.forEach(function (p) {
      if (p.where !== "body") return;
      var value = values[p.name];
      if (p.optional && !value) return;
      body = body || {};
      body[p.name] = p.type === "integer" ? Number(value) : (value || "");
    });
    return body;
  }

  // Single-quote for a POSIX shell. A value containing a quote cannot break
  // out of the argument and become another command in a copied snippet.
  function shq(value) {
    return "'" + String(value).replace(/'/g, "'\\''") + "'";
  }

  function curlFor(method, url, body) {
    var lines = ["curl -X " + method + " " + shq(url),
                 '  -H "X-API-Key: $ELEVAITE365_API_KEY"'];
    if (body) {
      lines.push("  -H 'Content-Type: application/json'");
      lines.push("  -d " + shq(JSON.stringify(body)));
    }
    return lines.join(" \\\n");
  }

  function render(out, statusText, bodyText, kind) {
    out.textContent = "";
    out.hidden = false;
    var status = el("div", "tryit-status tryit-status--" + kind, statusText);
    out.appendChild(status);
    if (bodyText) {
      var pre = el("pre", "tryit-out");
      pre.appendChild(el("code", null, bodyText.slice(0, MAX_BODY_CHARS)));
      out.appendChild(pre);
    }
  }

  function buildPanel(host) {
    var method = (host.getAttribute("data-method") || "GET").toUpperCase();
    var path = host.getAttribute("data-path") || "/";
    var params = parseParams(host.getAttribute("data-params"));
    var warning = host.getAttribute("data-warning");

    if (method !== "GET" && method !== "POST") return;

    host.textContent = "";
    var details = el("details", "tryit");
    var summary = el("summary", "tryit__summary");
    summary.appendChild(el("span", "tryit__method tryit__method--" + method.toLowerCase(), method));
    summary.appendChild(el("span", "tryit__label", "Try it"));
    details.appendChild(summary);

    var bodyWrap = el("div", "tryit__body");

    if (warning) {
      bodyWrap.appendChild(el("p", "tryit-warn", warning));
    }

    var inputs = {};
    if (params.length) {
      var row = el("div", "tryit-row");
      params.forEach(function (p) {
        var wrap = el("label", "tryit-field tryit-field--grow");
        wrap.appendChild(el("span", "tryit-label", p.label + (p.optional ? " (optional)" : "")));
        var input = el("input", "tryit-input");
        input.type = "text";
        input.autocomplete = "off";
        input.spellcheck = false;
        input.placeholder = p.placeholder || p.name;
        wrap.appendChild(input);
        row.appendChild(wrap);
        inputs[p.name] = input;
      });
      bodyWrap.appendChild(row);
    }

    var actions = el("div", "tryit-actions");
    var send = el("button", "tryit-btn tryit-btn--primary", "Send request");
    send.type = "button";
    actions.appendChild(send);
    var showCurl = el("button", "tryit-btn tryit-btn--ghost", "Show as curl");
    showCurl.type = "button";
    actions.appendChild(showCurl);
    bodyWrap.appendChild(actions);

    var out = el("div", "tryit-result");
    out.hidden = true;
    bodyWrap.appendChild(out);

    details.appendChild(bodyWrap);
    host.appendChild(details);

    function collect() {
      var values = {};
      Object.keys(inputs).forEach(function (name) {
        values[name] = inputs[name].value.trim();
      });
      return values;
    }

    function context() {
      var regionInput = document.querySelector("[data-tryit-region]");
      var keyInput = document.querySelector("[data-tryit-key]");
      if (!regionInput || !keyInput) return null;
      var origin = originFor(regionInput.value);
      if (!origin) return null;
      return { origin: origin, key: keyInput.value.trim() };
    }

    showCurl.addEventListener("click", function () {
      var ctx = context();
      if (!ctx) return;
      var values = collect();
      var url = buildUrl(ctx.origin, path, params, values);
      render(out, "curl equivalent", curlFor(method, url, bodyFor(params, values)), "info");
    });

    send.addEventListener("click", function () {
      var ctx = context();
      if (!ctx) return;
      if (!ctx.key) {
        render(out, "Enter your API key at the top of the page first.", "", "error");
        return;
      }
      var values = collect();
      var missing = params.filter(function (p) { return !p.optional && !values[p.name]; });
      if (missing.length) {
        render(out, "Fill in: " + missing.map(function (p) { return p.label; }).join(", "), "", "error");
        return;
      }

      var url = buildUrl(ctx.origin, path, params, values);
      var body = bodyFor(params, values);
      var headers = { "X-API-Key": ctx.key };
      var init = {
        method: method,
        headers: headers,
        mode: "cors",
        credentials: "omit",
        cache: "no-store",
        referrerPolicy: "no-referrer"
      };
      if (body) {
        headers["Content-Type"] = "application/json";
        init.body = JSON.stringify(body);
      }

      var controller = new AbortController();
      init.signal = controller.signal;
      var timer = setTimeout(function () { controller.abort(); }, TIMEOUT_MS);

      send.disabled = true;
      render(out, "Sending " + method + " " + url.replace(ctx.origin, ""), "", "info");

      fetch(url, init).then(function (res) {
        return res.text().then(function (text) {
          var pretty = text;
          try { pretty = JSON.stringify(JSON.parse(text), null, 2); } catch (e) { /* not JSON */ }
          render(out, res.status + " " + res.statusText, pretty, res.ok ? "ok" : "error");
        });
      }).catch(function (err) {
        var reason = err && err.name === "AbortError"
          ? "The request timed out after " + (TIMEOUT_MS / 1000) + " seconds."
          : "The browser could not send this request. The API does not currently accept " +
            "browser calls from this site, so run the same request from a terminal instead:";
        render(out, "Request failed", reason + "\n\n" + curlFor(method, url, body), "error");
      }).then(function () {
        clearTimeout(timer);
        send.disabled = false;
        // Drop the local reference to the key as soon as the call is done.
        ctx.key = "";
        headers["X-API-Key"] = "";
      });
    });
  }

  function init() {
    var auth = document.querySelector("[data-tryit-auth]");
    if (auth) buildAuthPanel(auth);
    var panels = document.querySelectorAll("[data-tryit]");
    for (var i = 0; i < panels.length; i++) buildPanel(panels[i]);
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(init);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
