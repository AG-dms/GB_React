import React, {useState, useRef, useCallback, useEffect} from 'react';
import {Input} from '@material-ui/core';
import {Button} from 'reactstrap';

function FormMess({subForm}) {
  const singleMessage = {
    text: '',
    author: '',
    date: '',
  };
  const [message, setMessage] = useState(singleMessage);
  const inputRef = useRef(null);

  // Фокус на инпуте при первом рендере
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Обработка инпута текст сообщения
  const changeText = useCallback(
    (event) => {
      setMessage({
        ...message,
        text: event.target.value,
      });
    },
    [message],
  );

  // Обработка инпута Автор сообщения
  const changeAuthor = useCallback(
    (event) => {
      setMessage({
        ...message,
        author: event.target.value,
        date: new Date(),
      });
    },
    [message],
  );

  // Обработка отправки формы
  const handleAddMessage = (e) => {
    e.preventDefault();
    subForm(message);
    setMessage({author: '', text: ''});
    inputRef.current.focus();
  };

  return (
    <form className='form' onSubmit={handleAddMessage}>
      <div className=' form__div'>
        <Input
          className='form__form-input'
          type='text'
          label='label'
          value={message.author}
          inputRef={inputRef}
          onChange={changeAuthor}
          placeholder='Как вас зовут?'
        />
        <Input
          className='form__form-input'
          type='text'
          value={message.text}
          onChange={changeText}
          placeholder='Введите текст'
        />
        <Button className='button' color='primary'>
          Отправить
        </Button>
      </div>
    </form>
  );
}

export default FormMess;
