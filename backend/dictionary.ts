
// TODO: extract to Deno.env
const learners_KEY = '514e5d2b-4e51-4a56-8d66-914194734e7b'
const collegiate_KEY = '94aded42-91b6-463a-a130-0ebd277ca607'

export const searchDictionaryResults = async (term, learners = false) => {
    try {
        const res = await fetch(
            `http://www.dictionaryapi.com/api/v3/references/collegiate/json/${term}` +
            `?key=${learners ? learners_KEY : collegiate_KEY}&limit=50`,
        { 
            method: 'GET',
        });
        if ( res.headers.get('Content-Type')?.includes('html') ) {
            Deno.writeTextFileSync('./error.html', await res.text())
        }
        const data = await res.json();
        return parseDictionaryResponse(data);
    } catch (err) {
        console.error('Error in dictionaryapi', { err })
    }
}


/**
 *  DATA PARSING AND CLEANSING METHODS
 *  - matrix response to json
 *  - styling tokens to html
 *  - validation
 */
const parseDictionaryResponse = (response) => {
    const parsed = [];
    // console.info('DICTIONARY :: ', { response });
    response.forEach((record) => {
        if (typeof record === 'string') {
            return parsed.push({ 
                word: record,
                syllabic: null,
                stems: [],
                partOfSpeech: null,
                shortDef: '',
                defs: []
            })
        }
        if (!record.fl) { // if no part of speech
            return;
        }
        const val = {
            word: record.meta.stems[0],
            syllabic: record.hwi.hw,
            stems: record.meta.stems,
            partOfSpeech: record.fl,
            shortDef: record.shortdef,
            defs: parseDefinitions(record)
        }

        parsed.push(val);
    });

    return parsed;
}

const parseDefinitions = (record) => {
    const defs = [ ]
    if ( !record.def ) {
        return defs
    }
    record.def.forEach((def) => {
        def.sseq.forEach((seq => {
            seq.forEach((s) => {
                if ( !s[1] ) {
                    console.info('NO s[1]');
                }
                const definition =  { 
                    text: '',
                    samples: [],
                };
                s[1] && s[1].dt && s[1].dt.forEach((d) => {
                    // console.info({d});
                    switch (d[0]) {
                        case 'text':
                            definition.text = sanitizeTextString(d[1])
                            break;
                        case 'vis':
                            d[1].forEach((uit) => {
                                definition.samples.push(
                                    sanitizeTextString( uit.t )
                                );
                            })
                            break;
                        case 'uns':
                            d[1].forEach((u) => {
                                // console.info({u});
                                u.forEach((ui) => {
                                    // console.info({ui});
                                    switch (ui[0]) {
                                        case 'text':
                                            definition.text = sanitizeTextString(ui[1])
                                            break;
                                        case 'vis':
                                            ui[1].forEach((uit) => {
                                                definition.samples.push(
                                                    // `<quote class="bg-gray-100 rounded-md p-2 mb-2 ml-2"> ${sanitizeTextString( uit.t )} </quote>`
                                                    sanitizeTextString( uit.t )
                                                );
                                            })
                                            break;
                                    }
                                })
                            })
                            break;
                        default:
                            // TODO: can be improved to include `snote` and `ca` 
                            // console.warn('no config for ', d[0], {d}); 
                            break;
                    }
                })
                defs.push({ ... definition })
            })
        }))
    })

    return defs;
}

const sanitizeTextString = (string = '') => {
    const flagsToRemove = [
        /\{bc\}/g, /\{dx_def\}/g, /\{\/dx_def\}/g,
    ]
    flagsToRemove.forEach((pattern) => {
        string = string.replaceAll(pattern, '')
    })

    const flagToReplace = [
        {
            pattern:  /\{wi\}/g,
            replace: '<bold>'
        },{
            pattern:  /\{\/wi\}/g,
            replace: '</bold>'
        },
        {
            pattern:  /\{it\}/g,
            replace: '<i>'
        },{
            pattern:  /\{\/it\}/g,
            replace: '</i>'
        },
        {
            pattern: /\{dx\}/g,
            replace: '<compare class="text-gray-500">'
        },{
            pattern: /\{\/dx\}/g,
            replace: '</compare>'
        },
        {
            pattern: /\{l(d|s)quo}/g,
            replace: '<bold class="text-pink-800">"</bold>'
        },{
            pattern: /\{r(d|s)quo}/g,
            replace: '<bold class="text-pink-800">"</bold>'
        },
        {
            pattern: /\{phrase}/g,
            replace: '<bold>'
        },{
            pattern: /\{\/phrase}/g,
            replace: '</bold>'
        },
        // {
        //     pattern: /\{gloss}/g, // meanings of idioms, quote breakdown, uncommon
        //     replace: ''
        // },{
        //     pattern: /\{\/gloss}/g,
        //     replace: ''
        // },
        // {
        //     pattern: /\{sc}/g, // SHANG, era date formatting
        //     replace: ''
        // },{
        //     pattern: /\{\/sc}/g,
        //     replace: ''
        // },
        {
            pattern: /\{inf\}/g, // subscripts
            replace: '<sub>'
        },{
            pattern: /\{\/inf\}/g,
            replace: '</sub>'
        },
    ]
    flagToReplace.forEach((replace) => {
        string = string.replaceAll(replace.pattern, replace.replace)
    })


    // const patternSx = /\{sx\|([\w|\s]*)(\S+)?\|\|(\S+)?\}/g;
    const patternSx = /\{(sx\|).*?\}/g;
    const templateSx = `<a class="term-link cursor-pointer text-pink-600 underline">$1</a>`;

    string = replaceWithTag(patternSx, string, templateSx);
    string = replaceWithTag(patternSx, string, templateSx);
    string = replaceWithTag(patternSx, string, templateSx);
    string = replaceWithTag(patternSx, string, templateSx);

    // const patternDxt = /\{dxt\|([\w|\s|-]*)(\:\S+)?\|\|(\S+)?\}/g;
    const patternDxt = /\{(dxt\|).*?\}/g;
    const templateDxt = `<a class="term-link cursor-pointer text-pink-900 italic">$1</a>`;

    string = replaceWithTag(patternDxt, string, templateDxt);
    string = replaceWithTag(patternDxt, string, templateDxt);
    string = replaceWithTag(patternDxt, string, templateDxt);
    string = replaceWithTag(patternDxt, string, templateDxt);

    const patternLink = /\{([adi]_link\|).*?\}/g
    const templateLink = `<a class="term-link cursor-pointer text-pink-600 underline">$1</a>`;
    string = replaceWithTag(patternLink, string, templateLink)
    string = replaceWithTag(patternLink, string, templateLink)
    string = replaceWithTag(patternLink, string, templateLink)
    string = replaceWithTag(patternLink, string, templateLink)

    return string;
}

const replaceWithTag = (regex, string, template) => {
    const match = regex.exec(string)
    if ( match ) {
        let s = match[0];
        s = s.replace('{', '')
        s = s.replace('}', '')
        s = s.replace(match[1], '')
        const values = s.split('|')
        // console.info({ values});
        let htmlString = '';
        values.forEach((link, i) => {
            if (link) {
                htmlString += template.replace(
                    "$1",
                    ( i > 0 ? '<span class="text-gray-500">/</span>' : '' ) + link
                )
            }
        });

        // console.info({ match, htmlString, values });

        string = string.replace(match[0], htmlString)
    }
    return string;
}