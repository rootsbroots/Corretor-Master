/* Service worker mínimo: habilita a instalação e NÃO guarda nada em cache,
   para o app sempre abrir na versão mais nova e o acesso continuar protegido. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});

/* Avisos (notificações push): lembrete de cliente, negócio parado, teste grátis e pagamento. */
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { title: "Corretor Master", body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Corretor Master", {
    body: d.body || "", tag: d.tag || "cm", icon: "icone-192.png", badge: "icone-192.png", data: { url: d.url || "/" }, renotify: true,
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const alvo = (e.notification.data && e.notification.data.url) || "/";
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((l) => {
    for (const c of l) { if ("focus" in c) return c.focus(); }
    return self.clients.openWindow(alvo);
  }));
});
