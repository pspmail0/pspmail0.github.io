'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "e75634b00198ab0cfcfd2bd83c79792f",
"/": "e75634b00198ab0cfcfd2bd83c79792f",
"main.dart.js": "a283700b15ef5d5f0912536eb11e1777",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "4840f8f64650c4a5b0135cffacca153d",
"assets/AssetManifest.json": "c752cd944ae32fa9b03ce92ec33bf286",
"assets/NOTICES": "8c2dbfeb4ebc157edb0337db8702ef84",
"assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/img22.jpg": "18570d7c48b1b03f83019af27aa9f544",
"assets/assets/batchphoto.png": "878280d9696e9d23afcda8e8cd6b848b",
"assets/assets/img23.jpg": "0c87a37fe3005b95028b461fe96ce650",
"assets/assets/img21.png": "640271c5a501632b6768a1169ae55b00",
"assets/assets/img20.jpg": "2b5ac2d078e8538d26587c02e989c9aa",
"assets/assets/img24.jpg": "43d1c1fe0951ca95d1aef5d68e352cd6",
"assets/assets/img25.jpg": "3b38ebfe553f831d033889dc07957f2c",
"assets/assets/slider-2_2000x.jpg": "b5fca3ee0e536f671ae3b18e0aa2ba66",
"assets/assets/banner2.png": "c7aff62ff5c2c099ff85555cbf307d6a",
"assets/assets/banner3.png": "7b111e2d7bf79e474adc52ed83669c9e",
"assets/assets/banner1.png": "723c6bd630ca815309550d10c150eeb0",
"assets/assets/red16.jpg": "c8023e444b4f9956c62cdccdde0bd9fc",
"assets/assets/banner4.png": "1f04b7ff9d803b36db5848d2857a851b",
"assets/assets/banner5.png": "6c04740562aa8684810ac3d4315451b3",
"assets/assets/red15.jpg": "a523ffa8d4e28dd6a6f98f68a707a81c",
"assets/assets/home-cart-img.jpg": "1c2ed916a02ff1d503fd1a72ff2da738",
"assets/assets/img8.jpg": "f8f1b1bd1f70719a6c9ff46bd75bc6aa",
"assets/assets/slider-3_2000x.jpg": "c8995daab50b4f43b433c91b49c6d9bb",
"assets/assets/banspice_1.jpg": "3b5e31a2bc3c4b86efef77d0c1704b52",
"assets/assets/img5.jpg": "4b6b07763523551cb0a7979706f71d6a",
"assets/assets/gro_1.png": "80d9c5512e717796d0c62eb2fd358695",
"assets/assets/img4.png": "d77c56a463a558d9d01f4d1425587e25",
"assets/assets/banimg-flour_1.jpg": "0b765566792dee5603f2faaef1e57e29",
"assets/assets/img6.jpg": "92fd23253e8ce5fa422fe639ff6dc00e",
"assets/assets/img7.jpg": "7debf27003f2ff5b3db321800e88812f",
"assets/assets/logo.png": "57e22fa46d3c2854a192575273fa467b",
"assets/assets/img3.png": "807da728ba3c7c520749f3bf2819f33f",
"assets/assets/gpslocation.jpeg": "d1a01c5ddaf6b51d26608d8b257eb2f2",
"assets/assets/img2.png": "fe44698e40f55ce0c36126336194df21",
"assets/assets/img1.png": "e0ddf7a3116a44d067a8b7940c0f5cd8",
"assets/assets/banner-01a.jpg": "ad50b6e11850061d846de71e3df8757a",
"assets/assets/clientimg1.png": "f775b267c726b601e23e17c769e0b8bc",
"assets/assets/bgimg1.png": "be33a30543f16903cec37f75ac032936",
"assets/assets/bgimg2.jpg": "8197b3ff4f38a3c5d59f15d31c772fd2",
"assets/assets/scimg3.png": "c085aeb65c68fd02fb41be0301efa0cb",
"assets/assets/banner02.jpg": "6160d40bafe21beef23556441c0468df",
"assets/assets/slider-1_2000x.jpg": "8d44366be07477d144c70fe4ebe7b760",
"assets/assets/Shop-13.png": "70c7d665bcac03d66926cc39aef836bc",
"assets/assets/bannerbg1.jpg": "d525d38460c49485224d8242c67f22e2",
"assets/assets/scimg1.png": "266e2f92de1179fc249eeb85e0cb6141"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/LICENSE",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.message == 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message = 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.add(resourceKey);
    }
  }
  return Cache.addAll(resources);
}
