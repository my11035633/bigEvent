$(function () {

    //一进来就获取文章列表
    initTable()

    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res.data);
                if (res.status === 0) {
                    var strHtml = template('type', res);
                    $('tbody').html(strHtml);
                }
            }
        })
    }

    //弹出层
    var index;
    $('#addBtn').click(function () {
        var strHtml = $('#add').html();
        index = window.layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: strHtml,
        })
    })


    //新增文章类别
    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault();
        // console.log(3);
        var $name = $('#fenlei').val();
        var $alias = $('#bieming').val();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: {
                name: $name,
                alias: $alias
            },
            success: function (res) {
                // console.log(1);
                // console.log(res);
                if (res.status === 0) {
                    initTable();
                    layer.close(index);
                }
            }
        })
    })


    //编辑按钮
    //注意： 编辑按钮动态创建的，不具备动态绑定事件
    $('body').on('click', '#bianji', function (e) {
        e.preventDefault();
        var $id = $(this).attr('data-id');
        // console.log($id);
        var strHtml = $('#edit').html();
        // console.log(strHtml);
        var index = window.layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: strHtml,
        })

        //编辑弹出层获取文章信息填入
        $.ajax({
            type: 'get',
            url: `/my/article/cates/${$id}`,
            success: function (res) {
                // console.log(res);
                if (res.status === 0) {
                    $('#value1').val(res.data.name);
                    $('#value2').val(res.data.alias);
                    $('#value0').val(res.data.Id);
                }
            }
        })

        //确认修改提交到后台发送ajax
        $('body').on('submit', '#editForm', function (e) {
            e.preventDefault();
            // console.log(1);
            var $id = $('#value0').val();
            var $name = $('#value1').val();
            var $alias = $('#value2').val();
            console.log($id);

            $.ajax({
                type: 'post',
                url: '/my/article/updatecate',
                data: {
                    Id: $id,
                    name: $name,
                    alias: $alias
                },
                success: function (res) {
                    // console.log(res);
                    if (res.status === 0) {
                        initTable();
                        layer.close(index);
                    }
                }
            })
        })
    })


    //删除按钮
    $('body').on('click', '#delete1', function (e) {
        // console.log(1);
        e.preventDefault();
        var $id = $(this).attr('data-id');
        // console.log(1);
        // console.log($id);
        $.ajax({
            type: 'get',
            url: `/my/article/deletecate/${$id}`,
            success: function (res) {
                // console.log(res);
                if (res.status === 0) {
                    initTable();
                }
            }
        })
    })
})