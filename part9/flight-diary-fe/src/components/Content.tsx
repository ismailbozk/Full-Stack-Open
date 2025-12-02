import type { JSX } from "react";
import type { NonSensitiveDiaryEntry } from "../entities/diary";

export interface ContentProps {
    diaryEntries: Array<NonSensitiveDiaryEntry>;
}

export function Content(props: ContentProps): JSX.Element {
    return (
        <>
            <h1>Diary Entries</h1>
            {
                props.diaryEntries.map((entry: NonSensitiveDiaryEntry) => (
                    <div key={entry.id}>
                        <h2>{entry.date}</h2>
                        <p> visibility: {entry.visibility} </p>
                        <p> weather: {entry.weather} </p>
                    </div>
                ))
            }
        </>
    );
}