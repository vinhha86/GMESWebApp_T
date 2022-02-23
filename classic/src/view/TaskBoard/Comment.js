Ext.define('GSmartApp.view.TaskBoard.Comment', {
    extend       : 'Ext.DataView',
    xtype        : 'Comment',
    itemSelector : 'div.comment-wrap',
    itemId       : 'Comment',
    cls          : 'commentview',
    userStore: null,
    itemTpl : '<tpl for=".">' +
    // '<div class="comment-wrap">' +
    // '<div class="comment-header"><h4>{userName}</h4><span class="date">{[Ext.util.Format.date(values.Date, "d/m/y G:i")]}</span><span style = "float:right">{typename}</span></div>' +
    // '<div class="comment-body"><img src="{userImgUrl}"/><div>{Text}</div></div>' +
    // '</div>' +

    '<div class="text-wrapper">' +
    '<div class="news-icon"><img src="resources/icons/forum-icon-small.png"></div>' +
    '<div class="news-data">' +
        // '<div class="news-picture"><img src="{userImgUrl}"></div>' +
        '<div class="news-picture"><img src="resources/icons/photo-2.png"></div>' +
        '<div class="news-content">' +
            '<div class="news-title">{typename}</div>' +
            '<div class="news-small">bởi <span class="news-author">{userName}</span>' +
            '<img src="resources/icons/clock-icon.png"/>{[Ext.util.Format.date(values.Date, "d/m/y G:i")]}</div>' +
            '<div class="news-paragraph news-paragraph-simple">{Text}</div>' +
            // '<div class="news-toggle expand"><span>EXPAND</span>' +
            // '<img src="resources/icons/expand-news.png"></div>' +
        '</div>' +
    '</div>' +
    '<div>' +
    '</tpl>',

    collectData : function (comments) {
        var me = this;
        var collected = this.callParent(arguments),
            result    = [];
        
        for (var i = 0; i < collected.length; i++) {
            var renderData = Ext.apply({}, collected[ i ]);
            var comment    = comments[ i ];
            var user       = me.userStore.getById(comment.get('UserId'));
            var userImgUrl = user.getImageUrl();

            renderData.userName         = user.getName();
            renderData.userImgUrl = userImgUrl || Ext.BLANK_IMAGE_URL;

            result.push(renderData);
        }

        return result;
    }
});
