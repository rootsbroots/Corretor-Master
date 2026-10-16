/* Service worker mínimo: habilita a instalação e NÃO guarda nada em cache,
   para o app sempre abrir na versão mais nova e o acesso continuar protegido. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
