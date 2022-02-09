sap.ui.define(["sap/ui/core/format/NumberFormat"], function(NumberFormat) {
	"use strict";
	return {
		formatCurrency: function(amount, currency) {
			var oCurrencyFormat = NumberFormat.getCurrencyInstance({currencyCode: false});
			return oCurrencyFormat.format(amount, currency);
		}
	};
});