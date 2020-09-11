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


    //验证输入框以及ajax的发送
    window.layui.form.verify({
        password: [/^[\S]{6,12}$/, '密码必须在6到8位数字'],
        repass: function (value) {
            var $pass_value = $('.regist #password').val();
            if ($pass_value !== value) {
                return '两次输入密码不一致';
            }
        }
    })
    // console.log($('.regist .layui-form'));
    $('.regist .layui-form').on('submit', function (e) {
        console.log(1);
        e.preventDefault();
        var $username = $('.regist #name2').val();
        var $password = $('.regist #password').val();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $username,
                password: $password
            },
            success: function (data) {
                console.log(data);
                if (data.status === 1) {
                    window.layer.msg(data.message);
                } else {
                    window.layer.msg(data.message);
                    $('#regist').click();
                }
            }
        })
    })
    // $('#zhuce').click(function () {

    // })
})







//登录ajax的发送
$(function () {
    $('.login button').click(function (e) {
        e.preventDefault();
        var $name = $('#name').val();
        var $pwd = $('#pwd').val();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: {
                username: $name,
                password: $pwd
            },
            async: false, //必须是同步提交的,解决layui表单内置验证不通过，也会发送ajax，导致有两次弹框问题，变为同步，而且内置layui验证优先级更高
            success: function (data) {
                if (data.status === 0) {
                    window.localStorage.setItem('token', data.token);
                    window.location.href = '../index.html';
                } else {
                    window.layer.msg(data.message);
                }

            }
        })
    })
})