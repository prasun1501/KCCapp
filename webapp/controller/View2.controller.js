sap.ui.define([
	"KCC/controller/Basecontroller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, Fragment, Filter, FilterOp, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("KCC.controller.View2", {
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();

			this.oRouter.getRoute("detail").attachPatternMatched(this.DragonTriggered, this);
		},
		DragonTriggered: function(oEvent) {

			// var fruitIndex = oEvent.getParameter("arguments").fruitId;

			// var sPath = '/fruits/' + fruitIndex;  //   "/fruits/0"   

			var sPath = this.getPath(oEvent);
			// this.getView().bindElement(sPath);
			this.getView().bindElement({
					path: sPath,
					parameters: {
						expand: 'N_PRODUCT_TO_SUPPLIER'
					}
				}

			);
		},
		onBack: function() {
			// this.getView().getParent().to("idView1");

			this.oRouter.navTo("master");
		},
		onFilter: function() {
			var that = this;

			if (!that.oSupplierPopup) {
				Fragment.load({
					name: "KCC.fragments.popup",
					type: "XML",
					id: "supplierList",
					controller: this
				}).then(function(oSupplier) { //call back function
					that.oSupplierPopup = oSupplier;
					that.oSupplierPopup.setTitle("Select Suppliers");
					that.getView().addDependent(that.oSupplierPopup);

					that.oSupplierPopup.bindAggregation("items", {
						path: '/supplier',
						template: new sap.m.DisplayListItem({
							label: '{name}',
							value: '{city}'
						})

					});

					that.oSupplierPopup.setMultiSelect(true);
					that.oSupplierPopup.open();
				});
			} else {
				that.oSupplierPopup.open();
			}
			MessageToast.show(this.readi18Text("F4LOADSUCCESS", 'SUPPLIER'));
		},
		onF4Help: function(oEvent) {
			var that = this;
			this.selectedField = oEvent.getSource();
			if (!that.oCityPopup) {
				Fragment.load({
					name: "KCC.fragments.popup",
					type: "XML",
					id: "cityList",
					controller: this
				}).then(function(oCity) { //call back function
					that.oCityPopup = oCity;
					that.oCityPopup.setTitle("Select City");
					that.getView().addDependent(that.oCityPopup);
					that.oCityPopup.bindAggregation("items", {
						path: '/cities',
						template: new sap.m.DisplayListItem({
							label: '{cityName}',
							value: '{famousFor}'
						})

					});
					that.oCityPopup.setMultiSelect(false);
					that.oCityPopup.open();
				});
			} else {
				that.oCityPopup.open();

			}

			MessageBox.show({
				text: this.readi18Text("F4LOADSUCCESS", 'CITY'),
				title: "Message "
			});
		},
		onConfirm: function(oEvent) {
			var sId = oEvent.getSource().getId();

			if (sId.indexOf("city") !== -1) {
				//read the value which was selected in the popup:
				var oSelectedItem = oEvent.getParameter("selectedItem");
				var sText = oSelectedItem.getLabel();
				//put back the value in the table cell
				this.selectedField.setValue(sText);

			} else {
				//get the table object
				var oTable = this.getView().byId("idSuppliersList");
				//read the multi selected items 
				var selectedItems = oEvent.getParameter("selectedItems");

				// create filter
				var aFilter = [];

				for (var i = 0; i < selectedItems.length; i++) {
					var element = selectedItems[i];
					var sText1 = element.getLabel();
					aFilter.push(new Filter("name", FilterOp.EQ, sText1));
				}
				var mFilter = new Filter({
					filters: aFilter,
					and: false
				});
				//apply filter on the table

				oTable.getBinding("items").filter(mFilter);
			}

		},
		onSearchPopup: function(oEvent) {
			var sVal = oEvent.getParameter("value");
			var oBinding = oEvent.getParameter("itemsBinding");
			// if () {
			var oFilter1 = new Filter("name", FilterOp.Contains, sVal);
			// } else {
			// 	var oFilter1 = new Filter("cityName", FilterOp.Contains, sVal);
			// }

			oBinding.filter(oFilter1);

		},

		onTaste: function() {

			}
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf KCC.view.View2
			 */
			//	onInit: function() {
			//
			//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf KCC.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf KCC.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf KCC.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});