Ext.define('GSmartApp.view.personel.Personnel_info_Delete_CodeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_info_Delete_CodeViewController',

    init:function(){

    },
    control:{
        '#exit': {
            click: 'onClick'
        },
        '#add': {
            click: 'onChon'
        },
    },
    onClick: function (m, e, eOpts) {
        this.getView().up('window').close();
    },
    onChon:function(){
        var viewmodel= this.getViewModel();
        var form = this.getView();
        var code = viewmodel.get('personnel.code_del');
        form.fireEvent('chon',code);
    }   
})