const argv = require('optimist').argv;
const trainingCount = argv.count || 1;

const MODIFICATORS = [
    'none',
    '+VAR',
    '-VAR',
    'none',
    '!VAR',
    '+!VAR',
    'none',
    '-!!VAR',
    '+!!VAR',
    'none'
];

const VALUE_TYPES = [
    'number',
    'number_as_string',
    'string_like_number',
    'array_with_number',
    'empty_object',
    'string',
    'empty_string',
    'empty_array',
    'nil',
    'nan'
];

const STRING_AS_NUMBER_TYPES = [
    'space_before',
    'space_before_end_char',
    'end_char',
    'start_char',
    'start_char_space_after',
    'middle_char',
    'space_before_middle_char',
    'space_after_middle_char'
];

const OPERATORS = [
    'equal',
    'strong_equal',
    'plus',
    'minus',
    'gt',
    'lt',
    'gte',
    'lte',
    'divide',
    'multiply'
];

const APLHABET = 'abcdefghijklmnopqrstuvwxyz';

function getTraining() {
    return `${getRandomValue()} ${getRandomOperator()} ${getRandomValue()}`;
}

function getRandomOperator() {
    const operator = getRandomArrayElement(OPERATORS);

    switch (operator) {
        case 'equal':
            return '==';
        case 'strong_equal':
            return '===';
        case 'plus':
            return '+';
        case 'minus':
            return '-';
        case 'gt':
            return '>';
        case 'lt':
            return '<';
        case 'gte':
            return '>=';
        case 'lte':
            return '<=';
        case 'divide':
            return '/';
        case 'multiply':
            return '*';
        default:
            return '==';
    }
}

function getRandomValue() {
    const valueType = getRandomArrayElement(VALUE_TYPES);
    let value;

    switch (valueType) {
        case 'number':
            value = getRandomNumber(0, 10);
            break;
        case 'number_as_string':
            value = `'${(getRandomNumber(0, 10)).toString()}'`;
            break;
        case 'string_like_number':
            value = `'${getStringLikeNumber()}'`;
            break;
        case 'array_with_number':
            value = `'${[getRandomNumber(0, 10)]}'`;
            break;
        case 'empty_object':
            value = '{}';
            break;
        case 'string': {
            const aplhabet = APLHABET.split('');
            const charsCount = getRandomNumber(1, 10);

            value = `'${' '.repeat(charsCount).split('').map(() => aplhabet[getRandomNumber(0, 25)]).join('')}'`;
            break;
        }
        case 'empty_string':
            value = "' '";
            break;
        case 'empty_array': 
            value = '[]';
            break;
        case 'nil':
            value = 'null';
            break;
        case 'nan':
            value = 'NaN'; 
            break;         
        default:
            value = "' '";
    }

    const modificator = getRandomModificator();

    return modificator + value;
}

function getRandomModificator() {
    const modificator = getRandomArrayElement(MODIFICATORS);

    switch(modificator) {
        case 'none': 
            return '';
        case '+VAR':
            return '+';   
        case '-VAR':
            return '-';
        case '!VAR':
            return '!';
        case '+!VAR':
            return '+!';
        case '-!!VAR':
            return '-!!';
        case '+!!VAR':
            return '+!!';
        default:
            return '';
    }
}

function getStringLikeNumber() {
    const aplhabet = APLHABET.split('');
    const stringType = getRandomArrayElement(STRING_AS_NUMBER_TYPES);
    const spacesCount = getRandomNumber(0, 3);
    const numberFirst = getRandomNumber(0, 99);
    const numberSecond = getRandomNumber(0, 99);
    const chars = aplhabet[getRandomNumber(0, 25)];
    const spaces = ' '.repeat(spacesCount); 
    
    switch (stringType) {
        case 'space_before':
            return spaces + numberFirst;
        case 'space_before_end_char':
            return spaces + numberFirst + chars;
        case 'end_char': 
            return numberFirst + chars;
        case 'start_char':
            return chars + numberFirst;
        case 'start_char_space_after':
            return chars + numberFirst + spaces;
        case 'middle_char':
            return numberFirst + chars + numberSecond;
        case 'space_before_middle_char':
            return spaces + numberFirst + chars + numberSecond;
        case 'space_after_middle_char':
            return numberFirst + chars + numberSecond + spaces;
    }   
}

function getRandomArrayElement(arr) {
    const size = arr.length;
    const index = getRandomNumber(0, size);

    return arr[index];
}

function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from)) + from;
}

for (let i = 0; i < trainingCount; i++) {
    const result = getTraining();
    console.log(result);
}
