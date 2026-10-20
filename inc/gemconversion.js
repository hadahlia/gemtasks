const gem1 = '<:GemOne:1440794654168715416>';
const gem3 = '<:GemTwo:1440794942065606808>';
const gem9 = '<:GemThree:1440795251827806300>';
const gem27 = '<:negative1:1441106834323669184>';
const gem81 = '<:negative2:1441106904506962000>';
const gem243 = '<:negative3:1441106941844918294>';

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
	}

	return rtext;

}

module.exports = {
	gem1: gem1, gem3: gem3, gem9: gem9,
	gem27: gem27, gem81: gem81, gem243: gem243,
	baseThreeGem,
};