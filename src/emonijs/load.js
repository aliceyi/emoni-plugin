
class Monitor {
    constructor() {
      this.info = {
        openTime: 0,
        whiteScreenTime: 0, // 白屏时间
        readyTime: 0, // 用户可操作时间
        allloadTime: 0, // 全部加载时间
        nowTime:0 // 当前时间
      }
      this.defaults = {
        msg:'',  // 错误的具体信息
        url:'',  // 错误所在的url
        line:'', // 错误所在的行
        col:'',  // 错误所在的列
        nowTime: '',// 时间
      }
      this.timname = {
  
        whiteScreenTime: '白屏时间(ms)',
        readyTime: '用户可操作时间(ms)',
        allloadTime: '总下载时间(ms)',
        mobile: '使用设备',
        nowTime: '时间',
      }
  
    }
    mobileType() {
      let self = this;
      const u = navigator.userAgent, app = navigator.appVersion;
      const type =  {// 移动终端浏览器版本信息
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        iPad: u.indexOf('iPad') > -1, //是否iPad
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
        webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
      };
      const lists = Object.keys(type);
      for (let i = 0; i < lists.length; i++) {
        if (type[lists[i]]) {
          return lists[i];
        }
      }
    }
  
    formatWarn(items,names='') {
        const self  = this;
        let str = ''
        for (let i in items) {
          const name = names?names[i]:i;
          if (i === 'nowTime') {
            console.warn(name,new Date(items[i]).Format('yyyy-MM-dd hh:mm:ss'));
          } else {
           if (name) console.warn(name,items[i]);
          }
          if (items[i] === null || items[i] === undefined) {
              items[i] = 'null';
          }
          str += '&'+ name + '=' + items[i].toString();
      }
      str = str.replace('&', '').replace('\n','').replace(/\s/g, '');
      return str;
    }
  
    onload() {
      const self = this;
      self.info.allloadTime = +new Date() - self.info.openTime;
      self.info.nowTime = +new Date();
      let timname = self.timname;
      let logStr = self.formatWarn(self.info, timname);
      (new Image()).src = '/action?' + logStr;
    }
  
    onerror(msg,url,line,col) {
      const self = this;
      col = col || (window.event && window.event.errorCharacter) || 0;
      self.defaults.url = url;
      self.defaults.line = line;
      self.defaults.msg = msg;
      self.defaults.col =  col;
      self.defaults.nowTime = new Date();
      let str = self.formatWarn(self.defaults);
      (new Image()).src = '/error?' + str;
    }
  
    onvueerror(msg) {
      const self = this;
      console.warn('vueError:',msg);
      (new Image()).src = '/vueerror?' + msg;
    }
  
    rewriteVueError() {
      const self = this;
      console.error = ((origin) => {
        return (info) => {
          var errorLog = {
            desc: info
          }
          self.onvueerror(info.toString())
          origin.call(console,info)
        }
      })(console.error)
    }
  
    init() {
      const self = this;
      self.info.openTime =  performance.timing.navigationStart;
      self.info.whiteScreenTime = +new Date() - self.info.openTime;
      // 注册内容加载事件
      document.addEventListener('DOMContentLoaded',function (event) {
        self.info.readyTime = +new Date() - self.info.openTime;
      });
      //获取手机类型
      self.info.mobile = self.mobileType();
  
      // 页面加载时间计算
      window.onload = self.onload.bind(self)
  
      // 页面加载错误
      window.onerror = self.onerror.bind(self)
  
      self.rewriteVueError()
  
    }
  
  }
  
  export default Monitor;
  