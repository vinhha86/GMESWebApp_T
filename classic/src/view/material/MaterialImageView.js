Ext.define('GSmartApp.view.material.MaterialImageView', {
    extend: 'Ext.form.Panel',
    xtype: 'MaterialImageView',
    id: 'MaterialImageView',
    controller: 'MaterialImageViewController',
    IdProduct: 0,
    layout: 'hbox',
    items: [{
        layout: 'vbox',
        border: false,
        items: [{
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'filefield',
                buttonText: '...',
                buttonOnly: true,
                hidden: true,
                itemId: 'btneditimg1',
                accept: 'image/*',
                width: 35,
                height: 32,
                margin: 1
            },{
                xtype: 'image',
                itemId: 'img1',
                id:'imgmaterial1',
                width: 35,
                height: 32,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img1}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                    },
                    el: {
                        click: 'onView',
                        dblclick: 'OpenFileDialog'
                    }
                }
            }]
        }, {
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'filefield',
                buttonText: '...',
                buttonOnly: true,
                hidden: true,
                itemId: 'btneditimg2',
                accept: 'image/*',
                width: 35,
                height: 32,
                margin: 1
            },{
                xtype: 'image',
                itemId: 'img2',
                id:'imgmaterial2',
                width: 35,
                height: 32,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img2}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                    },
                    el: {
                        click: 'onView',
                        dblclick: 'OpenFileDialog'
                    }
                }
            }]
        }, {
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'filefield',
                buttonText: '...',
                buttonOnly: true,
                hidden: true,
                itemId: 'btneditimg3',
                accept: 'image/*',
                width: 35,
                height: 32,
                margin: 1
            },{
                xtype: 'image',
                itemId: 'img3',
                id:'imgmaterial3',
                width: 35,
                height: 32,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img3}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                    },
                    el: {
                        click: 'onView',
                        dblclick: 'OpenFileDialog'
                    }
                }
            }]
        }, {
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'filefield',
                buttonText: '...',
                buttonOnly: true,
                hidden: true,
                itemId: 'btneditimg4',
                accept: 'image/*',
                width: 35,
                height: 32,
                margin: 1
            },{
                xtype: 'image',
                itemId: 'img4',
                id:'imgmaterial4',
                width: 35,
                height: 32,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img4}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                    },
                    el: {
                        click: 'onView',
                        dblclick: 'OpenFileDialog'
                    }
                }
            }]
        }, {
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'filefield',
                buttonText: '...',
                buttonOnly: true,
                hidden: true,
                itemId: 'btneditimg5',
                accept: 'image/*',
                width: 35,
                height: 32,
                margin: 1
            },{
                xtype: 'image',
                itemId: 'img5',
                id:'imgmaterial5',
                width: 35,
                height: 32,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img5}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                    },
                    el: {
                        click: 'onView',
                        dblclick: 'OpenFileDialog'
                    }
                }
            }]
        }]
    }, {
        xtype: 'image',
        width: 175,
        height: 168,
        margin: 1,
        itemId: 'imgView',
        bind: {
            src: 'data:image/gif;base64,' + '{img.img1}'
        },
        listeners: {
            afterrender: function (img, a, obj) {
                img.getEl().dom.style.border = '1px solid black';
            }
        }
    }]
})