var win_width = 0,
    win_height = 0,
    text_mid_x = 0,
    text_mid_y = 0,
    offsetX = 0,
    offsetY = 0,
    text_transparency = 0,
    text = document.getElementById("text"),
    context = text.getContext("2d");

var font_size = 27,
    day_now = (new Date()).getTime()/1000/3600/24,
    start_day = new Date("2018/1/6 00:00:00").getTime()/1000/3600/24,
    day_together = String(Math.floor(day_now - start_day));

var message = "Been together with U for " + day_together + " days";

var backing_store_ratio = context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1,
    device_pixel_ratio = window.devicePixelRatio || 1;

var ratio = device_pixel_ratio / backing_store_ratio;


function get_page_size() {
    // get size of pag
    if (window.innerWidth) {
        win_width = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) {
        win_width = document.body.clientWidth;
    }
    if (window.innerHeight) {
        win_height = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
        win_height = document.body.clientHeight;
    }
    if (document.documentElement && document.documentElement.clientHeight &&
        document.documentElement.clientWidth) {
        win_height = document.documentElement.clientHeight;
        win_width = document.documentElement.clientWidth;
    }
}


function set_text_size() {
    text.style.height = Math.round(win_height) + "px";
    text.style.width = Math.round(win_width) + "px";
    text.height = Math.round(win_height) * ratio;
    text.width = Math.round(win_width) * ratio;
    context.translate(0.5, 0.5);
}


function adjust_size() {
    get_page_size();
    set_text_size();
    offsetX = $("#loveHeart").width() / 2;
    offsetY = $("#loveHeart").height() / 2.5;
    text_mid_x = text.width / 2;
    text_mid_y = text.height / 2 - font_size;
}


function plot_time_with_animation() {
    context.fillStyle = "rgba(134, 61, 193, " + text_transparency + ")";
    context.fillText(message, text_mid_x, text_mid_y);
    text_transparency += 0.02;
    if (text_transparency < 1) {
        setTimeout("plot_time_with_animation()", 100);
    }
}


function start() {
    adjust_size();
    context.font = font_size + "px Arial";
    context.textAlign = "center";
    setTimeout("plot_time_with_animation()", 20);
    setTimeout(function() {
        startHeartAnimation();
    }, 0);
}

start();
