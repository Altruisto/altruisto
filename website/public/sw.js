"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// https://googlechrome.github.io/samples/service-worker/custom-offline-page/

/*
Copyright 2015, 2019 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
var OFFLINE_VERSION = 1;
var CACHE_NAME = 'offline'; // Customize this with a different URL if needed.

var OFFLINE_URL = 'offline.html';
self.addEventListener('install', function (event) {
  event.waitUntil(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var cache;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return caches.open(CACHE_NAME);

          case 2:
            cache = _context.sent;
            _context.next = 5;
            return cache.add(new Request(OFFLINE_URL, {
              cache: 'reload'
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))());
});
self.addEventListener('activate', function (event) {
  event.waitUntil(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!('navigationPreload' in self.registration)) {
              _context2.next = 3;
              break;
            }

            _context2.next = 3;
            return self.registration.navigationPreload.enable();

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }))()); // Tell the active service worker to take control of the page immediately.

  self.clients.claim();
});
self.addEventListener('fetch', function (event) {
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === 'navigate') {
    event.respondWith(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var preloadResponse, networkResponse, cache, cachedResponse;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return event.preloadResponse;

            case 3:
              preloadResponse = _context3.sent;

              if (!preloadResponse) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", preloadResponse);

            case 6:
              _context3.next = 8;
              return fetch(event.request);

            case 8:
              networkResponse = _context3.sent;
              return _context3.abrupt("return", networkResponse);

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              // catch is only triggered if an exception is thrown, which is likely
              // due to a network error.
              // If fetch() returns a valid HTTP response with a response code in
              // the 4xx or 5xx range, the catch() will NOT be called.
              console.log('Fetch failed; returning offline page instead.', _context3.t0);
              _context3.next = 17;
              return caches.open(CACHE_NAME);

            case 17:
              cache = _context3.sent;
              _context3.next = 20;
              return cache.match(OFFLINE_URL);

            case 20:
              cachedResponse = _context3.sent;
              return _context3.abrupt("return", cachedResponse);

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 12]]);
    }))());
  } // If our if() condition is false, then this fetch handler won't intercept the
  // request. If there are any other fetch handlers registered, they will get a
  // chance to call event.respondWith(). If no fetch handlers call
  // event.respondWith(), the request will be handled by the browser as if there
  // were no service worker involvement.

});
