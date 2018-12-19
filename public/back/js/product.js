$(function () {
    var nowPage = 1
    render()
    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: nowPage,
                pageSize: 3
            },
            success: function (res) {
                // console.log(res)

                //1 渲染页面
                var htmlStr = template('tpl', res)
                $('tbody').html(htmlStr)

                //2 最讨厌的渲染分页器
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: res.page,//当前页
                    totalPages: Math.ceil(res.total / res.size),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        nowPage = page
                        render()
                    }
                });
            }



        })

    }

    $('.btn-addPro').on('click', function () {
        // alert(1)
        $('#myModal02').modal('show')

        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res)
                var htmlStr = template('tplll', res)
                $('.dropdown-menu').html(htmlStr)
            }
        })
    })
    // 下拉
    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text()
        $('.btn.btn-default.dropdown-toggle span:first-of-type').text(txt)
        var id = $(this).data('id')
        // console.log(id)
        $('#brandId').val(id)

        $('#proForm').data('bootstrapValidator').updateStatus('brandId', 'VALID')

    })
    // 多文件上传
    var picArr = []
    $("#love").fileupload({
        dataType: "json", //这是设置返回的类型  不写json写什么！！！！！

        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // 在这里面  图片已经上传完成了！！！这里面是返回回来的东东！！！！
            // console.log(data.result.picAddr);
            var imgSrc = data.result.picAddr;
            var $img = $("<img src='" + imgSrc + "' style='width: 100px' ></img>")
            // console.log($img)
            $('#imgBox').prepend($img)
            picArr.unshift(data.result)
            // console.log(picAddr)
            // 获得了imgarr
            if (picArr.length > 3) {
                picArr.pop()       //删除数组中最后一个对象
                $('#imgBox img:last-of-type').remove()     //限制只能是三张 多出来的  删除最后一张dom
                
            }
            if(picArr.length === 3){
                $('#proForm').data('bootstrapValidator').updateStatus('picStatus', 'VALID')
            }
        }
    });

    //校验一下
    $('#proForm').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '一级分类不能为空'
                    },

                }
            },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品名称不能为空'
                    },

                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '描述信息不能为空'
                    },

                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '库存数量不能为空'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '格式为xx-xx'
                    }
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '尺码不能为空'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '格式为xx-xx'
                    }
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '原件不能为空'
                    },

                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '现价不能为空'
                    },

                }
            },
            picStatus: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传3张图片'
                    },

                }
            },
        }
    })

    $('#proForm').on('success.form.bv',function( e ){
        e.preventDefault()
        var str = $('#proForm').serialize()
        str = str + '&picArr=' +JSON.stringify(picArr)
        console.log(str)
        $.ajax({
            type : 'post',
            url : '/product/addProduct',
            data : str,
            dataType : 'json',
            success : function ( res ) {
                // console.log(res)
                if(res.success){
                    $('#myModal02').modal('hide')
                    nowPage = 1
                    render()
                    $('#proForm').data('bootstrapValidator').resetForm(true)
                    $('.btn.btn-default.dropdown-toggle span:first-of-type').text('请输入二级分类')
                    $('#imgBox img').remove()
                    picArr = []
                }
            }
        })
        
    })



})