import { visibilityValues, weatherValues } from "../entities/diary";


export interface SubmitFormProps {
    newDate: string;
    newWeather: string;
    newVisibility: string;
    newComment: string;
    handleDateChange: (value: string) => void;
    handleWeatherChange: (value: string) => void;
    handleVisibilityChange: (value: string) => void;
    handleCommentChange: (value: string) => void;
    handleOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function SubmitForm(props: SubmitFormProps) {
    return (
        <form>
            <h1>Add New Diary Entry</h1>
            <div>
                <label htmlFor="date">Date: </label>
                <input
                    id="date"
                    value={props.newDate}
                    placeholder="YYYY-MM-DD"
                    onChange={event => props.handleDateChange(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="visibility">Visibility: </label>
                <input
                    id="visibility"
                    value={props.newVisibility}
                    placeholder={visibilityValues.join(', ')}
                    onChange={event => props.handleVisibilityChange(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="weather">Weather: </label>
                <input
                    id="weather"
                    value={props.newWeather}
                    placeholder={weatherValues.join(', ')}
                    onChange={event => props.handleWeatherChange(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="comment">Comment: </label>
                <input
                    id="comment"
                    value={props.newComment}
                    onChange={event => props.handleCommentChange(event.target.value)}
                />
            </div>
            <div>
                <button type="submit" onClick={props.handleOnClick}>
                    add
                </button>
            </div>
        </form>
    );
}