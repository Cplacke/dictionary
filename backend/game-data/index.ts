import satTerms from "./sat-set.ts"
import elementaryTerms from "./elementary-set.ts"


const dataMap = {
    satTerms: {
        name: "SAT Terms",
        set: satTerms
    },
    elementaryTerms: {
        name: "Elementary Terms",
        set: elementaryTerms
    },
    environmentalTerms: {
        name: "Environmental Terms",
        set: []
    },
    medicalTerms: {
        name: "Medical Terms",
        set: []
    },
    culinaryTerms: {
        name: "Culinary Terms",
        set: []
    },
    oldEnglish: {
        name: "Old English Terms",
        set: []
    },
}

export const getDataSet = (file) => {
    return dataMap[file] || [];
}

export const listDataSet = () => {
    return [
        ... Object.keys(dataMap)
    ]
}