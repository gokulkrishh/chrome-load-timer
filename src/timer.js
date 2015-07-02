(function() {
    if (document.readyState == "complete") {
        measure();
    } else {
        window.addEventListener("load", measure);
    }
    
    function measure() {
        setTimeout(function() {
            var t = performance.timing;
            var start = t.redirectStart == 0 ? t.fetchStart : t.redirectStart;

            if (t.loadEventEnd > 0) {
                // we have only 4 chars in our disposal including decimal point
                
                var roe = chrome.runtime && chrome.runtime.sendMessage ? 'runtime' : 'extension';

                chrome[roe].sendMessage({'timing': t});
            }
        }, 0);
    }
})();

