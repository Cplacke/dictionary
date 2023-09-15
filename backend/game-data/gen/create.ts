import { 
    SAT_WORDS, MCAT_WORDS, BAR_WORDS,
    SCIENCE_WORDS, SCHOLARLY_WORDS,
    CULINARY_WORDS,
    FIFTH_GRADE_WORDS,
} from './souce-maps.ts'
import { searchDictionaryResults } from '../../dictionary.ts'

console.time('total exec time');
// read all source maps
const enabled = [
    { set: SAT_WORDS, file:'sat_words.data.ts' },
    { set: MCAT_WORDS, file:'mcat_words.data.ts' },
    { set: BAR_WORDS,file: 'bar_word.data.ts' },
    { set: SCIENCE_WORDS, file:'science_words.data.ts' },
    { set: SCHOLARLY_WORDS,file: 'scholarly_words.data.ts' },
    { set: CULINARY_WORDS,file: 'culinary_words.data.ts' },
    { set: FIFTH_GRADE_WORDS,file: 'fifth_grade_words.data.ts' },
]

for (let i=0; i<enabled.length; i++) {
    const { set, file } = enabled[i];
    console.info(`${file} process started ...`)
    console.time(`running ${file} data gen`)
    const parsedData: any = []

    for (let j=0; j<set.length; j++) {
        const term = set[j];
        const res = await searchDictionaryResults(term)
        // take #1, #2, and all other words that have overlapping "stems[]" values
        if (!res || res.length === 0 || typeof res[0] === 'string')  {
            console.info('\tdict: no definition for ', term);
        } else {
            parsedData.push(res[0])
            if (res.length > 1) {
                parsedData.push(res[1])
            }
            res.slice(2, res.length).forEach((r) => {
                if (r.stems && r.stems.length) {
                    const matchingStem = r.stems
                        .map((s: string) =>(s.toLowerCase()))
                        .find((s: string) =>(s.includes(term.toLowerCase())));
                    if (matchingStem) {
                        parsedData.push(r)
                    }
                }
            })
        }
    }
    console.info(`  ${set.length} definition results for set`);

    // write each file to a `ts` file in `../`
    await Deno.writeTextFile(
        `./game-data/gen/data/${file}`,
        `export default ${JSON.stringify(parsedData, null, 2)}`
    )
    console.info(`  ${parsedData.length} definition results added`);

    
    // stamp execution times
    console.timeEnd(`${file} data gen`)
}


// stamp total execution times
console.timeEnd('total exec time')
Deno.exit()