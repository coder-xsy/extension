// 后台脚本中的请求拦截和处理

// 启用调试器
chrome.debugger.attach({ tabId: chrome.tabs.TAB_ID_NONE }, '1.3', function() {
  // 监听调试事件
  chrome.debugger.onEvent.addListener(function(debuggeeId, message, params) {
    console.log('test>>>>>')
    if (message == 'Network.requestWillBeSent') {
      // 拦截请求并设置预设的响应
      const requestId = params.requestId;
      const responseHeaders = [
        { name: 'Content-Type', value: 'text/plain' }
      ];
      const responseBody = btoa('Hello, world!');

      // 发送预设的响应
      chrome.debugger.sendCommand(debuggeeId, 'Network.fulfillInterceptedRequest', {
        requestId: requestId,
        responseCode: 200,
        responseHeaders: responseHeaders,
        body: responseBody
      });
    }
  });
});

// 示例：在调试器中拦截网络请求并设置预设的响应
chrome.debugger.sendCommand({ tabId: chrome.tabs.TAB_ID_NONE }, 'Network.enable');
