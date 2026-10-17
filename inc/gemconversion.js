const gem1 = '<:gem1:1560818190722793502>';
const gem3 = '<:gem3:1560818609939415050>';
const gem9 = '<:gem9:1560818992585777162>';
const gem27 = '<:gem27:1560819166439804999>';
const gem81 = '<:gem81:1560819272731590731>';
const gem243 = '<:gem243:1560819901747175496>';

function baseThreeGem(input) {
	let t = input;
	let rtext = '';
	// let dbgtext = '';
	for (let p = 5; p >= 0; p--) {
		const pwr = 3 ** p;
		const bit = Math.floor(t / pwr);
		if (bit > 0) {
			t -= bit * pwr;

			let e = '';
			switch (p) {
			case 5:
				e = gem243;
				break;
			case 4:
				e = gem81;
				break;
			case 3:
				e = gem27;
				break;
			case 2:
				e = gem9;
				break;
			case 1:
				e = gem3;
				break;
			case 0:
				e = gem1;
				break;
			}

			for (let i = 1; i <= bit; i++) {
				rtext += e;
			}
		}
		// dbgtext += bit.toString();
	}

	return rtext;

	// const bit6 = Math.floor(t / 243);
	// if (bit6 > 0) {
	// 	t -= bit6 * 243;
	// }

	// const bit5 = Math.floor(t / 81);
	// if (bit5 > 0) {
	// 	t -= bit5 * 81;
	// }

	// const bit4 = Math.floor(t / 27);
	// if (bit4 > 0) {
	// 	t -= bit4 * 27;
	// }

	// const bit3 = Math.floor(t / 9);
	// if (bit3 > 0) {
	// 	t -= bit3 * 9;
	// }

	// const bit2 = Math.floor(t / 3);
	// if (bit2 > 0) {
	// 	t -= bit2 * 3;
	// }

	// const bit1 = Math.floor(t / 1);
	// if (bit1 > 0) {
	// 	t -= bit1;
	// }

	// console.log(`t is ${t}\n val: ${dbgtext}`);
}

module.exports = {
	gem1, gem3, gem9,
	gem27, gem81, gem243,
	baseThreeGem,
};