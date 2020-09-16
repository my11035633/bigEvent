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
                        $('.layui-nav-img').hide();
                        // $('#welcome').text('欢迎' + value);
                        $('#welcome2').text('欢迎' + value2);
                    } else {
                        $('.text-avatar').hide();
                        $('#welcome2').text('欢迎' + value2);
                        $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    }
                }

            },
        })
    }

    window.fa = fa;
    console.log(window);
    console.log(document.getElementById('fm').formData);





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