/* 	"DateFormater" class is used to generate date and/or time string to work with.
 *	In get method you need to enter a, valid, string, as shown bellow, and you'll
 *	get date and/or time of current moment. Also you can add or subtract
 *	values to or from date/time. Valid examples:
 *	#1: DateFormater.get("yyyy-mm-dd H:M:S.ms");
 *	#2: DateFormater.get("yyyy[+-n] mm[+-n] dd[+-n] H[+-n] M[+-n] S ms");
 *		where [+-n] means + or - a number (yyyy+3 or dd-2)
 *	Symbol meanings:
 *	"yyyy" - 4 digit year, "yy" - two digit year, "mm" - month, "dd" - day
 *	"H" - hours, "M" - minutes, "S" - seconds, "ms" - milliseconds.
 *	These symbols are case sensitive. In you date and/or time string you can use
 *	also additional symbols that doesn't match above ones. This will help you with
 *	fast and easy timestamps formatting. 
 *	Text contained in apostrophes will not be formatted.
 *	Examples: 
 *	DateFormater.get("yyyy/mm/dd H:M:S"); result is 2014/02/24 09:41:16
 *	DateFormater.get("yyyy/mm/'dd''T'H:M:S'+2GMT'"); result is 2016/02/ddT11:37:37+2GMT
 */
var DateFormater = (function() {
    // Private methods
    var text = [];
    var repAllText = function(t) {
        var treg = t.match(/('[^']*')|("[^"]*")/ig);
        if (treg) {
            for (var i in treg) {
                t = t.replace(treg[i], "${" + i + "}");
                text.push(treg[i]);
            }
        } else {
            for (var i in text) {
                t = t.replace("${" + i + "}", text[i].replace(/'|"/g, ""));
            }
        }
        return t;
    };
    var getDate = function(who, date) {
        var check = who.toLowerCase(),
            add = check.match(/[\+-]\d+/),
            result = "";
        if (add) add = parseInt(add, 10);
        else add = 0;
        switch (check.replace(/[\+-]\d+/, "")) {
            case "yyyy":
                date.setFullYear(date.getFullYear() + add);
                result = date.getFullYear();
                break;
            case "yy":
                result = date.getFullYear().toString().substring(2) + add;
                break;
            case "mm":
                date.setMonth(date.getMonth() + add);
                result = dn(date.getMonth() + 1);
                break;
            case "dd":
                date.setDate(date.getDate() + add);
                result = dn(date.getDate());
                break;
            case "h":
                date.setHours(date.getHours() + add);
                result = dn(date.getHours());
                break;
            case "m":
                date.setMinutes(date.getMinutes() + add);
                result = dn(date.getMinutes());
                break;
            case "s":
                result = dn(date.getSeconds());
                break;
            case "ms":
                result = tn(date.getMilliseconds());
                break;
        }
        return result;
    };
    var dn = function(n) {
        if (n < 10) return "0" + n;
        return n;
    };
    var tn = function(n) {
        if (n < 100 && n >= 10) return "0" + n;
        else if (n < 10) return "00" + n;
        return n;
    };
    // Public methods
    return {
        get: function(f) {
            var reg = /(y{4}|y{2}|m{2}|d{2}|H|ms|M|S)([\+-]\d+)?|(?:\'[^\']*\')/g;
            var vals = f.match(reg),
                now = new Date();
            f = repAllText(f);
            if (vals) {
                for (var step1 in vals)
                    if (/[a-zA-Z][\+-]\d+/.test(vals[step1])) getDate(vals[step1], now);
                f = f.replace(/(y{4}|y{2}|m{2}|d{2}|H|ms|M|S)[\+-]\d+/ig, "$1");
                vals = f.match(reg);
                for (var step2 in vals) f = f.replace(vals[step2], getDate(vals[step2], now) + "");
            }
            f = repAllText(f);
            return f;
        }
    };
})();
