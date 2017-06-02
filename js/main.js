var toolsFn = (function () {  //工具

    function byId(sele) {
        return document.getElementById(sele);
    }

    function cssTransform(el, attr, val) {
        if (!el.transform) {
            el.transform = {};
        }
        if (arguments.length > 2) {
            el.transform[attr] = val;
            var sVal = '';
            for (var s in el.transform) {
                switch (s) {
                    case 'rotate':
                    case 'rotateX':
                    case 'rotateY':
                    case 'skew':
                    case 'skewX':
                    case 'skewY':
                        sVal += s + '(' + el.transform[s] + 'deg) ';
                        break;
                    case 'translate':
                    case 'translateX':
                    case 'translateY':
                        sVal += s + '(' + el.transform[s] + 'px) ';
                        break;
                    default:
                        sVal += s + '(' + el.transform[s] + ') ';
                        break;
                }
            }
            el.style.transform = el.style.WebkitTransform = sVal;
        } else {
            val = el.transform[attr];
            if (typeof val == 'undefined') {
                switch (attr) {
                    case 'scale':
                    case 'scaleX':
                    case 'scaleY':
                        val = 1;
                        break;
                    default:
                        val = 0;
                        break;
                }
            }
            return val;
        }
    }

    function getByClass(oParent, cls) {
        var ele = oParent.getElementsByTagName('*');
        var arr = [];
        var re = new RegExp('\\b' + cls + '\\b', 'i');
        for (var i = 0; i < ele.length; i++) {
            if (re.test(ele[i].className)) {
                arr.push(ele[i]);
            }
        }
        return arr;
    }

    function hasClass(ele, cls) {
        var re = new RegExp('\\b' + cls + '\\b', 'i');
        if (re.test(ele.className)) {
            return true;
        } else {
            return false;
        }
    }

    function addClass(ele, cls) {
        if (!ele.className) {
            ele.className = 'sClass';
        } else {
            if (!hasClass(ele, cls)) {
                ele.className += ' ' + cls;
            }
        }
    }

    function removeClass(ele, cls) {
        var re = new RegExp('\\b' + cls + '\\b');
        if (hasClass(ele, cls)) {
            ele.className = ele.className.replace(re, '').replace(/\s{2}/, ' ').trim();
        }
    }

    function startMove(obj, json, endFn) { //运动
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var bBtn = true;
            var iCur = 0;
            for (var attr in json) {
                if (attr == 'opacity') {
                    iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                } else {
                    iCur = parseInt(getStyle(obj, attr));
                }
                var iSpeed = (json[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (iCur != json[attr]) {
                    bBtn = false;
                }
                if (attr == 'opacity') {
                    obj.style.opacity = (iCur + iSpeed) / 100;
                    obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) * 100 + ')';
                } else {
                    obj.style[attr] = (iCur + iSpeed) + 'px';
                }
            }
            if (bBtn) {
                clearInterval(obj.timer);
                endFn && endFn.call(obj);
            }
        }, 30);
    }

    function getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
    }

    return {
        byId: byId,
        startMove: startMove,
        getByClass: getByClass,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        cssTransform: cssTransform
    }
})();

