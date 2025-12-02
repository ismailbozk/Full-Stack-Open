import axios from 'axios'
import type { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from '../entities/diary';
const baseUrl = '/api/diaries'

const getAll = () => {
    return axios
        .get<NonSensitiveDiaryEntry[]>(baseUrl)
        .then(request => request.data)
}

const addDiary = (newDiaryEntry: NewDiaryEntry) => {
    return axios
        .post<DiaryEntry>(baseUrl, newDiaryEntry)
        .then(request => request.data)
}

export default { getAll, addDiary };
