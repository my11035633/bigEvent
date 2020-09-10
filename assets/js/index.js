$(function () {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        headers: {
            Authorization: window.localStorage.getItem('token')
        },
        success: function (res) {
            console.log(res);
            var value = res.data.username[0].toUpperCase();
            if (res.data.user_pic === null) {
                // console.log(value);
                $('.text-avatar').text(value).show();
                $('#welcome').text('欢迎' + res.data.username);
                $('#welcome2').text('欢迎' + res.data.username);
            } else {
                $('.text-avatar').hide();
                $('.layui-nav-img').attr('src', res.data.user_pic).css('display', 'block');
            }
        }
    })



    $('#logoout').click(function () {
        layer.confirm('确认退出嘛?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            window.localStorage.removeItem('token');
            window.location.href = '../login.html';
            layer.close(index);
        });
    })
})