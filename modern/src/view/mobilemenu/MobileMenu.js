Ext.define('GSmartApp.view.mobilemenu.MobileMenu', {
    extend: 'Ext.Container',
    xtype: 'MobileMenu',
    controller: 'MobileMenuController',
	viewModel: {
        type: 'MobileMenuViewModel'
    },
    requires: [
        // 'KitchenSink.model.Speaker',
        'Ext.dataview.plugin.ItemTip',
        'Ext.plugin.Responsive'
    ],

    height: '100%',
    layout: 'fit',
    width: '100%',
    cls: 'MobileMenu',

    items: [{
        xtype: 'dataview',
        cls: 'dataview-basic',
        itemId: 'MobileMenuDataview',
        itemTpl:
            '<div class="content">' +
                '<div class="contentImg {icon}"></div>' +
                '<div class="contentText">{text_vi}</div>' +
            '</div>',
        // store: 'MobileMenu',
        bind: {
            store: '{MobileMenu}'
        },
        // plugins: {
        //     dataviewtip: {
        //         align: 'tl-bl',
        //         maxHeight: 200,
        //         width: 300,
        //         scrollable: 'y',
        //         delegate: '.img',
        //         allowOver: true,
        //         anchor: true,
        //         bind: '{record}',
        //         cls: 'dataview-basic',
        //         tpl: '<strong>Affiliation</strong><div class="info">{affiliation}</div>' +
        //             '<strong>Position</strong><div class="info">{position}</div>' +
        //             '<strong>Bio</strong><div class="info">{bio:substr(0, 100)}</div>'
        //     }
        // }
    }]
});