Ext.define('GSmartApp.model.TaskBoard.TaskBoard_Model', {
    extend : 'Kanban.model.Task',

    requires : [
        'GSmartApp.model.TaskBoard.SubTask_model',
        'GSmartApp.model.TaskBoard.Comment_model'
    ],

    fields : [
        { name : 'Duration', type : 'int' },
        {
            name    : 'PercentDone',
            type    : 'int'
        },
        'tasktypeid_link'
    ],

    associations : [
        {
            model          : 'GSmartApp.model.TaskBoard.Comment_model',
            associationKey : 'Comments',
            name           : 'comments',
            type           : 'hasMany'
        },
        {
            model          : 'GSmartApp.model.TaskBoard.SubTask_model',
            associationKey : 'SubTasks',
            name           : 'subTasks',
            type           : 'hasMany'
        }
    ],

    // Don't allow setting as Done if some subtask is not completed
    isValidTransition : function(state) {
        // if (state === 'Done') {
        //     var subtasks = this.subTasks();

        //     return this.callParent(arguments) && subtasks.query('Done', false).length === 0;
        // }

        // return this.callParent(arguments);
        return true;
    }
});