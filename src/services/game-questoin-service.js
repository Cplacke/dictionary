

export const generateQuestionSet = (
    data, 
    count
) => {

    return getRandomSet(
        count, data.length
    ).map((index) => {
        let answerTerm = data[index];
        answerTerm = sanitizeTermFromDefinitions(answerTerm);
        answerTerm.answer = true;
        const answerPosition = getRandomSet(1, 3)[0];
        const decoyPositions = getRandomSet(3, data.length, new Set(), [index]);
        // sanitize text and remove term from def NO FREEBIES;

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
    const excluded = exclude.find((v) => v === value);
    if (!excluded) {
        set.add(value);
    }
    return getRandomSet(size, limit, set, exclude);
}

const TERM_REPLACER = '_____'
export const sanitizeTermFromDefinitions = (term) => {
    const forms = term.stems;
    forms.push(term.word);
    term.defs.forEach((def) => {
        forms.forEach((value) => {
            def.text = def.text.replaceAll(value, TERM_REPLACER)
            def.samples = def.samples.map((s) => {
                return s && s.replaceAll(value, TERM_REPLACER)
            })
        })
    })
    return term;
}