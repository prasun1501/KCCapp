sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("KCC.Component",{
        metadata: {
        	manifest: "json"
        }, //for Manifest.json
        init: function(){
//initialization
            UIComponent.prototype.init.apply(this);
            
            //1 -> add root view and routings in the manifest.json
            // get the router object
            var oRouter = this.getRouter();
            //intialize it
            oRouter.initialize();
            
            
        }
        // createContent: function(){
        //     var oView = sap.ui.view({
        //         viewName: "KCC.view.App",
        //         id: "idAppView",
        //         type: "XML"
        //     });

        //     //Step 1:Create View1 Object
        //     var oView1 = sap.ui.view({
        //         viewName: "KCC.view.View1",
        //         id: "idView1",
        //         type: "XML"
        //     });
        //     //Step 2:Create View2 Object
        //     var oView2 = sap.ui.view({
        //         viewName: "KCC.view.View2",
        //         id: "idView2",
        //         type: "XML"
        //     });
        //     //Step 3:Get The APP Container Control Object From App.view.xml
        //     var oAppCon = oView.byId("appSplit");
        //     //Step 4:Add the View1 and View2 inside the Container
        //     // oAppCon.addPage(oView1).addPage(oView2);
        //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);
        //     return oView;
        // }
    });
});