sap.ui.define([
	"KCC/controller/Basecontroller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOp) {
	"use strict";
	return Controller.extend("KCC.controller.View1", {
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("detail").attachPatternMatched(this.MasterDragonTriggered, this);
		},
		MasterDragonTriggered: function(oEvent) {
			var sPath = this.getPath(oEvent);
			var oList = this.getView().byId("idList");
			debugger;
			var element;
			if (oList.getItems().length > 0) {
				for (var i = 0; i < oList.getItems().length; i++) {
					element = oList.getItems()[i];
					if (element.getBindingContextPath() === sPath) {
						oList.setSelectedItem(element);
						break;
					}
				}
			}
		},
        onCreateProduct: function(){
            this.oRouter.navTo("create");
        },
		onNext: function() {
			//step 1: get the parent control object - Container for our view
			var oAppCon = this.getView().getParent();
			//step 2: ask parent to nav to next view
			oAppCon.to("idView2");
		},
		onItemClick: function(oEvent) {
			// this.onNext();
			this.oRouter.navTo("detail", {
				fruitId: oEvent.getParameter("listItem").getBindingContextPath().split("/")[1]
			});
		},
		onSearch: function(oEvent) {
				var sVal = oEvent.getParameter("newValue");
				///liveChange
				if (sVal === "" || !sVal) {
					sVal = oEvent.getParameter("query"); //normal search using ENTER or search icon
				}
				// var oFilter1 = new Filter("name", FilterOp.Contains, sVal); // "field", operator, variable
				// var oFilter2 = new Filter("taste", FilterOp.Contains, sVal);
				// var aFilter = [oFilter1, oFilter2];
				// var oMaster = new Filter({
				// 	filters: aFilter,
				// 	and: false
				// });
				var oMaster = new Filter("CATEGORY", FilterOp.Contains, sVal);
				var oList = this.getView().byId("idList");
				oList.getBinding("items").filter(oMaster);
			}
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf KCC.view.View1
			 */
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
			,
		/**
		 *@memberOf KCC.controller.View1
		 */
		onCreateProduct: function(oEvent) {
			//This code was generated by the layout editor.
		}
	});
});