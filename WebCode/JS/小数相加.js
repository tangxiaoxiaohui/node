function formatNumber(val) {
	let str = `${val}`;
	arr = str.split('.')
	return {
		arr,
		max: (arr[1] || '').length
	}
}

function operation(type, a, b) {
	let {arr: aArr, max: aLen} = formatNumber(a)
	let {arr: bArr, max: bLen} = formatNumber(b)
	maxLen = aLen > bLen ? aLen : bLen
	aArr[1] = (aArr[1] || '').padEnd(maxLen, '0')
	bArr[1] = (bArr[1] || '').padEnd(maxLen, '0')
	a = aArr.join('');
	b = bArr.join('');
	switch (type) {
		case 'ADD':
			return (Number(a) + Number(b)) / Math.pow(10,maxLen);
		case 'MUL':
			return (Number(a) * Number(b)) /  Math.pow(10, 2 * maxLen);
	}
}

export function numberADD(a, b) {
	return operation('ADD',a,b)
}

export function numberMUL(a, b) {
	return operation('MUL',a,b)
}