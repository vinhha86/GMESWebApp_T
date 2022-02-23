Ext.define('GSmartApp.view.stockout_material.stockout_m_edit.stockout_m_edit_pkl_rip.stockout_m_edit_pkl_rip_select.Stockout_M_Edit_Pkl_Rip_Select_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_M_Edit_Pkl_Rip_Select_Controller',
	init: function () {
		
	},
	control: {
        '#Stockout_M_Edit_Pkl_Rip_Select':{
            // childtap: 'onChildTap',
            select: 'onChildTap',
        },
	},
    // onChildTap: function(list, location, eOpts){
    //     // console.log(location);
    //     this.fireEvent('onSelectValue', location.record)
    // },
    onChildTap: function(list, selected, eOpts){
        // console.log(selected);
        this.fireEvent('onSelectValue', selected)
    },
})