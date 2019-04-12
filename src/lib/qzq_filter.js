/* eslint-disable */
export default (value, type) => {
	return type ? invert(value) : direct(value);
};

const direct = value => {
	if (!value) return '';
	const QQ = Object.freeze({
		а: 'a',
		ә: 'á',
		б: 'b',
		в: 'v',
		г: 'g',
		ғ: 'ǵ',
		д: 'd',
		е: 'e',
		ё: 'e',
		ж: 'j',
		з: 'z',
		и: 'ı',
		й: 'ı',
		қ: 'q',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		ң: 'ń',
		о: 'o',
		ө: 'ó',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'ý',
		ұ: 'u',
		ү: 'ú',
		ф: 'f',
		х: 'h',
		һ: 'h',
		ц: 'c',
		ч: 'ch',
		ш: 'sh',
		щ: 'shch',
		ы: 'y',
		і: 'i',
		э: 'e',
		ю: 'yu',
		я: 'ya'
	});
	return [...value.replace(/[ъь]+/g, '')]
		.map(char => {
			// get char
			let qChar = QQ[char];

			if (qChar === undefined) {
				const charLow = char.toLowerCase();
				qChar =
					QQ[charLow] === undefined
						? // income char
						  char
						: //capitalized QQ char
						  QQ[charLow].replace(/^(.)/, match => match.toUpperCase());
			}
			return qChar;
		})
		.join('');
};

const invert = value => {
	if (!value) return '';
	const QQ = Object.freeze({
		a: 'а',
		asha: 'асха',
		á: 'ә',
		b: 'б',
		v: 'в',
		g: 'г',
		ǵ: 'ғ',
		d: 'д',
		e: 'е',
		j: 'ж',
		z: 'з',
		ı: 'и',
		q: 'қ',
		k: 'к',
		l: 'л',
		m: 'м',
		n: 'н',
		ń: 'ң',
		o: 'о',
		ó: 'ө',
		p: 'п',
		r: 'р',
		s: 'с',
		t: 'т',
		ý: 'у',
		u: 'ұ',
		ú: 'ү',
		f: 'ф',
		h: 'х',
		// h: 'һ',
		c: 'ц',
		ch: 'ч',
		sh: 'ш',
		shch: 'щ',
		y: 'ы',
		i: 'і',
		yu: 'ю',
		ya: 'я'
	});
	const valueArray = [...value];
	const length = valueArray.length;
	const outArray = [];

	for (let charIndex = 0; charIndex < length; charIndex++) {
		let char = valueArray[charIndex];
		// 'асха' case
		if (
			char.toLowerCase() === 'a' &&
			valueArray[charIndex + 1] === 's' &&
			valueArray[charIndex + 2] === 'h' &&
			valueArray[charIndex + 3] === 'a'
		) {
			char += 'sha';
			charIndex += 3;
		}

		if (char.toLowerCase() === 'y' && valueArray[charIndex + 1]) {
			const charNext = valueArray[charIndex + 1];
			if (charNext.toLowerCase() === 'a' || charNext.toLowerCase() === 'u') {
				char += charNext;
				charIndex++;
			}
		} else if (char.toLowerCase() === 'c' && valueArray[charIndex + 1]) {
			const charNext = valueArray[charIndex + 1];
			if (charNext.toLowerCase() === 'h') {
				char += charNext;
				charIndex++;
			}
		} else if (char.toLowerCase() === 's' && valueArray[charIndex + 1]) {
			const charNext = valueArray[charIndex + 1];
			if (charNext.toLowerCase() === 'h') {
				char += charNext;
				charIndex++;

				if (
					valueArray[charIndex + 1] === 'c' &&
					valueArray[charIndex + 2] === 'h'
				) {
					char += valueArray[charIndex + 1] + valueArray[charIndex + 2];
					charIndex += 2;
				}
			}
		}

		let charLow = char.toLowerCase();
		let charOut = QQ[char];

		if (charOut === undefined) {
			charOut =
				QQ[charLow] === undefined
					? // income char
					  char
					: //capitalized QQ char
					  QQ[charLow].replace(/^(.)/, match => match.toUpperCase());
		}

		// console.log(char, charLow === 'y' );
		outArray.push(charOut);
	}

	return outArray.join('');
};
