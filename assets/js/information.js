$(function () {

    regist();

    function regist() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status === 0) {
                    var $value = res.data.username;
                    var $id = res.data.id;
                    var $nickname = res.data.nickname;
                    var $email = res.data.email;
                    // console.log($value);
                    $('.layui-card #username').val($value);
                    $('.layui-card #disnone').val($id);
                    $('.layui-card #nickname').val($nickname);
                    $('.layui-card #email').val($email);
                }
            }
        })
    }



    //验证输入框以及ajax的发送
    window.layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称在6位数之内';
            }
        }
    })

    //修改用户资料e
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        var $nickname = $('#nickname').val();
        var $email = $(' #email').val();
        var $id = $('#disnone').val();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: {
                nickname: $nickname,
                email: $email,
                id: $id
            },
            success: function (res) {
                console.log(res);
                window.layer.msg(res.message);
                window.parent.fa();
            }
        })
    })


    $('#btn').click(function (e) {
        e.preventDefault();
        regist();
    })
    // $('.layui-card #pushSubmit').click(function (e) {
    //     e.preventDefault();

    // })
})