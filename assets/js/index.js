$(function () {

    fa();

    function fa() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.data) {
                    var value = res.data.username[0].toUpperCase();
                    var value2 = res.data.nickname || res.data.username;
                    if (res.data.user_pic === null) {
                        // console.log(value);
                        $('.text-avatar').text(value).show();
                        // $('#welcome').text('欢迎' + value);
                        $('#welcome2').text('欢迎' + value2);
                    } else {
                        $('.text-avatar').hide();
                        $('.layui-nav-img').attr('src', res.data.user_pic).css('display', 'block');
                    }
                }

            },
        })
    }

    window.fa = fa;




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