window.onload = function () {
    var aPage = toolsFn.getByClass(document, 'page');
    var oLoading = toolsFn.byId('loading');
    var oHeader = toolsFn.byId('header');
    var oHeadLogoImg = toolsFn.byId('headLogoImg');
    var oNav = toolsFn.byId('nav');
    var aLi = oNav.getElementsByTagName('li');
    var oContactUs = toolsFn.byId('contactUs');
    var oContactUsInfo = toolsFn.byId('contactUsInfo');
    var oDesignCon = toolsFn.byId('designCon');
    var oDesignBgImg = toolsFn.byId('designBgImg');
    var aDesignSect = oDesignBgImg.getElementsByTagName('div');
    var oImgMoveB1 = toolsFn.byId('imgMoveB1');
    var oImgMoveB2 = toolsFn.byId('imgMoveB2');
    var oImgMoveB3 = toolsFn.byId('imgMoveB3');
    var oAboutList = toolsFn.byId('aboutList');
    var aAboutListLi = oAboutList.getElementsByTagName('li');
    var oHomeList = toolsFn.byId('homeList');
    var aHomeListLi = oHomeList.children;
    var oHomeListTab = toolsFn.byId('homeListTab');
    var aHomeListBtn = oHomeListTab.children;
    var oLogoImg = toolsFn.byId('logoImg');
    var oLogoCircle = toolsFn.byId('logoCircle');
    var oAboutTitle = toolsFn.byId('aboutTitle');
    var aImgWrap = toolsFn.getByClass(oAboutList, 'imgWrap');
    var aImgLabel = toolsFn.getByClass(aImgWrap[0], 'imgLabel');
    var oLogoShadow = toolsFn.getByClass(oHomeList, 'logoShadow')[0];
    var oSectionMenu = toolsFn.getByClass(oDesignCon, 'section_menu');
    var aDisiView = toolsFn.getByClass(oDesignCon, 'disiView');
    var aDesignDisc = toolsFn.getByClass(oDesignCon, 'designDisc');
    var aDetailDisc = toolsFn.getByClass(oAboutList, 'detailDisc');

    var oCaseBanner = toolsFn.byId('caseBanner');
    var oCaseWrap = toolsFn.byId('caseWrap');
    var oBannerTitleTab = toolsFn.byId('bannerTitleTab');
    var oBannerTitleList = toolsFn.getByClass(oBannerTitleTab, 'bannerTitleList')[0];
    var aBannerTitleLi = oBannerTitleList.children;
    var oBannerNums = toolsFn.byId('bannerNums');
    var aNumChange = toolsFn.getByClass(oBannerNums, 'numChange');
    var oBannerImgTab = toolsFn.byId('bannerImgTab');
    var oBannerImgTabList = toolsFn.getByClass(oBannerImgTab, 'bannerImgTabList')[0];
    var aBannerImgTabLi = oBannerImgTabList.children;
    var oBannerImgPrev = toolsFn.byId('bannerImgPrev');
    var oBannerImgNext = toolsFn.byId('bannerImgNext');
    var oCaseConNavList = toolsFn.byId('caseConNavList');
    var aCaseConNavLi = oCaseConNavList.getElementsByTagName('li');
    var oCaseConImgs = toolsFn.byId('caseConImgs');
    var aCaseCImg = null;
    var oCooperate = null;
    var aLogos = null;
    var oFootLogo = null;
    var aFootInfo = null;
    var oAboutWrap = toolsFn.byId('aboutWrap');
    var oAboutTeamTitle = toolsFn.byId('aboutTeamTitle');
    var aAboutTeamTitleP = oAboutTeamTitle.getElementsByTagName('p');
    var oBannerLang4 = toolsFn.byId('bannerLang4');
    var oAboutTeamWrap = toolsFn.byId('aboutTeamWrap');
    var oAboutTeamDetail = toolsFn.byId('aboutTeamDetail');
    var aAboutTeamPic = toolsFn.getByClass(oAboutTeamDetail, 'aboutTeamPic');
    var oBannerTeamPicBtn = toolsFn.byId('bannerTeamPicBtn');
    var oAboutServiceCon = toolsFn.byId('aboutServiceContent');
    var oAboutHead = toolsFn.getByClass(oAboutServiceCon, 'head')[0];
    var aAboutHeadPoint = toolsFn.getByClass(oAboutServiceCon, 'headPoint');
    var oAboutHeadSearch = toolsFn.getByClass(oAboutServiceCon, 'search')[0];
    var oAboutHeadWeb = toolsFn.getByClass(oAboutServiceCon, 'web')[0];
    var oAboutHeadUser = toolsFn.getByClass(oAboutServiceCon, 'user')[0];
    var oAboutHeadAdd = toolsFn.getByClass(oAboutServiceCon, 'add')[0];
    var oImgConList = toolsFn.byId('imgConList');
    var aImgConWrap = toolsFn.getByClass(oImgConList, 'imgWrap');
    var oAbilityContent = toolsFn.byId('abilityContent');
    var aAbilityList = toolsFn.getByClass(oAbilityContent, 'abilityList');
    var aAbilityList1Li = aAbilityList[0].getElementsByTagName('li');
    var aChildImg = toolsFn.getByClass(aAbilityList[0], 'childImg');
    var aChildTitle = toolsFn.getByClass(aAbilityList[0], 'childTitle');
    var aChildInfo = toolsFn.getByClass(aAbilityList[0], 'childInfo');
    var aAbilityList2Img = toolsFn.getByClass(aAbilityList[1], 'imgWrap');
    var oAboutAbilityBtn = toolsFn.byId('aboutAbilityBtn');
    var aAboutAbilityBtn = oAboutAbilityBtn.getElementsByTagName('a');
    var oAboutAbilitySwitchBtn = toolsFn.byId('aboutAbilitySwitchBtn');
    var oAboutBtmCarouselList = toolsFn.byId('aboutBtmCarouselList');
    var aAboutBtmCarouselLi = oAboutBtmCarouselList.getElementsByTagName('li');
    var aAboutBtmCarouselBtns = toolsFn.byId('aboutBtmCarouselBtn').getElementsByTagName('a');
    var oContactPage = toolsFn.getByClass(document, 'contactPage')[0];
    var oContactPageA = document.getElementById('contactPageA');
    var oContactPageACon = toolsFn.getByClass(oContactPageA, 'contactPageACon')[0];
    var oContactPageB = document.getElementById('contactPageB');
    var oContactPageBCon = toolsFn.getByClass(oContactPageB, 'contactPageBCon')[0];
    var oContactPageC = document.getElementById('contactPageC');
    var oContactPageCCon = toolsFn.getByClass(oContactPageC, 'contactPageCCon')[0];
    var aContactShan = toolsFn.getByClass(oContactPageA, 'shan');
    var oContactTitle = toolsFn.getByClass(oContactPageA, 'title')[0];
    var oContactSubTitle = toolsFn.getByClass(oContactPageA, 'subTitle')[0];
    var oContactInfo = toolsFn.getByClass(oContactPageA, 'info')[0];
    var oContactBtns = toolsFn.getByClass(oContactPageA, 'btns')[0];
    var oContactTab = document.getElementById('contactTab');
    var aContactBtns = oContactTab.getElementsByTagName('a');
    var oContactTitles = toolsFn.getByClass(document, 'titles')[0];
    var oContactLogoPics = toolsFn.getByClass(document, 'contactLogoPics')[0];
    var aContactLogoPic = toolsFn.getByClass(oContactLogoPics, 'pic');
    var oContactPhone = toolsFn.getByClass(oContactPageBCon, 'phone')[0];
    var oContactLogoLastPic = document.getElementById('contactLogoLastPic');
    var oContactSupport = toolsFn.getByClass(document, 'support')[0];
    var oContactSupportCls = toolsFn.getByClass(oContactSupport, 'close')[0];
    var oMallBusiWrap = toolsFn.byId('businessWrap');
    var aMallBusiTitles = toolsFn.getByClass(oMallBusiWrap, 'titles');

    var viewWidth = document.documentElement.clientWidth;
    var viewHeight = document.documentElement.clientHeight;

    var mousewheel = 'mousewheel';
    var isFirefox = /Firefox/.test(window.navigator.userAgent);
    var detail = null;
    var isDown = null;

    if (isFirefox) {
        mousewheel = 'DOMMouseScroll';
    }
    function wheelDown(ev) { //鼠标向下滚动兼容
        detail = ev.wheelDelta;
        isDown = detail < 0 ? true : false;
        if (isFirefox) {
            detail = ev.detail;
            isDown = detail > 0 ? true : false;
        }
    }

    function init() {    //初始化
        loadingPage.loading('./imgs/home/', imgData.home, homeListChange.logoIn);
        navList.init();
        homeListChange.init();
        designTab.init();
        caseBanner.init();
        caseContent.init();
        aboutBanner.init();
        aboutContent.init();
        aboutBtmCarousel.init();
        contactPage.init();
        mallContent.init();
    }

    var loadingPage = (function () {  //页面加载

        function loading(url, data, fn) {
            url = url || '';
            for (var i = 0; i < data.length; i++) {
                var img = new Image();
                img.src = url + data[i];
                oLoading.style.WebkitTransform = oLoading.style.transform = 'translateY(0px)';
                toolsFn.addClass(oLoading, 'pageShow');
                img.onload = function () {
                    toolsFn.cssTransform(oLoading, 'translateY', -viewHeight);
                    oLoading.addEventListener('transitionend', transitionEnd);
                    oLoading.addEventListener('webkitTransitionEnd', transitionEnd);
                    function transitionEnd() {
                        toolsFn.removeClass(oLoading, 'pageShow');
                        fn();
                    }
                }
            }
        }

        return {
            loading: loading
        }
    })();


    var navList = (function () {  //导航效果
        var navMask = aLi[0];
        var timer2 = null;
        var hash = null;
        var firstHash = window.location.hash.substring(1) || 'index';

        function init() {

            if (firstHash == 'index') {
                oHeader.className = 'header1';
                oHeadLogoImg.src = './imgs/logo.png';
            } else {
                oHeader.className = 'header2';
                oHeader.style.WebkitTransition = oHeader.style.transition = '0s';
                toolsFn.cssTransform(oHeader, 'translateY', 0);
                oHeadLogoImg.src = './imgs/logo2.png';
            }
            if (firstHash == 'case' || firstHash == 'about') {
                window.addEventListener(mousewheel, function (ev) {
                    setTimeout(function () {
                        wheelDown(ev);
                    }, 120);
                    oHeader.style.WebkitTransition = oHeader.style.transition = '.5s';
                    if (isDown) {
                        toolsFn.cssTransform(oHeader, 'translateY', -70);
                    } else if (!isDown) {
                        toolsFn.cssTransform(oHeader, 'translateY', 0);
                    }
                }, false);
            }

            navMaskMove();
            bind();
            pageChange();
        }

        function bind() {
            window.onhashchange = function () {
                window.location.reload();
            };

            for (var i = 1; i < aLi.length; i++) {  //nav
                aLi[i].onmouseover = function () {
                    navMask.style.left = this.offsetLeft + 'px';
                    navMask.style.width = this.offsetWidth + 'px';
                };
                aLi[i].onmouseout = function () {
                    navMaskMove();
                };

                aLi[i].onclick = function () {
                    hash = this.dataset.hash;
                    window.location.hash = hash;

                    for (var i = 0; i < aPage.length; i++) {
                        toolsFn.removeClass(aPage[i], 'pageShow');
                    }

                    navMaskMove();
                    pageChange();
                };
            }


            oContactUs.onmouseover = function () { //weChat
                clearTimeout(timer2);
                oContactUsInfo.style.display = 'block';
                toolsFn.startMove(oContactUsInfo, {'opacity': 100, 'top': 50});
            };
            oContactUs.onmouseout = function () {
                timer2 = setTimeout(function () {
                    toolsFn.startMove(oContactUsInfo, {'opacity': 0, 'top': 10}, function () {
                        this.style.display = 'none';
                    });
                }, 130);
            };
            oContactUsInfo.onmouseover = function () {
                clearTimeout(timer2);
            };
            oContactUsInfo.onmouseout = function () {
                timer2 = setTimeout(function () {
                    toolsFn.startMove(oContactUsInfo, {'opacity': 0, 'top': 10}, function () {
                        this.style.display = 'none';
                    });
                }, 130);
            }
        }

        function navMaskMove() {
            for (var i = 1; i < aLi.length; i++) {
                if (firstHash == aLi[i].dataset.hash) {
                    aLi[i].className = 'active';
                    navMask.style.left = aLi[i].offsetLeft + 'px';
                    navMask.style.width = aLi[i].offsetWidth + 'px';
                } else {
                    aLi[i].className = '';
                }
            }
        }

        function pageChange() {

            for (var i = 0; i < aPage.length; i++) {
                toolsFn.removeClass(aPage[i], 'pageShow');
                if (firstHash == aPage[i].dataset.hash) {
                    homeListChange.styleReset();
                    loadingPage.loading('./imgs/home/', imgData.home, homeListChange.logoIn);
                    toolsFn.addClass(aPage[i], 'pageShow');
                } else if (firstHash == aPage[i].dataset.hash) {
                    var aCase = [];
                    for (var s in imgData.case) {
                        for (var i = 0; i < imgData.case[s].length; i++) {
                            switch (s) {
                                case 'public' :
                                    aCase.push('./imgs/case/' + imgData.case[s][i]);
                                    break;
                                case 'caseList' :
                                    aCase.push('./imgs/case/caseList/' + imgData.case[s][i]);
                                    break;
                                case 'cooperate' :
                                    aCase.push('./imgs/case/cooperate/' + imgData.case[s][i]);
                                    break;
                                case 'msg' :
                                    aCase.push('./imgs/case/msg/' + imgData.case[s][i]);
                                    break;
                            }
                        }
                    }
                    loadingPage.loading('', aCase, caseBanner.init);
                    toolsFn.addClass(aPage[i], 'pageShow');

                } else if (firstHash == aPage[i].dataset.hash) {
                    var aAbout = [];
                    for (var s in imgData.about) {
                        for (var i = 0; i < imgData.about[s].length; i++) {
                            switch (s) {
                                case 'public' :
                                    aAbout.push('./imgs/about/' + imgData.about[s][i]);
                                    break;
                                case 'ability' :
                                    aAbout.push('./imgs/about/ability/' + imgData.about[s][i]);
                                    break;
                                case 'btmCarrousel' :
                                    aAbout.push('./imgs/about/btmCarrousel/' + imgData.about[s][i]);
                                    break;
                                case 'service' :
                                    aAbout.push('./imgs/about/service/' + imgData.about[s][i]);
                                    break;
                                case 'team' :
                                    aAbout.push('./imgs/about/team/' + imgData.about[s][i]);
                                    break;
                            }
                        }
                    }
                    loadingPage.loading('', aAbout, aboutBanner.init);
                    toolsFn.addClass(aPage[i], 'pageShow');
                    aboutContent.init();

                } else if (firstHash == aPage[i].dataset.hash) {
                    loadingPage.loading('./imgs/contact/', imgData.contact, contactPage.init);
                    toolsFn.addClass(aPage[i], 'pageShow');
                }
            }
        }

        return {
            init: init
        }
    })();


    var homeListChange = (function () {   //homeList 切换
        var now = 0;
        var num = 0;

        function init() {
            logoIn();
            bind();
        }

        function bind() {
            for (var i = 0; i < aHomeListLi.length; i++) {
                aHomeListLi[i].index = i;
            }

            for (var i = 0; i < aHomeListBtn.length; i++) {
                aHomeListBtn[i].index = i;
                aHomeListBtn[i].onclick = function () {
                    now = this.index;
                    changePage();
                }
            }

            oHomeList.addEventListener(mousewheel, function (ev) {
                num++;
                wheelDown(ev);

                if (isDown && num > 3) {
                    num = 0;
                    now++;
                    if (now > aHomeListBtn.length - 1) {
                        now = aHomeListBtn.length - 1;
                        return;
                    }
                    changePage();
                } else if (!isDown && num > 3) {
                    num = 0;
                    now--;
                    if (now < 0) {
                        now = 0;
                        return;
                    }
                    changePage();
                }
            }, false);
        }

        function styleReset() {
            for (var i = 0; i < aHomeListBtn.length; i++) {
                aHomeListBtn[i].className = '';
                oLogoCircle.style.marginTop = '-900px';
                oLogoCircle.style.opacity = '0';
                oLogoShadow.style.opacity = '0';
                oLogoImg.style.opacity = '0';
            }
            aHomeListBtn[now].className = 'active';


            for (var i = 0; i < aDesignSect.length; i++) {
                aDesignSect[i].style.display = 'none';
                aDesignSect[i].style.opacity = 0;
                aDesignDisc[i].style.display = 'none';
                aDesignDisc[i].style.top = '270px';
                aDesignDisc[i].style.opacity = 0;
                toolsFn.removeClass(aDisiView[i], 'active');
            }
            aDesignSect[0].style.display = 'block';
            aDesignSect[0].style.opacity = 1;

        }

        function changePage() {
            window.onresize = function () {
                changeWindowHeight();
            };
            function changeWindowHeight() {
                //viewHeight = document.documentElement.clientHeight;
                oHomeList.style.height = 'viewHeight' + 'px';
                //toolsFn.startMove(oHomeList,{ top : -(now * viewHeight) });
                oHomeList.style.WebkitTransform = oHomeList.style.transform = 'translateY(' + -(now * viewHeight) + 'px)';
            }

            styleReset();

            //toolsFn.startMove(oHomeList,{ top : -(now * viewHeight) });
            oHomeList.style.WebkitTransform = oHomeList.style.transform = 'translateY(' + -(now * viewHeight) + 'px)';

            if (now != 1) {
                for (var i = 0; i < oSectionMenu.length; i++) {
                    oSectionMenu[i].style.marginTop = '-50px';
                    oSectionMenu[i].style.opacity = 0;
                }
            } else if (now != 2) {
                aboutList.init();
            }

            switch (now) {
                case 0 :
                    logoIn();
                    break;
                case 1 :
                    designTab.designIn();
                    break;
                case 2 :
                    aboutList.aboutListIn();
                    break;
            }
        }

        function logoIn() {  //logo动画进入
            toolsFn.startMove(oLogoCircle, {'marginTop': -256, 'opacity': 100}, function () {
                toolsFn.startMove(oLogoImg, {'opacity': 100});
                toolsFn.startMove(oLogoShadow, {'opacity': 100}, function () {
                    toolsFn.cssTransform(oHeader, 'translateY', 0);
                });
            });
        }

        return {
            init: init,
            styleReset: styleReset,
            logoIn: logoIn
        }

    })();

    var designTab = (function () { //home/disgn切换效果
        var tab = '';
        var num = 0;
        var timer = null;
        var now = 0;

        function init() {
            bind();
        }

        function bind() {
            for (var i = 0; i < oSectionMenu.length; i++) {  //页面切换
                oSectionMenu[i].onmouseover = function () {
                    tab = this.dataset.tab;

                    for (var i = 0; i < aDesignSect.length; i++) {
                        aDesignSect[i].style.display = 'none';
                        toolsFn.startMove(aDesignSect[i], {'opacity': 0});
                        toolsFn.startMove(aDesignDisc[i], {'opacity': 0});
                        toolsFn.removeClass(aDisiView[i], 'active');

                        if (tab == aDisiView[i].dataset.tab) {
                            toolsFn.addClass(aDisiView[i], 'active');
                        }

                        if (tab == aDesignSect[i].dataset.tab) {
                            num = i;
                            aDesignSect[i].style.display = 'block';
                            aDesignDisc[i].style.display = 'block';
                            toolsFn.startMove(aDesignSect[i], {'opacity': 100});
                            toolsFn.startMove(aDesignDisc[i], {'opacity': 100, 'top': 200}, function () {
                                for (var i = 0; i < aDesignSect.length; i++) {
                                    if (i != num) {
                                        aDesignDisc[i].style.display = 'none';
                                        toolsFn.startMove(aDesignDisc[i], {'top': 270});
                                    }
                                }
                            });
                        }
                    }

                }
            }

            document.onmousemove = function (ev) {
                var disX = (viewWidth - ev.clientX) / 20;

                if (tab == 'designSectB') {
                    oImgMoveB1.style.marginLeft = disX + 'px';
                    oImgMoveB2.style.marginLeft = -disX + 'px';
                } else {
                    oImgMoveB1.style.marginLeft = 0;
                    oImgMoveB2.style.marginLeft = 0;
                }
                if (tab == 'designSectD') {
                    oImgMoveB3.style.marginLeft = disX + 'px';
                } else {
                    oImgMoveB3.style.marginLeft = 0;
                }
            }
        }

        function designIn() {    //动画进入
            clearInterval(timer);
            timer = setInterval(function () {
                oSectionMenu[now].style.transition = '0.6s ' + (now * 200) + 'ms';
                oSectionMenu[now].style.opacity = 1;
                oSectionMenu[now].style.marginTop = 0;
                now++;
                if (now >= oSectionMenu.length) {
                    now = 0;
                    clearInterval(timer);
                }
            }, 30)
        }

        return {
            init: init,
            designIn: designIn
        }

    })();

    var aboutList = (function () {    //about iceart 自动播放效果
        var arr = [];
        var timer = null;
        var timer2 = null;

        function init() {
            arr = [
                {name: 'rotate', deg: "0", opacity: 1, textName: 'translateX', textX: 0},
                {name: 'rotate', deg: "30", opacity: 0, textName: 'translateX', textX: 600},
                {name: 'rotate', deg: "-30", opacity: 0, textName: 'translateX', textX: -600}
            ];
            for (var i = 0; i < aImgLabel.length; i++) {
                aImgLabel[i].style.opacity = 0;
                if (i < 2) {
                    aImgLabel[i].style.left = (aImgLabel[i].offsetLeft - 80) + 'px';
                } else {
                    aImgLabel[i].style.left = (aImgLabel[i].offsetLeft + 80) + 'px';
                }
            }
            for (var i = 0; i < aAboutListLi.length; i++) {
                aAboutListLi[i].style.opacity = arr[i].opacity;
                aDetailDisc[i].style.opacity = arr[i].opacity;
                toolsFn.cssTransform(aAboutListLi[i], arr[i].name, arr[i].deg);
                toolsFn.cssTransform(aDetailDisc[i], arr[i].textName, arr[i].textX);
            }
            aDetailDisc[0].style.opacity = 0;
            oAboutTitle.style.top = '-60px';

            clearInterval(timer);
            clearInterval(timer2);
            clearInterval(oAboutTitle.timer);
            for (var i = 0; i < aImgLabel.length; i++) {
                clearInterval(aImgLabel[i].timer);
            }
        }

        function aboutListIn() {
            aboutListChagne();
        }

        function aboutListChagne() { //切换效果
            toolsFn.startMove(aImgLabel[0], {'left': 180, 'opacity': 100}, function () {
                toolsFn.startMove(aImgLabel[1], {'left': 24, 'opacity': 100});
                toolsFn.startMove(oAboutTitle, {'top': 46, 'opacity': 100});
            });
            toolsFn.startMove(aImgLabel[2], {'left': 530, 'opacity': 100}, function () {
                toolsFn.startMove(aImgLabel[3], {'left': 530, 'opacity': 100}, function () {
                    toolsFn.startMove(aImgLabel[4], {'left': 600, 'opacity': 100}, function () {
                        toolsFn.cssTransform(aDetailDisc[0], 'translateX', 0);
                        clearTimeout(timer2);
                        timer2 = setTimeout(function () {
                            aDetailDisc[0].style.opacity = arr[0].opacity;
                            autoPlay();
                        }, 500);
                    })
                });
            });

            function autoPlay() {
                clearInterval(timer);
                timer = setInterval(function () {
                    arr.unshift(arr.pop());
                    for (var i = 0; i < aAboutListLi.length; i++) {
                        aAboutListLi[i].style.opacity = arr[i].opacity;
                        aDetailDisc[i].style.opacity = arr[i].opacity;
                        toolsFn.cssTransform(aAboutListLi[i], arr[i].name, arr[i].deg);
                        toolsFn.cssTransform(aDetailDisc[i], arr[i].textName, arr[i].textX);
                    }
                }, 4000);
            }
        }

        return {
            init: init,
            aboutListIn: aboutListIn
        }

    })();


    var caseBanner = (function () {  //case 页面title 轮播滚动效果
        var timer = null;
        var now = 0;
        var timer2 = null;
        var timer3 = null;
        var arrImg = ['imgIn', 'imgOut', 'imgOutL'];
        var arrBg = ['b3.jpg', 'b2.jpg', 'b1.jpg'];


        function init() {
            calcW();
            titleAutoPlay();
            imgsAutoPlay();
            bind();
            setTimeout(numChange, 3000);
        }

        function bind() {

            window.addEventListener('resize', function () {
                calcW();
            });
            window.onfocus = function () {
                titleAutoPlay();
            };
            window.onblur = function () {
                clearInterval(timer);
            };

            oBannerImgPrev.onclick = function () {
                clearInterval(timer3);
                prevImg();
                rePlay();
            };

            oBannerImgNext.onclick = function () {
                clearInterval(timer3);
                nextImg();
                rePlay();
            }
        }

        function rePlay() {
            for (var i = 0; i < aBannerImgTabLi.length; i++) {
                aBannerImgTabLi[i].addEventListener('webkitTransitionEnd', end);
                aBannerImgTabLi[i].addEventListener('transitionend', end);
            }
            function end() {
                imgsAutoPlay();
            }
        }

        function calcW() {
            //计算title 列表宽及第一个LI;
            oBannerTitleList.style.width = (viewWidth * aBannerTitleLi.length) + 'px';
            for (var i = 0; i < aBannerTitleLi.length; i++) {
                aBannerTitleLi[i].style.width = viewWidth + 'px';
            }
        }

        function titleAutoPlay() {   //title自动滚动
            clearInterval(timer);
            timer = setInterval(function () {
                now++;
                if (now == aBannerTitleLi.length) {
                    aBannerTitleLi[0].style.position = 'relative';
                    aBannerTitleLi[0].style.left = viewWidth * aBannerTitleLi.length + 'px';
                }
                oBannerTitleList.style.transition = oBannerTitleList.style.WebkitTransition = '1s';
                oBannerTitleList.style.WebkitTransform = oBannerTitleList.style.transform = 'translate3d(' + -(viewWidth * now) + 'px,0,0.1px)';
                oBannerTitleList.addEventListener('webkitTransitionEnd', end);
                oBannerTitleList.addEventListener('transitionend', end);
                function end() {
                    if (now == aBannerTitleLi.length) {
                        now = 0;
                        oBannerTitleList.style.transition = oBannerTitleList.style.WebkitTransition = '0s';
                        oBannerTitleList.style.WebkitTransform = oBannerTitleList.style.transform = 'translate3d(' + 0 + 'px,0,0.1px)';
                        aBannerTitleLi[0].style.position = 'static';
                        aBannerTitleLi[0].style.left = 0;
                    }
                }
            }, 5050);
        }

        function numChange() {   //bannerNums 数字变化效果
            var arr = [];
            var max = 0;
            var index = -1;

            for (var i = 0; i < aNumChange.length; i++) {
                aNumChange[i].index = parseInt(aNumChange[i].innerHTML) - 1;
                aNumChange[i].dataset.btn = true;
                arr.push(parseInt(aNumChange[i].innerHTML));
            }

            clearInterval(timer2);
            timer2 = setInterval(function () {
                for (var i = 0; i < arr.length; i++) {
                    if (max < arr[i]) {
                        max = arr[i];
                        index = i;
                    }
                    if (Math.abs(aNumChange[i].index) < arr[i] && aNumChange[i].dataset.btn) {
                        aNumChange[i].index--;
                    }
                    if (Math.abs(aNumChange[i].index) >= arr[i]) {
                        aNumChange[i].dataset.btn = false;
                    }
                    aNumChange[i].innerHTML = Math.abs(aNumChange[i].index);
                    if (parseInt(aNumChange[i].innerHTML) == arr[i] && aNumChange[index].dataset.btn == 'false') {
                        clearInterval(timer2);
                    }
                }
            }, 30);
        }

        function imgsAutoPlay() {    //图片自动滚动
            clearInterval(timer3);
            timer3 = setInterval(function () {
                nextImg();
            }, 5000);
        }

        function prevImg() { //上一张
            arrImg.push(arrImg.shift());
            arrBg.push(arrBg.shift());
            for (var i = 0; i < aBannerImgTabLi.length; i++) {
                aBannerImgTabLi[i].className = arrImg[i];
                oCaseBanner.style.backgroundImage = 'url(./imgs/case/' + arrBg[i] + ')';
            }
            oCaseBanner.style.opacity = 0;
            setTimeout(function () {
                oCaseBanner.style.opacity = 1;
            }, 300);
        }

        function nextImg() { //下一张
            arrImg.unshift(arrImg.pop());
            arrBg.unshift(arrBg.pop());
            for (var i = 0; i < aBannerImgTabLi.length; i++) {
                aBannerImgTabLi[i].className = arrImg[i];
                oCaseBanner.style.backgroundImage = 'url(./imgs/case/' + arrBg[i] + ')';
            }
            oCaseBanner.style.opacity = 0;
            setTimeout(function () {
                oCaseBanner.style.opacity = 1;
            }, 300);
        }

        return {
            init: init
        }
    })();

    var caseContent = (function () {  //case页面内容部分
        var sHtml = '';
        var t = 0;
        var b = 0;

        function init() {
            footerAnimation.createFooter(oCaseWrap, 'footer1');
            t = oCooperate.getBoundingClientRect().top;
            b = oCooperate.getBoundingClientRect().bottom;

            bind();
            createImg();
            createAttr();
        }

        function bind() {
            for (var i = 1; i < aCaseConNavLi.length; i++) {    //内容导航
                aCaseConNavLi[i].index = i;
                aCaseConNavLi[i].onclick = function () {
                    aCaseConNavLi[0].style.left = this.offsetLeft + 'px';
                    aCaseConNavLi[0].children[0].style.left = -this.offsetLeft + 'px';

                    for (var i = 0; i < aCaseCImg.length; i++) {
                        aCaseCImg[i].style.display = 'none';
                        if (this.children[0].innerHTML == aCaseCImg[i].dataset.imgin) {
                            aCaseCImg[i].style.display = 'block';
                            oCaseConImgs.style.opacity = 0;
                            oCaseConImgs.style.WebkitTransform = oCaseConImgs.style.transform = 'translateY(100px)';
                            oCaseConImgs.addEventListener('webkitTransitionEnd', caseConImgsEnd, false);
                            oCaseConImgs.addEventListener('transitionend', caseConImgsEnd, false);
                            function caseConImgsEnd() {
                                this.style.opacity = 1;
                                this.style.WebkitTransition = this.style.transition = '0.6s';
                                this.style.WebkitTransform = this.style.transform = 'translateY(0px)';
                            }
                        } else if (this.children[0].innerHTML == 'Whole') {
                            aCaseCImg[i].style.display = 'block';
                        }
                    }
                }
            }

            window.addEventListener(mousewheel, function (ev) {
                setTimeout(function () {
                    wheelDown(ev);
                }, 120);
                if (isDown) {

                    for (var i = 0; i < aCaseCImg.length; i++) {
                        var eleHeight = aCaseCImg[i].getBoundingClientRect().top + aCaseCImg[i].offsetHeight / 3;
                        var eleBottom = aCaseCImg[i].getBoundingClientRect().bottom;
                        if (eleHeight <= viewHeight && eleBottom > viewHeight && aCaseCImg[i].dataset.up == 'false') {
                            aCaseCImg[i].style.WebkitTransition = aCaseCImg[i].style.transition = '0.3s';
                            aCaseCImg[i].style.WebkitTransform = aCaseCImg[i].style.transform = 'translateY(100px)';
                            aCaseCImg[i].style.opacity = 0;
                            aCaseCImg[i].dataset.up = 'true';
                            aCaseCImg[i].addEventListener('transitionend', caseCImgEnd, false);
                            aCaseCImg[i].addEventListener('webkitTransitionEnd', caseCImgEnd, false);

                            function caseCImgEnd() {
                                this.style.WebkitTransition = this.style.transition = '0.6s linear';
                                this.style.WebkitTransform = this.style.transform = 'translateY(0px)';
                                this.style.opacity = 1;
                            }
                        }
                    }
                    footerAnimation.testView();
                }
            })
        }

        function createImg() {    //图片加载
            for (var i = 0; i < imgData.case.caseList.length; i++) {
                var oDiv = document.createElement('div');
                sHtml = '<a href="javascript:;"><span class="imgWrap"><img src="./imgs/case/caseList/' + imgData.case.caseList[i] + '"></span><img class="shadow" src="./imgs/case/shadow.png"><span class="mask"></span><span class="search"><img src="./imgs/search_icon.png"></span></a>';
                oDiv.className = 'caseCImg';
                oDiv.dataset.up = 'false';
                oDiv.innerHTML = sHtml;
                oCaseConImgs.appendChild(oDiv);
            }
            aCaseCImg = toolsFn.getByClass(oCaseConImgs, 'caseCImg');
        }

        function createAttr() {  //创建分类属性
            var obj = {'Mobile': 8, 'Website': 12, 'Logo': 6, 'Flat': 6};

            for (var s in obj) {
                switch (s) {
                    case 'Mobile':
                        classifyImg(obj[s], s);
                        break;
                    case 'Website':
                        classifyImg(obj[s], s);
                        break;
                    case 'Logo':
                        classifyImg(obj[s], s);
                        break;
                    case 'Flat':
                        classifyImg(obj[s], s);
                        break;
                }
            }
        }

        function classifyImg(num, attr) { //图片随机分类
            var arr = [];
            var arr2 = [];
            for (var i = 0; i < aCaseCImg.length; i++) {
                arr.push(i);
            }
            for (var i = 0; i < num; i++) {
                var random = Math.floor(Math.random() * arr.length);
                arr2.push(arr.splice(random, 1));
            }
            for (var i = 0; i < arr2.length; i++) {
                aCaseCImg[arr2[i]].dataset.imgin = attr;
            }
        }

        return {
            init: init
        }
    })();

    var footerAnimation = (function () {   // footer运动效果
        var bFoot = true;
        var t = 0;
        var b = 0;

        function createFooter(parent, id) {
            var oFooter = document.createElement('div');
            oFooter.id = id;
            oFooter.innerHTML = footerTemplate;
            parent.appendChild(oFooter);
            oCooperate = toolsFn.getByClass(oFooter, 'cooperate')[0];
            aLogos = toolsFn.getByClass(oFooter, 'cooperateLogo');
            oFootLogo = toolsFn.getByClass(oFooter, 'footLogo')[0];
            aFootInfo = toolsFn.getByClass(oFooter, 'footInfo');
        }

        function testView() {
            t = oCooperate.getBoundingClientRect().top;
            b = oCooperate.getBoundingClientRect().bottom;
            if (t >= 0 && b < viewHeight && bFoot) {
                moveUp();
            }
        }

        function moveUp() {  //向上运动

            /*合作logo*/
            for (var i = 0; i < aLogos.length; i++) {
                toolsFn.cssTransform(aLogos[i], 'translateY', 40);
                aLogos[i].index = i;
                moves(aLogos[i], 'translateY', 0.4);
            }

            /*底部logo*/
            toolsFn.cssTransform(oFootLogo, 'translateX', -100);
            moves(oFootLogo, 'translateX', 0.9);

            /*底部信息*/
            for (var i = 0; i < aFootInfo.length; i++) {
                toolsFn.cssTransform(aFootInfo[i], 'translateY', 300);
                aFootInfo[i].index = i;
                moves(aFootInfo[i], 'translateY', 0.8);
            }

            bFoot = false;
        }

        function moves(obj, attr, time) {
            obj.style.opacity = 0;
            obj.addEventListener('webkitTransitionEnd', logoEnd, false);
            obj.addEventListener('transitionend', logoEnd, false);
            function logoEnd() {
                if (obj == oFootLogo) {
                    this.style.WebkitTransition = this.style.transition = time + 's';
                } else {
                    this.style.WebkitTransition = this.style.transition = time + 's ' + (200 * this.index) + 'ms';
                }
                this.style.opacity = 1;
                toolsFn.cssTransform(this, attr, '0');
            }
        }

        return {
            createFooter: createFooter,
            moveUp: moveUp,
            testView: testView
        }

    })();

    var aboutBanner = (function () {

        function init() {
            footerAnimation.createFooter(oAboutWrap, 'footer2');
            bind();
            aboutTitle();
        }

        function bind() {
            var timer = null;
            var isOpen = true;
            var isClick = true;
            var lastTeamPic = aAboutTeamPic[aAboutTeamPic.length - 1];

            oAboutTeamWrap.onclick = function () {
                if (isOpen) {
                    isClick = true;
                    oAboutTeamDetail.style.display = 'block';
                    for (var i = 0; i < aAboutTeamPic.length; i++) {
                        aAboutTeamPic[i].style.opacity = 0;
                        aAboutTeamPic[i].style.WebkitTransform = aAboutTeamPic[i].style.transform = 'translateY(290px)';
                    }
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        oAboutTeamDetail.style.opacity = 1;
                        oAboutTeamDetail.style.paddingTop = '50px';
                        oAboutTeamDetail.style.height = '600px';
                    }, 100);
                    oAboutTeamDetail.addEventListener('webkitTransitionEnd', detailEnd, false);
                    oAboutTeamDetail.addEventListener('transitionend', detailEnd, false);
                    function detailEnd() {
                        var top = this.getBoundingClientRect().top - oHeader.offsetHeight;
                        if (isClick) {
                            isClick = false;
                            window.scrollTo(0, top);
                        }
                        for (var i = 0; i < aAboutTeamPic.length; i++) {
                            aAboutTeamPic[i].style.WebkitTransition = aAboutTeamPic[i].style.transition = '1s ' + (200 * i) + 'ms';
                            aAboutTeamPic[i].style.opacity = 1;
                            aAboutTeamPic[i].style.WebkitTransform = aAboutTeamPic[i].style.transform = 'translateY(0)';
                        }
                        oBannerTeamPicBtn.style.display = 'block';
                        lastTeamPic.addEventListener('webkitTransitionEnd', lastTeamPicEnd, false);
                        lastTeamPic.addEventListener('transition', lastTeamPicEnd, false);
                        function lastTeamPicEnd() {
                            oBannerTeamPicBtn.style.WebkitTransition = oBannerTeamPicBtn.style.transition = '0.5s opacity';
                            oBannerTeamPicBtn.style.opacity = 1;
                        }
                    }
                } else {
                    openTeamDetail();
                }
                isOpen = !isOpen;
                window.scrollTo(0, 0);
            };

            oBannerTeamPicBtn.onclick = function () {
                openTeamDetail();
                window.scrollTo(0, 0);
                isOpen = true;
            };

            document.addEventListener('mousemove', function (ev) {
                var left = ev.clientX / viewWidth * 50;
                if (oBannerLang4.getBoundingClientRect().top >= 0 && oBannerLang4.getBoundingClientRect().bottom <= viewHeight) {
                    toolsFn.cssTransform(oBannerLang4, 'translateX', left);
                } else {
                    toolsFn.cssTransform(oBannerLang4, 'translateX', 0);
                }
            }, false);
        }

        function openTeamDetail() {
            oAboutTeamDetail.style.height = '0';
            oAboutTeamDetail.style.opacity = '0';
            oAboutTeamDetail.style.marginTop = '-610px';
            oAboutTeamDetail.style.paddingTop = '600px';
            oBannerTeamPicBtn.style.opacity = 0;
            setTimeout(function () {
                oAboutTeamDetail.style.display = 'none';
                oBannerTeamPicBtn.style.display = 'none';
                oAboutTeamDetail.style.marginTop = '0';
                oAboutTeamDetail.style.paddingTop = '0';
            }, 1000);
        }

        function aboutTitle() {  //oAboutTeamTitle 运动
            toolsFn.cssTransform(oAboutTeamTitle, 'translateY', 0);
            aAboutTeamTitleP[0].style.opacity = 1;
            aAboutTeamTitleP[0].addEventListener('webkitTransitionEnd', titleEnd, false);
            aAboutTeamTitleP[0].addEventListener('transitionend', titleEnd, false);
            function titleEnd() {
                aAboutTeamTitleP[1].style.opacity = 1;
            }
        }

        return {
            init: init
        }
    })();

    var aboutContent = (function () { //about 内容部分运动
        var oImgConMsg = null;
        var oImgConSub = null;
        var headT = oAboutHead.getBoundingClientRect().top;
        var headB = oAboutHead.getBoundingClientRect().bottom;
        var abilityConT = oAbilityContent.getBoundingClientRect().top;
        var imgWrapT = null;
        var timer = null;
        var isScroll = true;
        var timer2 = null;
        var isScroll2 = true;
        var timer3 = null;
        var isScale = false;
        var timer4 = null;
        var iNow = 0;


        function init() {
            for (var i = 0; i < aImgConWrap.length; i++) {
                aImgConWrap[i].dataset.initailscale = 'true';
            }
            window.addEventListener('scroll', function () {
                headT = oAboutHead.getBoundingClientRect().top;
                headB = oAboutHead.getBoundingClientRect().bottom;
                abilityConT = oAbilityContent.getBoundingClientRect().top;
                for (var i = 0; i < aImgConWrap.length; i++) {
                    imgWrapT = aImgConWrap[i].getBoundingClientRect().top;
                }

                footerAnimation.testView();

            }, false);
            bind();
        }

        function bind() {
            window.addEventListener(mousewheel, function (ev) {
                setTimeout(function () {
                    wheelDown(ev);
                }, 120);

                //service 内容头部运动效果
                serviceHeadAnimation();

                //service 内容图片运动效果
                serviceConImgAnimation();

                if (isScroll2 && abilityConT < viewHeight) { //鼠标滚动aAbilityList1Li 图标缩放效果
                    isScroll2 = false;
                    List1scrollScale();
                }
            }, false);


            //鼠标移入aAbilityList1Li 图标左右位移效果
            for (var i = 0; i < aAbilityList1Li.length; i++) {
                aAbilityList1Li[i].onmouseenter = function () {
                    if (!isScale) {
                        styleSetting(toolsFn.getByClass(this, 'childImg')[0], 'translateX(-10px)', '0.3s');
                        styleSetting(toolsFn.getByClass(this, 'childDisc')[0], 'translateX(10px)', '0.3s');
                    }
                };
                aAbilityList1Li[i].onmouseleave = function () {
                    if (!isScale) {
                        styleSetting(toolsFn.getByClass(this, 'childImg')[0], 'translateX(0px)', '0.3s');
                        styleSetting(toolsFn.getByClass(this, 'childDisc')[0], 'translateX(0px)', '0.3s');
                    }
                };
            }

            //aAboutAbilityList 切换列表点击事件
            for (var i = 0; i < aAboutAbilityBtn.length; i++) {
                aAboutAbilityBtn[i].index = i;
                aAboutAbilityBtn[i].onclick = function () {
                    if (iNow == this.index) return;
                    iNow = this.index;
                    show();
                    if (iNow == 0) {
                        List1scrollScale();
                    } else if (iNow == 1) {
                        List2scrollScale();
                    }
                }
            }


            //service 图片移入/移出运动效果
            for (var i = 0; i < aImgConWrap.length; i++) {
                aImgConWrap[i].index = i;
                aImgConWrap[i].onmouseenter = function () {
                    oImgConMsg = toolsFn.getByClass(aImgConWrap[this.index], 'msg')[0];
                    oImgConSub = toolsFn.getByClass(aImgConWrap[this.index], 'sub')[0];
                    toggleClass(this.index, toolsFn.addClass);
                };
                aImgConWrap[i].onmouseleave = function () {
                    toggleClass(this.index, toolsFn.removeClass);
                }
            }
            //oAboutAbilitySwitch 切换列表按钮点击事件
            oAboutAbilitySwitchBtn.onclick = function () {
                iNow++;
                iNow = iNow % aAboutAbilityBtn.length;
                show();
                if (iNow == 0) {
                    List1scrollScale();
                } else if (iNow == 1) {
                    List2scrollScale();
                }
            }
        }

        function show() {
            for (var i = 0; i < aAboutAbilityBtn.length; i++) {
                aAboutAbilityBtn[i].className = '';
                aAbilityList[i].style.display = 'none';
            }
            aAboutAbilityBtn[iNow].className = 'active';
            aAbilityList[iNow].style.display = 'block';
        }

        function serviceConImgAnimation() {//service 内容图片运动效果
            for (var i = 0; i < aImgConWrap.length; i++) {
                imgWrapT = aImgConWrap[i].getBoundingClientRect().top;
                var childrens = toolsFn.getByClass(aImgConWrap[i], 'img');
                if (imgWrapT < viewHeight && aImgConWrap[i].dataset.initailscale == 'true') {
                    styleSetting(aImgConWrap[i], 'scale(0)', '0s');
                    for (var j = 0; j < childrens.length; j++) {
                        styleSetting(childrens[j], 'scale(0)', '0s');
                    }
                    clearTimeout(timer2);
                    timer2 = setTimeout(function () {
                        for (var i = 0; i < aImgConWrap.length; i++) {
                            childrens = toolsFn.getByClass(aImgConWrap[i], 'img');
                            styleSetting(aImgConWrap[i], 'scale(1)', '0.3s cubic-bezier(.75,.82,.86,1.15)');
                            for (var j = 0; j < childrens.length; j++) {
                                styleSetting(childrens[j], 'scale(1)', '0.3s 0.4s cubic-bezier(.75,.82,.86,1.15)');
                            }
                        }
                    }, 1000);
                    aImgConWrap[i].dataset.initailscale = 'false';
                }
            }
        }

        function serviceHeadAnimation() {//service 内容头部运动效果
            if (headT > 70 && headB < viewHeight) {
                if (!isScroll) {
                    return;
                }
                for (var i = 0; i < aAboutHeadPoint.length; i++) {
                    styleSetting(aAboutHeadPoint[i], 'scale(0)', '0s');
                }
                styleSetting(oAboutHeadSearch, 'scale(0)', '0s');
                styleSetting(oAboutHeadWeb, 'scale(0)', '0s');
                styleSetting(oAboutHeadUser, 'scale(0)', '0s');
                styleSetting(oAboutHeadAdd, 'scale(0)', '0s');

                clearTimeout(timer);
                timer = setTimeout(function () {
                    for (var i = 0; i < aAboutHeadPoint.length; i++) {
                        styleSetting(aAboutHeadPoint[i], 'scale(1)', '1.8s ' + i * 300 + 'ms');
                    }
                    styleSetting(oAboutHeadSearch, 'scale(1)', '2s');
                    styleSetting(oAboutHeadWeb, 'scale(1)', '2s');
                    styleSetting(oAboutHeadUser, 'scale(1)', '2s');
                    styleSetting(oAboutHeadAdd, 'scale(1)', '2s');
                    isScroll = false;
                }, 200);
            }
        }

        function List1scrollScale() {//鼠标滚动aAbilityList1Li 图标缩放效果
            isScale = true;
            for (var j = 0; j < aChildImg.length; j++) {
                styleSetting(aChildImg[j], 'scale(0)', '0s');
                styleSetting(aChildTitle[j], 'translateX(-170px)', '0s');
                styleSetting(aChildInfo[j], 'translateX(-390px)', '0s');
            }
            clearTimeout(timer3);
            timer3 = setTimeout(function () {
                for (var i = 0; i < aAbilityList1Li.length; i++) {
                    (function (i) {
                        var oChildImg = toolsFn.getByClass(aAbilityList1Li[i], 'childImg')[0];
                        styleSetting(oChildImg, 'scale(1)', '0.3s ' + i * 100 + 'ms');
                        oChildImg.addEventListener('webkitTransitionEnd', childImgEnd, false);
                        oChildImg.addEventListener('transitionend', childImgEnd, false);
                        function childImgEnd() {
                            var nextEle = this.nextElementSibling || this.nextSibling;
                            var title = nextEle.children[0];
                            var info = nextEle.children[1];
                            styleSetting(title, 'translateX(0px)', '0.3s cubic-bezier(.6,1.11,.96,1.35)');
                            styleSetting(info, 'translateX(0px)', '0.3s 0.3s cubic-bezier(.6,1.11,.96,1.35)');

                            isScale = false;
                        }
                    })(i);
                }
            }, 200);
        }


        function List2scrollScale() {//鼠标滚动aAbilityList2 图标缩放效果
            for (var i = 0; i < aAbilityList2Img.length; i++) {
                styleSetting(aAbilityList2Img[i], 'scale(0)', '0s');
                clearTimeout(timer4);
                timer4 = setTimeout(function () {
                    for (var i = 0; i < aAbilityList2Img.length; i++) {
                        styleSetting(aAbilityList2Img[i], 'scale(1)', '0.6s ' + i * 300 + 'ms  cubic-bezier(.6,1.11,.74,1.13)');
                    }
                }, 200);
            }
        }

        function styleSetting(obj, val, time) {    //样式设置
            obj.style.WebkitTransition = obj.style.transition = time;
            obj.style.WebkitTransform = obj.style.transform = val;
        }


        function toggleClass(index, cls) {   //图片信息移入class切换
            switch (index) {
                case 0 :
                case 1 :
                    cls(oImgConMsg, 'moveLeftMsg');
                    cls(oImgConSub, 'moveLeftSub');
                    break;
                case 2 :
                    cls(oImgConMsg, 'moveTopMsg');
                    cls(oImgConSub, 'moveTopSub');
                    break;
                case 3 :
                    break;
                case 4 :
                    cls(oImgConMsg, 'moveBottomMsg');
                    cls(oImgConSub, 'moveBottomSub');
                    break;
                case 5 :
                case 6 :
                    cls(oImgConMsg, 'moveRightMsg');
                    cls(oImgConSub, 'moveRightSub');
                    break;
            }
        }

        return {
            init: init
        }
    })();

    var aboutBtmCarousel = (function () { //about页面底部轮播图
        var timer = null;
        var iNum = 0;
        var iNow = 0;
        var timer2 = null;
        var isClick = true;

        function init() {
            clearTimeout(timer2);
            timer2 = setTimeout(listAutoPlay, 2000);
            bind();
        }

        function bind() {
            for (var i = 0; i < aAboutBtmCarouselBtns.length; i++) {
                aAboutBtmCarouselBtns[i].index = i;
                aAboutBtmCarouselBtns[i].onclick = function () {
                    if (isClick) {
                        isClick = false;
                        iNow = this.index;
                        clearInterval(timer);
                        listAnimation();
                    }
                };
            }
        }

        function listAutoPlay() {    //自动播放
            clearInterval(timer);
            timer = setInterval(function () {
                iNow++;
                iNow = iNow % aAboutBtmCarouselLi.length;
                listAnimation();
            }, 6000);
        }

        function listAnimation() {
            for (var i = 0; i < aAboutBtmCarouselBtns.length; i++) {
                aAboutBtmCarouselBtns[i].className = '';
            }
            aAboutBtmCarouselBtns[iNow].className = 'active';
            aAboutBtmCarouselLi[iNow].style.left = viewWidth + 'px';
            toolsFn.startMove(aAboutBtmCarouselLi[iNum], {left: -viewWidth});
            toolsFn.startMove(aAboutBtmCarouselLi[iNow], {left: 0}, function () {
                iNum = iNow;
                listAutoPlay();
                isClick = true;
            });
        }

        return {
            init: init
        }
    })();


    var contactPage = (function () {    //contact页面动画效果
        var conAH = oContactPageACon.offsetHeight;
        var conBH = oContactPageBCon.offsetHeight;
        var conCH = oContactPageCCon.offsetHeight;
        var timer = null;
        var iNow = 0;
        var isOpaicty = false;
        var num = 0;

        function init() {
            oContactPageA.style.height = viewHeight + 'px';
            oContactPageB.style.height = viewHeight + 'px';
            oContactPageC.style.height = viewHeight + 'px';
            window.addEventListener('resize', function () {
                oContactPageA.style.height = viewHeight + 'px';
                oContactPageB.style.height = viewHeight + 'px';
                oContactPageC.style.height = viewHeight + 'px';
                oContactPageACon.style.top = viewHeight - conAH + 'px';
                oContactPageBCon.style.top = viewHeight - conBH + 'px';
                oContactPageCCon.style.top = viewHeight - conCH + 'px';
            }, false);
            setTimeout(function(){
                infoAnimation(0);
            },500);
            bind();
        }

        function bind() {
            window.addEventListener('mousemove', function (ev) {
                var x = (ev.clientX - viewWidth / 2) / 40;
                shanAnimation(aContactShan[0], -x);
                shanAnimation(aContactShan[1], x);
                shanAnimation(aContactShan[2], -x);
                shanAnimation(aContactShan[3], x);
            }, false);

            window.addEventListener(mousewheel, scrollFn, false);
            function scrollFn(ev) {
                num++;
                wheelDown(ev);
                if (isDown && num > 3) {
                    num = 0;
                    iNow++;
                    if (iNow > aContactBtns.length - 1) {
                        iNow = aContactBtns.length;
                        return;
                    }
                    if(iNow > 0){
                        infoAnimation(-500);
                    }
                    pageBAnimation();
                } else if (!isDown && num > 3) {
                    num = 0;
                    iNow--;
                    if (iNow < 0) {
                        iNow = 0;
                        return;
                    }
                   if (iNow <= 0) {
                        setTimeout(function(){
                            infoAnimation(0);
                        },500)
                    }
                    pageBAnimation();
                }
            }

            oContactSupportCls.onclick = function () {
                toolsFn.removeClass(oContactSupport, 'moveUp');
            }
        }

        function pageBAnimation() {
            oContactTitles.style.WebkitTransition = oContactTitles.style.transition = '0s';
            if (isDown) {
                toolsFn.cssTransform(oContactTitles, 'translateY', 750);
            } else {
                toolsFn.cssTransform(oContactTitles, 'translateY', 100);
            }
            oContactPhone.style.WebkitTransition = oContactPhone.style.transition = '0s';
            toolsFn.cssTransform(oContactPhone, 'translateY', 625);

            oContactPage.style.WebkitTransition = oContactPage.style.transition = '0.5s';
            oContactPage.style.top = -(viewHeight * iNow) + 'px';

            for (var i = 0; i < aContactBtns.length; i++) {
                aContactBtns[i].className = '';
            }
            aContactBtns[iNow].className = 'active';

            oContactPage.addEventListener('webkitTransitionEnd', pageEnd, false);
            oContactPage.addEventListener('transitionend', pageEnd, false);
            function pageEnd() {
                oContactTitles.style.WebkitTransition = oContactTitles.style.transition = '0.4s linear';
                toolsFn.cssTransform(oContactTitles, 'translateY', 350);
                if (iNow == 0) {
                    toolsFn.removeClass(oContactLogoPics, 'moveModel1');
                    toolsFn.removeClass(oContactLogoPics, 'moveModel2');
                } else if (iNow == 1) {
                    toolsFn.removeClass(oContactLogoPics, 'moveModel2');
                    toolsFn.addClass(oContactLogoPics, 'moveModel1');
                    toolsFn.removeClass(oContactSupport, 'moveUp');
                    toolsFn.removeClass(oContactLogoLastPic, 'rotateBack');
                    isOpaicty = false;
                } else if (iNow == 2) {
                    for (var i = 0; i < aContactLogoPic.length; i++) {
                        aContactLogoPic[i].style.opacity = 0.6;
                    }
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        toolsFn.removeClass(oContactLogoPics, 'moveModel1');
                        toolsFn.addClass(oContactLogoPics, 'moveModel2');
                        isOpaicty = true;
                    }, 100);

                    if (isOpaicty) {
                        for (var i = 0; i < aContactLogoPic.length; i++) {
                            aContactLogoPic[i].style.opacity = 1;
                        }
                    }
                    oContactLogoLastPic.addEventListener('webkitTransitionEnd', endFn, false);
                    oContactLogoLastPic.addEventListener('transitionend', endFn, false);
                }
                function endFn() {
                    toolsFn.addClass(oContactSupport, 'moveUp');
                    toolsFn.addClass(this, 'rotateBack');
                }

                oContactPhone.style.WebkitTransition = oContactPhone.style.transition = '.5s .6s';
                toolsFn.cssTransform(oContactPhone, 'translateY', 0);
            }
        }

        function infoAnimation(num) {
            oContactTitle.style.WebkitTransform = oContactTitle.style.transform = 'translateX('+ num +'px)';
            oContactSubTitle.style.WebkitTransform = oContactSubTitle.style.transform = 'translateX('+ num +'px)';
            oContactInfo.style.WebkitTransform = oContactInfo.style.transform = 'translateX('+ num +'px)';
            oContactBtns.style.WebkitTransform = oContactBtns.style.transform = 'translateX('+ num +'px)';
        }

        function shanAnimation(ele, val) {
            ele.style.WebkitTransform = ele.style.transform = 'translateX(' + val + 'px)';
        }

        return {
            init: init
        }
    })();

    var mallContent = (function () {
        function init() {
            bind();
        }

        function bind() {
            for (var i = 0; i < aMallBusiTitles.length; i++) {
                aMallBusiTitles[i].onmouseover = function () {
                    toolsFn.addClass(this, 'in');
                    toolsFn.removeClass(this, 'out');
                };
                aMallBusiTitles[i].onmouseout = function () {
                    toolsFn.addClass(this, 'out');
                    toolsFn.removeClass(this, 'in');
                };
            }
        }

        return {
            init: init
        }
    })();

    init();
};





