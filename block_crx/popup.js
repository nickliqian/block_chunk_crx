$(function () {

    console.log("version 4");

    jQuery.fn.wait = function (func, times, interval) {
        var _times = times || -1, //100次
            _interval = interval || 20, //20毫秒每次
            _self = this,
            _selector = this.selector, //选择器
            _iIntervalID; //定时器id
        if (this.length) { //如果已经获取到了，就直接执行函数
            func && func.call(this);
        } else {
            _iIntervalID = setInterval(function () {
                if (!_times) { //是0就退出
                    clearInterval(_iIntervalID);
                }
                _times <= 0 || _times--; //如果是正数就 --

                _self = $(_selector); //再次选择
                if (_self.length) { //判断是否取到
                    func && func.call(_self);
                    clearInterval(_iIntervalID);
                }
            }, _interval);
        }
        return this;
    };

    function block_chunk() {
        var obj = $(".chunwan-wrapper");
        obj.remove();
    }

    function load_and_block() {
        $(".chunwan-wrapper").wait(function () { //等待元素的加载
            block_chunk();
        });
    }

    function monitor() {
        var search_button = $("#su");
        search_button.click(function () {
            load_and_block();
        });

        var search_input = $("#kw");
        search_input.keypress(function () {
            load_and_block();
        })

    }

    block_chunk();
    monitor();

});

