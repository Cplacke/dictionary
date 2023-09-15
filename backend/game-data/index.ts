import sat_words from './gen/data/sat_words.data.ts'
import fifth_grade_words from './gen/data/fifth_grade_words.data.ts'
import scholarly_words from './gen/data/scholarly_words.data.ts'
import mcat_words from './gen/data/mcat_words.data.ts'
import bar_words from './gen/data/bar_word.data.ts'
import culinary_word from './gen/data/culinary_words.data.ts'
import science_words from './gen/data/science_words.data.ts'

const dataMap = [
    {
        name: "SAT Terms",
        set: sat_words
    },{
        name: "Elementary Terms",
        set: fifth_grade_words
    },{
        name: "Scholarly Terms",
        set: scholarly_words
    },{
        name: "MCAT Terms",
        set: mcat_words
    },{
        name: "BAR Exam Terms",
        set: bar_words
    },{
        name: "Culinary Terms",
        set: culinary_word
    },{
        name: "Science Terms",
        set: science_words
    }
]

export const getDataSet = (name: string) => {
    return dataMap.find((d) => (d.name === name))?.set || [];
}

export const listDataSet = () => {
    return dataMap.map((d) => (d.name))
}