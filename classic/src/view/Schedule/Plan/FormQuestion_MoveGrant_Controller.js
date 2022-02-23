Ext.define('GSmartApp.view.Schedule.Plan.FormQuestion_MoveGrant_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormQuestion_MoveGrant_Controller',
    init: function(){
      
    } ,
    control: {
        '#btnThoat' : {
            click: 'onThoat'
        },
        '#btnLuu' : {
            click: 'onLuu'
        }
    },
    onThoat: function(){
        // this.getView().up('window').close();
        this.fireEvent('Thoat');
    },
    onLuu: function() {
        var viewmodel = this.getViewModel();
        this.fireEvent('Chon', viewmodel.get('isBreak'));
    }
})