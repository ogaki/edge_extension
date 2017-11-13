var default_options = [
    ['ON','google', 'https://www.google.com/search?q=%s'],
    ['ON','bing', 'https://www.bing.com/search?q=%s'],
    ['ON','duckduckgo', 'https://www.duckduckgo.com/?q=%s']];

var ite_results = [];

/* function iterate(obj, stack) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                iterate(obj[property], stack + '.' + property);
            } else {
                if (property == 'value') {
                    ite_results.push(obj[property]);
                    //console.log("iterate: " + property + "   " + obj[property]);
            }
            }
        }
    }
}
 */