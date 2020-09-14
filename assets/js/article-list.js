$(function () {
    var p = {
        pagenum: 1, //页码值
        pagesize: 4, //每页显示多少条数据
        cate_id: '',
        state: ''
    }

    initList()


    function initList() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                // console.log(res);
                template.defaults.imports.formatDate = function (Date) {
                    moment(Date).format('MMMM Do YYYY, h:mm:ss a');
                }
                var strHtml = template('tpl-table', res);
                console.log(res);
                var total = res.total;
                $('tbody').html(strHtml);

                //全部数据渲染完毕，接着开始渲染分页
                renderPage(total)
            }
        })
    }


    //select搜索框
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            var searchHtml = template('tpl-search', res);
            // console.log(res);
            //select搜索框
            $('#search').html(searchHtml);
            layui.form.render();
        }
    })

    //select筛选ajax发送
    $('#form-search').on('submit', function (e) {
        // console.log(1);
        e.preventDefault();
        var $id = $('#search').val();
        // console.log($id);
        var $content = $('#content').val();
        // console.log($content);
        p = {
            pagenum: 1,
            pagesize: 4,
            cate_id: $id,
            state: $content
        }
        initList()
    })



    //分页器
    function renderPage(total) {
        // console.log(total);
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号

                count: total, //数据总数，从服务端得到
                curr: p.pagenum, //当前页码
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                limits: [2, 3, 5, 10],
                limit: p.pagesize, //每页显示条数
                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
                    //首次不执行
                    if (!first) {
                        p.pagenum = obj.curr;
                        p.pagesize = obj.limit;
                        initList()
                        //do something
                    }
                }

            });
        });
    }


    //删除按钮
    $('body').on('click', '.delete', function (e) {
        e.preventDefault();
        var $id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: `/my/article/delete/${$id}`,
            success: function (res) {
                // console.log(res);
                if (res.status === 0) {
                    p.pagenum = $('.delete').length === 1 ? p.pagenum - 1 : p.pagenum;
                    initList()
                }
            }
        })
    })


})