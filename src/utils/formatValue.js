import 'intl';
import 'intl/locale-data/jsonp/en';
const formatValue = (value) =>
	Intl.NumberFormat('pt-br', {
		style: 'currency',
		currency: 'BRL',
	}).format(value);
export default formatValue;
