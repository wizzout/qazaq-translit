
const DICT = [
  ['а', 'a'],
  ['асха', 'asha'],
  ['ай', 'aı'],
  ['ий', 'ıı'],
  ['әй', 'áı'],
  ['ә', 'á'],
  ['б', 'b'],
  ['в', 'v'],
  ['г', 'g'],
  ['ғ', 'ǵ'],
  ['д', 'd'],
  ['е', 'e'],
  ['ё', 'e'],
  ['ж', 'j'],
  ['з', 'z'],
  ['и', 'ı'],
  ['й', 'ı'],
  ['қ', 'q'],
  ['к', 'k'],
  ['л', 'l'],
  ['м', 'm'],
  ['н', 'n'],
  ['ң', 'ń'],
  ['о', 'o'],
  ['ө', 'ó'],
  ['п', 'p'],
  ['р', 'r'],
  ['с', 's'],
  ['т', 't'],
  ['у', 'ý'],
  ['ұ', 'u'],
  ['ү', 'ú'],
  ['ф', 'f'],
  ['х', 'h'],
  ['һ', 'h'],
  ['ц', 'c'],
  ['ч', 'ch'],
  ['ш', 'sh'],
  ['щ', 'shch'],
  ['ы', 'y'],
  ['і', 'i'],
  ['э', 'e'],
  ['ю', 'yu'],
  ['я', 'ya']
].sort(([a, b], [c, d]) => d.length - b.length);
const DICT_REV = DICT.map(arr => [...arr].reverse());

/**
 * Транислитерация казахского текста с кириллицы на латиницу в соответствии с третим утвержденным вариантом
 *
 * @param {String} Текст
 * @param {boolean} [type=true] Направление транслитерации, по умолчанию Кириилица -> Латиница
 * @returns Транислитерированный текст
 */
function qazaq(value, type = true) {
	if (!value) return '';
	const dict = type ? DICT : DICT_REV;
	
  return dict.reduce((val, [inp, out]) => {
    const re = new RegExp(inp, 'gi');
    return val.replace(re, res => {
      return res === inp
        ? out
        : String(out).replace(/^(.)/, match => match.toUpperCase());
    });
  }, value.replace(/[ъь]+/g, ''));
}

export {
	qazaq
}