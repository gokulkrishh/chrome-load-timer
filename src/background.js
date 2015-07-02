// Setting a toolbar badge text
var roe = chrome.runtime && chrome.runtime.sendMessage ? 'runtime' : 'extension';
chrome[roe].onMessage.addListener(
    function(request, sender, sendResponse) {
        // This cache stores page load time for each tab, so they don't interfere
        chrome.storage.local.get('cache', function(data) {
            if (!data.cache) data.cache = {};
            data.cache['tab' + sender.tab.id] = request.timing;
            chrome.storage.local.set(data);
        });

        var start = request.timing.redirectStart == 0 ? request.timing.fetchStart : request.timing.redirectStart;

        var time  = String(((request.timing.loadEventEnd - start) / 1000).toPrecision(3)).substring(0, 4);
        
        chrome.browserAction.setBadgeText({text: time, tabId: sender.tab.id});
    }
);

// cache eviction
chrome.tabs.onRemoved.addListener(function(tabId) {
    chrome.storage.local.get('cache', function(data) {
        if (data.cache) delete data.cache['tab' + tabId];
        chrome.storage.local.set(data);
    });
});
