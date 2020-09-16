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
         //  console.log(e.target.files);
         var file = e.target.files[0]
         if (!file) {
             return
         }
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
                 //  console.log(strHtml);
                 $('#pub_cate').html(strHtml);
                 window.layui.form.render();
             }
         }
     })


     //发表文章
     var state = '已发布';

     $('#caogao').click(function (e) {
         state = '草稿';
     })

     //这里是发布按钮提交
     $('#form-pub').on('submit', function (e) {
         e.preventDefault();
         var formData = new FormData($('#form-pub')[0]);
         formData.append('state', state);
         $image
             .cropper('getCroppedCanvas', {
                 // 创建一个 Canvas 画布
                 width: 400,
                 height: 280,
             })
             .toBlob(function (blob) {
                 // 将 Canvas 画布上的内容，转化为文件对象
                 // 得到文件对象后，进行后续的操作
                 formData.append('cover_img', blob);
                 $.ajax({
                     type: 'post',
                     url: '/my/article/add',
                     data: formData,
                     contentType: false,
                     processData: false,
                     success: function (res) {
                         console.log(res);
                         if (res.status === 0) {
                             window.location.href = '../article/article-list.html'
                         }
                     }
                 })
             })
     })


     //将formData传递到文章列表中
     //  console.log(window.parent);


 })