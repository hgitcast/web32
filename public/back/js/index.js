$(function () {

    $("#form").bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-heart',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 对字段进行校验
        fields: {
            username: {
                // 校验的规则
                validators: {
                    // 非空校验
                    notEmpty: {
                        // 为空时显示的提示信息
                        message: "用户名不能为空"
                    },
                    // 长度要求 2-6 位
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须是 2-6 位"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    // 长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须是6-12位"
                    },
                    // 专门用于配置回调提示信息的校验规则
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }})
    })