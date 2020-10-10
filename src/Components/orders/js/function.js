export function todayPassedSeconds(){
    let dayToSeconds = 24*60*60
    let hoursToSeconds = 60*60
    let minuteToSeconds = 60

    let todayPassedHours = new Date().getHours()
    let todayPassedMinutes = new Date().getMinutes()

    return (todayPassedHours*hoursToSeconds + todayPassedMinutes*minuteToSeconds)
}



export var
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
    englishNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g],
    persianNumbersUnfix = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"],
    fixNumbers = function (str) {
        if(typeof str === 'string') {
            for(var i=0; i<10; i++) {
                str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
            }
        }
        return str;
    },
    unfixNumber = function (str) {
        if(typeof str === 'string') {
            for(var i=0; i<10; i++) {
                str = str.replace(englishNumbers[i], persianNumbersUnfix[i]);
            }
        }
        return str;
    };





export function date2timestamp(date = '2000-7-26') {
    var myDate = date.split("-");
    var newDate = myDate[1]+","+myDate[2]+","+myDate[0];
    return new Date(newDate).getTime()
}





export function todayDateJalali() {
    let date = new Date(Date.now())
    let splitedDate = fixNumbers(date.toLocaleDateString('fa-IR').replace(" ", "")).split("/")
    return {day: parseInt(splitedDate[2]) ,month: parseInt(splitedDate[1]) ,year: parseInt(splitedDate[0])}
}






export var JalaliDate = {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
};
JalaliDate.jalaliToGregorian = function(j_y, j_m, j_d) {
    j_y = parseInt(j_y);
    j_m = parseInt(j_m);
    j_d = parseInt(j_d);
    var jy = j_y - 979;
    var jm = j_m - 1;
    var jd = j_d - 1;

    var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
    for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

    j_day_no += jd;

    var g_day_no = j_day_no + 79;

    var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    g_day_no = g_day_no % 146097;

    var leap = true;
    if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */
    {
        g_day_no--;
        gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
        g_day_no = g_day_no % 36524;

        if (g_day_no >= 365) g_day_no++;
        else leap = false;
    }

    gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
    g_day_no %= 1461;

    if (g_day_no >= 366) {
        leap = false;

        g_day_no--;
        gy += parseInt(g_day_no / 365);
        g_day_no = g_day_no % 365;
    }

    for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
        g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
    var gm = i + 1;
    var gd = g_day_no + 1;

    gm = gm < 10 ? "0" + gm : gm;
    gd = gd < 10 ? "0" + gd : gd;

    return [gy, gm, gd];
}


export function days_passed(order_date) {
    order_date = parseInt(order_date) * 1000
    let current = new Date();
    let order_date_object = new Date(order_date);
    let passed_days = current.getDate() -  order_date_object.getDate() ;
    let passed_month = current.getMonth() - order_date_object.getMonth();
    let passed_year = current.getFullYear() - order_date_object.getFullYear();
    let order_date_jajali =  gregorian_to_jalali(order_date_object.getFullYear(),order_date_object.getMonth()+1,order_date_object.getDate());
    let order_time = order_date_object.getHours() + ':' + order_date_object.getMinutes();
    if(passed_days < 7 && passed_month === 0 && passed_year === 0){
        if(passed_days === 0){
            return "امروز" + '\n' +  order_time;
        }
        else if(passed_days === 1) {
            if (order_date_object.getDay() === 0)
                return "(دیروز) یکشنبه" + '\n' +  order_time;
            else if (order_date_object.getDay() === 1)
                return  "(دیروز) دوشنبه" + '\n' +  order_time;
            else if (order_date_object.getDay() === 2)
                return "(دیروز) سه شنبه" + '\n' +  order_time;
            else if (order_date_object.getDay() === 3)
                return "(دیروز) چهارشنبه" + '\n' +  order_time;
            else if (order_date_object.getDay() === 4)
                return "(دیروز) پنجشنبه" + '\n' +  order_time;
            else if (order_date_object.getDay() === 5)
                return "(دیروز) جمعه" + '\n' +  order_time;
            else if (order_date_object.getDay() === 6)
                return "(دیروز) شنبه" + '\n' +  order_time;
        }
        else if(passed_days === 2){
            if (order_date_object.getDay() === 0)
                return "(پریروز) یکشنبه"+ '\n' +  order_time;
            else if (order_date_object.getDay() === 1)
                return "(پریروز) دوشنبه" + '\n' +  order_time;
            else if (order_date_object.getDay() === 2)
                return "(پریروز) سه شنبه" + '\n' +  order_time;
            else if (order_date_object.getDay() === 3)
                return "(پریروز) چهارشنبه" + '\n' +  order_time;
            else if (order_date_object.getDay() === 4)
                return "(پریروز) پنجشنبه" + '\n' +  order_time;
            else if (order_date_object.getDay() === 5)
                return "(پریروز) جمعه" + '\n' +  order_time;
            else if (order_date_object.getDay() === 6)
                return "(پریروز) شنبه" + '\n' +  order_time;
        }
    }else {
        return order_time + "\n" + order_date_jajali;
    }
}



export function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}




function gregorian_to_jalali(gy,gm,gd){
    let g_d_m,jy,jm,jd,gy2,days;
    g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
    if(gy > 1600){
        jy=979;
        gy-=1600;
    }else{
        jy=0;
        gy-=621;
    }
    gy2=(gm > 2)?(gy+1):gy;
    days=(365*gy) +(parseInt((gy2+3)/4)) -(parseInt((gy2+99)/100)) +(parseInt((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
    jy+=33*(parseInt(days/12053));
    days%=12053;
    jy+=4*(parseInt(days/1461));
    days%=1461;
    if(days > 365){
        jy+=parseInt((days-1)/365);
        days=(days-1)%365;
    }
    jm=(days < 186)?1+parseInt(days/31):7+parseInt((days-186)/30);
    jd=1+((days < 186)?(days%31):((days-186)%30));
    return [jy,jm,jd];
}