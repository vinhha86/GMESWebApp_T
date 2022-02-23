Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_valueselect.Stockin_ValueSelect_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_ValueSelect_Controller',
	init: function () {
		
	},
	control: {
        '#Stockin_ValueSelect':{
            childtap: 'onChildTap'
        },
	},
    onChildTap: function(list, location, eOpts){
        // console.log(location);
        this.fireEvent('onSelectValue', location.record.get('value'))
    }
})