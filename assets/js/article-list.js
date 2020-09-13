$(function () {


    $.ajax({
        type: 'get',
        url: '/my/article/list',
        data: {
            pagenum: 1,
            pagesize: 2,
            cate_id: '',
            state: ''
        },
        success: function (res) {
            console.log(res);
            template.defaults.imports.formatDate = function (Date) {
                moment(Date).format('MMMM Do YYYY, h:mm:ss a');
            }
            var strHtml = template('tpl-table', res);
            $('tbody').htm(strHtml);
        }
    })
})