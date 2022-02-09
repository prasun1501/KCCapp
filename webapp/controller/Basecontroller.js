sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"KCC/utils/formatter"
], function(Controller, Formatter) {
	"use strict";

	return Controller.extend("KCC.controller.Basecontroller", {
      formatter: Formatter,
		// getAppObject: function() {
		// 	return sap.ui.getCore().byId("idAppView--myApp");
		// }
		getPath: function(oEvent) {
            //  testing Git
            // TESTING AGAIN WEBIDE
            //TEST FROM BAS 2ND TIME  --- this BAS pushing 3rd time
				var fruitId = oEvent.getParameter("arguments").fruitId;
				// return '/fruits/' + fruitId;  
				return '/' + fruitId;    
			///testing conflicts WEBIDE
			
		},
			
			readi18Text: function(key, param){
				var oResourceModel = this.getOwnerComponent().getModel("i18n");
				var oResBundle = oResourceModel.getResourceBundle();
				return oResBundle.getText(key, param);
			}
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf KCC.view.View1
			 */
			//	onInit: function() {
			//
			//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf KCC.view.View1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf KCC.view.View1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf KCC.view.View1
		 */
		//	onExit: function() {
		//
		//	}

	});

<<<<<<< HEAD
});
=======
});
>>>>>>> branch 'main' of https://github.com/prasun1501/KCCapp.git