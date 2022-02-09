sap.ui.define([
	"KCC/controller/Basecontroller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, Filter, FilterOp, JSONModel, MessageBox, MessageToast) {
	"use strict";
	return Controller.extend("KCC1.controller.View1", {

		onInit: function() {

			this.oModel = new JSONModel();
			this.oModel.setData({
				"productData": {
					"PRODUCT_ID": "",
					"TYPE_CODE": "PR",
					"CATEGORY": "Notebooks",
					"NAME": "",
					"DESCRIPTION": "",
					"SUPPLIER_ID": "0100000000",
					"SUPPLIER_NAME": "",
					"TAX_TARIF_CODE": "1 ",
					"PRICE": "0",
					"CURRENCY_CODE": "USD",
					"DIM_UNIT": "CM"
				}

			});

			this.getView().setModel(this.oModel, "createModel");
		},

		onSave: function() {
			// get the data from screen/local model
			// this.getView().setBusy(true);
			sap.ui.core.BusyIndicator.show();
			var payload = this.oModel.getProperty("/productData");
			//get the object of oData model object
			this.oDataModel = this.getView().getModel();
			//fire post call 

			// this.oDataModel.create("/ProductSet", payload, { //create_entity
			// 	//call back for success response
			// 	success: function(oData) {
			// 		// this.getView().setBusy(false);
			// 		sap.ui.core.BusyIndicator.hide();
			// 		MessageToast.show("Product create with id: " + oData.RPODUCT_ID);

			// 	},
			// 	//call back for error response
			// 	error: function(oError) {
			// 		// this.getView().setBusy(false);
			// 		sap.ui.core.BusyIndicator.hide();
			// 		if (oError.responseText) {
			// 			var oResp = JSON.parse(oError.responseText);
			// 			MessageBox.error(oResp.error.innererror.errordetails[0].message); //   /n
			// 		} else {
			// 			MessageBox.error("Internal error occured");
			// 		}
			// 	}
			// });

			this.oDataModel.update("/ProductSet('" + this.getView().byId("idPRODCreate").getValue() + "')", payload, { //update_entity
				//call back for success response
				success: function(oData) {
					// this.getView().setBusy(false);
					sap.ui.core.BusyIndicator.hide();
					MessageToast.show("Product updated");

				},
				//call back for error response
				error: function(oError) {
					// this.getView().setBusy(false);
					sap.ui.core.BusyIndicator.hide();
					if (oError.responseText) {
						var oResp = JSON.parse(oError.responseText);
						MessageBox.error(oResp.error.innererror.errordetails[0].message); //   /n
					} else {
						MessageBox.error("Internal error occured");
					}
				}
			});
		},
		onMostExp: function() {
			this.oDataModel = this.getView().getModel();
			var that = this;

			this.oDataModel.callFunction("/GET_MOST_EXP_PROD_BY_CAT", {
				urlParameters: {
					"I_CATEGORY": "Notebooks"
				},
				success: function(oData) {
					// this.getView().setBusy(false);

					that.oModel.setProperty("/productData", oData);

				}
			});

		},
		onDelete: function() {
			this.oDataModel = this.getView().getModel();
			var that = this;

			this.oDataModel.remove("/ProductSet('" + this.getView().byId("idPRODCreate").getValue() + "')", {
				success: function(oData) {
					// this.getView().setBusy(false);

					MessageBox.success("Entry deleted");

				}

			});

		},
		onEnter: function(oEvent) {
			var sText = oEvent.getSource().getValue();
			this.oDataModel = this.getView().getModel();
			var that = this;
			this.oDataModel.read("/ProductSet('" + sText + "')", {
				//call back for success response
				success: function(oData) {
					that.oModel.setProperty("/productData", oData);
				},
				//call back for error response
				error: function(oError) {
					// this.getView().setBusy(false);
					sap.ui.core.BusyIndicator.hide();
					if (oError.responseText) {
						var oResp = JSON.parse(oError.responseText);
						MessageBox.error(oResp.error.innererror.errordetails[0].message); //   /n
					} else {
						MessageBox.error("Internal error occured");
					}
				}
			});
		},
		onClear: function(oEvent) {

			var payload = this.oModel.getProperty("/productData");
			payload.PRODUCT_ID = '';

			this.oModel.setProperty("/productData", payload);
		}

	});

});