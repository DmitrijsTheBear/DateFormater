# DateFormater
A small library to format date/time within JavaScript code

 * 	"DateFormater" class is used to generate date and/or time string to work with.
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
