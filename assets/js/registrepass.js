$(function () {


    //验证输入框以及ajax的发送
    window.layui.form.verify({
        newpassword: [/^[\S]{6,12}$/, '密码必须在6到8位数字'],
        repass: function (value) {
            var $newpassword = $('#newpassword').val();
            if ($newpassword !== value) {
                return '两次输入密码不一致';
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // console.log(1);
        var $oldpassword = $('.layui-card #oldpassword').val();
        var $newpassword = $('.layui-card #newpassword').val();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: {
                oldPwd: $oldpassword,
                newPwd: $newpassword
            },
            success: function (res) {
                window.layer.msg('修改还密码成功');
            }
        })
    })

    // $('.layui-card #repass').click(function (e) {

    // })
})