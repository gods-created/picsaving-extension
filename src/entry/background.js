import api from '@/mixins/api.js';

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: 'PicSaving',
    title: 'Save',
    type: 'normal',
    contexts: ['image'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const data = {
    action: 'loader',
    message: ''
  };

  const url = info.srcUrl;
  await sendMessageToContent(data);
  
  const uploadImage = await api.uploadImage(url);
  const { status, err_description } = uploadImage;

  if (status === 'error') {
    data.action = 'alert';
    data.message = err_description;
  }

  await sendMessageToContent(data);
  return;
});


async function sendMessageToContent(data) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {data: data});  
  });
}
