import { useEffect, useState } from 'react'
import service from './services/service'
import { isVisibility, isWeather, type NewDiaryEntry, type NonSensitiveDiaryEntry } from './entities/diary';
import { Content } from './components/Content';
import { SubmitForm } from './components/SubmitForm';
import axios from 'axios';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<Array<NonSensitiveDiaryEntry>>([]);
  const [newDate, setNewDate] = useState<string>('');
  const [newWeather, setNewWeather] = useState<string>('');
  const [newVisibility, setNewVisibility] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (msg: string | null) => {
    if (msg === null) return;
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  useEffect(() => {
    service.getAll()
      .then(data => {
        console.log('Received data:', data);
        setDiaryEntries(data);
      })
      .catch(error => {
        showMessage(`Failed to fetch diary entries ${error.message}`);
        console.error('Error fetching data:', error)
      })
  }, []);

  useEffect(() => {
    console.log('newDate changed:', newDate)  ;
  }, [newDate]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    showMessage(null);

    if (newDate.length === 0 || newWeather.length === 0 || newVisibility.length === 0 || !isWeather(newWeather) || !isVisibility(newVisibility) || newComment.length === 0) {
      showMessage('All fields are required');
      return;
    }    

    const newDiaryEntry: NewDiaryEntry = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    };

    service.addDiary(newDiaryEntry)
      .then(returnedDiary => {
        setDiaryEntries(diaryEntries.concat(returnedDiary));
        setNewDate('');
        setNewWeather('');
        setNewVisibility('');
        setNewComment('');
      })
      .catch(error => {

        if (axios.isAxiosError(error)) {
          console.log(error.status)
          console.error(error.response);
          console.error('Error adding diary entry:', error.response);
          showMessage(`Failed to add diary entry ${error.response?.statusText}`);

        } else {
          console.error('Error adding diary entry: ', error);
          showMessage('Failed to add diary entry');

        }
      });
  }

  return (
    <>
      {message && <div key="message" style={{ color: 'red' }}>{message}</div>}
      <SubmitForm
        newDate={newDate}
        newWeather={newWeather}
        newVisibility={newVisibility}
        newComment={newComment}
        handleDateChange={setNewDate}
        handleWeatherChange={setNewWeather}
        handleVisibilityChange={setNewVisibility}
        handleCommentChange={setNewComment}
        handleOnClick={handleSubmit}
      />
      <Content diaryEntries={diaryEntries} />
    </>
  )
}

export default App
