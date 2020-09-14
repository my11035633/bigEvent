 $(function () {

     // 初始化富文本编辑器
     initEditor()
     // 1. 初始化图片裁剪器
     var $image = $('#image')

     // 2. 裁剪选项
     var options = {
         aspectRatio: 400 / 280,
         preview: '.img-preview',
     }

     // 3. 初始化裁剪区域
     $image.cropper(options)

     $('#chooseImage').click(function () {
         $('#file').click()
     })

     //动态监听文件图片的有无
     $('#file').change(function (e) {
         var file = e.target.files[0]
         if (!file) return
         var newImgURL = URL.createObjectURL(file)
         $image
             .cropper('destroy') // 销毁旧的裁剪区域
             .attr('src', newImgURL) // 重新设置图片路径
             .cropper(options) // 重新初始化裁剪区域
     })



     $.ajax({
         type: 'get',
         url: '/my/article/cates',
         success: function (res) {
             if (res.status === 0) {
                 var strHtml = template('cate', res);
                 console.log(strHtml);
                 $('#pub_cate').html(strHtml);
                 layui.form.render();
             }
         }
     })


     //发表文章
     var state = '已发布';

     //这里是发布按钮提交
     $('#form-pub').on('submit', function (e) {
         e.preventDefault();
         var $title = $('#title').val();
         var $id = $('#pub_cate').val();
         //这里获取富文本内容
         //这里获取图片的二进制
         //  $.ajax({
         //      title: $title,
         //      cate_id: $id,
         //      content: '',
         //      cover_img: '',
         //      state: state
         //  })
     })


 })