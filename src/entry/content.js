chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const data = message.data;
	const action = data.action;
	const err_description = data.message;

	if (action === 'loader') {
		_loader();
	} else if (action === 'alert') {
		_alert(err_description);
	}

	return
});

function _loader() {
	const main_block = document.querySelector('#pic-saving');

	if (main_block !== null) {
		main_block.style.display = main_block.style.display == 'flex' ? 'none' : 'flex';
	} else if (main_block === null) {
		const body = document.body;

		const main_div = document.createElement('div');
		main_div.id = 'pic-saving';
		main_div.style.position = 'fixed';
		main_div.style.top = '0';
		main_div.style.left = '0';
		main_div.style.width = '100%';
		main_div.style.height = '100%';
		main_div.style.display = 'flex';
		main_div.style.alignItems = 'center';
		main_div.style.zIndex = '9999';
		main_div.style.justifyContent = 'center';
		main_div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	
		const loader_div = document.createElement('div');
		loader_div.className = 'loader';
		loader_div.style.display = 'block';
		loader_div.style.border = '16px solid #f3f3f3'; 
		loader_div.style.borderRadius = '50%';
		loader_div.style.borderTop = '16px solid #3498db'; 
		loader_div.style.width = '120px';
		loader_div.style.height = '120px';
		loader_div.style.animation = 'spin 2s linear infinite';

		const style = document.createElement('style');
		style.innerHTML = `
			@keyframes spin {
				0% { transform: rotate(0deg); }
				100% { transform: rotate(360deg); }
			}
		`;
	
		main_div.appendChild(loader_div);
		body.appendChild(main_div);
		body.appendChild(style);
	}
}

function _alert(message) {
	alert(message);
	return _loader();
}