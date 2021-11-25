self.addEventListener("install", (event) => {
    // console.log("[Service Wroker ] Installing Service Worker..");
    // console.log(event);
  });
  
  self.addEventListener("activate", (event) => {
    // console.log("[Service Wroker ] Activating Service Worker..");
    // console.log(event);
    return self.clients.claim();
  });
  
  self.addEventListener("fetch", (event) => {
    // console.log("[Service Wroker ] Fetching ...", event);
    event.respondWith(fetch(event.request));
  });