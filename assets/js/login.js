//登录与注册的切换
$(function () {
    $('#login').click(function () {
        $('.login').hide();
        $('.regist').css('display', 'block');
    })

    $('#regist').click(function () {
        $('.regist').hide();
        $('.login').show();
    })
})


//验证输入框以及ajax的发送
window.layui.form.verify({
    password: [/^[\S]{6,12}$/, '密码必须在6到8位数字'],
    repass: function (value, item) {
        var $pass_value = $('.regist #password').val();
        if ($pass_value !== value) {
            return '两次输入密码不一致';
        }
    }
})


//发送ajax请求

//注册请求
$(function () {
    $('#zhuce').click(function () {
        // console.log(1);
        var $username = $('.regist #name2').val();
        // console.log($username);
        var $password = $('.regist #password').val();
        // console.log($password);
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $username,
                password: $password
            },
            success: function (data) {
                if (data.status === 1) {
                    layer.open({
                        title: '',
                        content: data.message
                    });
                } else {
                    layer.open({
                        title: '',
                        content: data.message
                    });
                }
                // console.log(data);
            }
        })
    })

})