
var imgData = {
    home : ['1.jpg','2.jpg','3.jpg','3_1.png','3_2.png','3_logo.png','4.jpg','4_1.png','4_2.png','5.jpg','5_2.png','5_4.png','5_pointer.png','i1.png','i2.png','i3.png','i4.png','logo.png','logo-quan.png','logo-shadow.png','pointer.png'],
    case : {
        public : ['1bn1.jpg','1bn2.jpg','1bn3.jpg','b1.jpg','b2.jpg','b3.jpg','banner_i1.png','banner_i2.png','banner_i3.png','banner_sub.png','banner-bg.png','banner-pointer.png','bb1.png','bb2_1.png','bb2_2.png','bb2_3.png','bb2_4.jpg','bb3.png','btn_bg.png','case-bg.png','foot_pointer.png','foot_sub.png','left_btn.png','logo_bg.png','right_btn.png','shadow.png'],
        caseList : [],
        cooperate : ['logo1.png','logo2.png','logo3.png','logo4.png','logo5.png'],
        msg : ['img1.png','img2.png','img3.png']
    },
    about : {
        public : ['btn_kuang.png','close_icon.png','lang1.png','lang2.png','lang3.png','lang4.png','p_join.png','p_logo.png','p8_1.jpg','p8_2.png','people1.png','people2.png','return.png','search_icon.png'],
        ability : ['l1.png','l2.png','l3.png','l4.png','l5.png','l6.png','l7.png','l8.png','l9.png','l10.png','i9.png','i10.png','i11.png','i12.png','i13.png','i14.png'],
        btmCarrousel : ['pcs.png','pcs2.png','pcs3.png'],
        service : ['1.png','1_bg.png','2_2.png','3_1.png','4_1.png','4_2.png','4_3.png','4_bg.png','5_1.png','5_2.png','6_1.png','7_1.png','i1.png'],
        team : ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg']
    },
    contact : ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','1.png','2.png','3.png','4.png','5.png','6.png','bg2.jpg','bg3.jpg','chuan_logo.png','chuan1.png','chuan2.png','chuan3.png','chuan4.png','close.png','header_pointer.png','kuang.png','kuang2.png','lang1.png','lang2.png','lang3.png','lines.png','logo.png','lu.png','phone.png','phone2.png','pointer.png','qq-weibo.png','sea_bg.png','sea_bg2.png','shadow.png','shan1.png','shan2.png','shan3.png','shan4.png','weibo.png','zbj.png']
};

(function(){
    for(var i=1;i<32;i++){
        imgData.case.caseList.push('img ('+ i +').png');
    }
})();
