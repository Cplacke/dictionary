

export const generateQuestionSet = (
    data, 
    count
) => {
    return getRandomSet(
        count, data.length
    ).map((index) => {
        let answerTerm = JSON.parse(
            JSON.stringify(data[index])
        )
        // sanitize text and remove term from def NO FREEBIES;
        answerTerm = sanitizeTermFromDefinitions(answerTerm);
        answerTerm.answer = true;
        const answerPosition = getRandomSet(1, 3)[0];
        const decoyPositions = getRandomSet(3, data.length, new Set(), [index]);

        return answerAt(
            answerPosition, answerTerm,
            [ data[decoyPositions[0]], data[decoyPositions[1]], data[decoyPositions[2]] ]
        );
    })
}

const answerAt = (index, answer, decoys) => {
    const open = new Set([0, 1, 2, 3]);
    const list = [ null, null, null, null ];
    list[index] = answer;
    open.delete(index);

    [ ... open.values() ].forEach((openIndex, i) => {
        list[openIndex] = decoys[i];
    });
    return list;
}

const getRandomSet = (size, limit, set=new Set(), exclude=[]) => {
    if (set.size === size) {
        return [ ... set.values() ];
    }
    const value = Math.round( Math.random() * limit );
    const excluded = exclude.find((v) => v === value || set.has(value));
    if (!excluded) {
        set.add(value);
    }
    return getRandomSet(size, limit, set, exclude);
}

const TERM_REPLACER = '_____'
const TERM_PART_REPLACER = '___'
const REPLACE_IGNORE = [ 'the', 'of', 'by', 'for', 'a', 'an' ]
export const sanitizeTermFromDefinitions = (term) => {
    const forms = term.stems;
    forms.push(term.word);
    term.defs.forEach((def) => {
        // remove all stems and conjugations
        forms.forEach((value) => {
            const formPattern = new RegExp(value, 'gi')
            def.text = def.text.replace(value, TERM_REPLACER)
            def.samples = def.samples.map((s) => {
                return s && s.replace(value, TERM_REPLACER)
            })
        })

        // remove partial terms
        const { word } = term;

        const expression = word.split(/ |-/)
            .filter((part) => (!REPLACE_IGNORE.includes(part)))
            .map((part, i) => (`${i > 0 ? '|' : ''}${part.trim()}`)).join('')
        const partialTermPattern = new RegExp(expression, 'gi')
        def.text = def.text.replace(partialTermPattern, TERM_PART_REPLACER)
        def.samples = def.samples.map((s) => {
            return s && s.replace(partialTermPattern, TERM_PART_REPLACER)
        })

        // `a` and `an` become `a(n)`
        forms.forEach((value) => {
            const articleReplacer = /a(n)? _/gi;
            def.text = def.text.replace(articleReplacer, 'a(n) _')
            def.samples = def.samples.map((s) => {
                return s && s.replace(articleReplacer, 'a(n) _')
            })
        })
    })
    return term;
}