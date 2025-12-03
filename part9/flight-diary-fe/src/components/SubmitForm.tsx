import React from 'react';
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
    const today = new Date().toISOString().split('T')[0];

    return (
        <form>
            <h1>Add New Diary Entry</h1>
            <label htmlFor="date">Date: </label>
            <input
                type="date"
                id="start"
                name="trip-start"
                value={props.newDate}
                min="1950-01-01"
                max={today}
                onChange={event => props.handleDateChange(event.target.value)}
            />
            <div key="visibility">
                <label htmlFor="visibility">Visibility: </label>
                {
                    visibilityValues.map(value => {
                        return (
                            <React.Fragment key={value}>
                                <input
                                    type="radio"
                                    id={value.toString()}
                                    name="visibility"
                                    value={value.toString()}
                                    checked={props.newVisibility === value.toString()}
                                    onChange={event => props.handleVisibilityChange(event.target.value)}
                                />
                                <label htmlFor={value.toString()}>{value.toString()}</label>
                            </React.Fragment>
                        );
                    })
                }
            </div>
            <div key="weather">
                <label htmlFor="weather">Weather: </label>
                {weatherValues.map(value => {
                    return (
                        <React.Fragment key={value}>
                            <input
                                type="radio"
                                id={value.toString()}
                                name="weather"
                                value={value.toString()}
                                checked={props.newWeather === value.toString()}
                                onChange={event => props.handleWeatherChange(event.target.value)}
                            />
                            <label htmlFor={value.toString()}>{value.toString()}</label>
                        </React.Fragment>
                    );
                })}
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