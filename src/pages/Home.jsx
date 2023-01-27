/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Header } from '../components/Header';
import { url } from '../const';
import { diffDate } from '../day';
import './home.scss';

export const Home = () => {
  const [isDoneDisplay, setIsDoneDisplay] = useState('todo'); // todo->未完了 done->完了
  const [lists, setLists] = useState([]);
  const [selectListId, setSelectListId] = useState();
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies();
  const handleIsDoneDisplayChange = (e) => setIsDoneDisplay(e.target.value);
  useEffect(() => {
    axios
      .get(`${url}/lists`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // タスク一覧を習得する
  useEffect(() => {
    const listId = lists[0]?.id;
    if (typeof listId !== 'undefined') {
      setSelectListId(listId);
      axios
        .get(`${url}/lists/${listId}/tasks`, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          setTasks(res.data.tasks);
        })
        .catch((err) => {
          setErrorMessage(`タスクの取得に失敗しました。${err}`);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists]);

  const handleSelectList = (id) => {
    setSelectListId(id);
    axios
      .get(`${url}/lists/${id}/tasks`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        setErrorMessage(`タスクの取得に失敗しました。${err}`);
      });
  };
  return (
    <div>
      <Header />
      <main className="taskList">
        <p className="error-message">{errorMessage}</p>
        <div>
          <div className="list-header">
            <h2>リスト一覧</h2>
            <div className="list-menu">
              <p>
                <Link to="/list/new">リスト新規作成</Link>
              </p>
              <p>
                <Link to={`/lists/${selectListId}/edit`}>
                  選択中のリストを編集
                </Link>
              </p>
            </div>
          </div>
          <ul className="list-tab">
            {lists.map((list) => {
              const isActive = list.id === selectListId;
              return (
                <li
                  key={list.id}
                  className={`list-tab-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectList(list.id)}
                >
                  {list.title}
                </li>
              );
            })}
          </ul>
          <div className="tasks">
            <div className="tasks-header">
              <h2>タスク一覧</h2>
              <Link to="/task/new">タスク新規作成</Link>
            </div>
            <div className="display-select-wrapper">
              <select
                onChange={handleIsDoneDisplayChange}
                className="display-select"
              >
                <option value="todo">未完了</option>
                <option value="done">完了</option>
              </select>
            </div>
            <Tasks
              tasks={tasks}
              selectListId={selectListId}
              isDoneDisplay={isDoneDisplay}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

// 表示するタスク
const Tasks = (props) => {
  const { tasks, selectListId, isDoneDisplay } = props;
  if (tasks === null) return null;

  if (isDoneDisplay === 'done') {
    return (
      <ul>
        {tasks
          .filter((task) => task.done === true)
          .map((task) => (
            <li key={task.id} className="task-item">
              <Link
                to={`/lists/${selectListId}/tasks/${task.id}`}
                className="task-item-link"
              >
                {task.title}
                <br />
                {task.done ? '完了' : '未完了'}
              </Link>
            </li>
          ))}
      </ul>
    );
  }

  return (
    <ul>
      {tasks
        .filter((task) => task.done === false)
        .map((task) => (
          <li key={task.id} className="task-item">
            <Link
              to={`/lists/${selectListId}/tasks/${task.id}`}
              className="task-item-link"
            >
              {task.title}
              <div>
                <p>{task.done ? '完了' : '未完了'}</p>
                {task.limit ? (
                  <div>
                    <p className="limit">
                      期日：
                      {new Date(task.limit).toLocaleString('ja-JP', {
                        timeZone: 'JST',
                      })}
                    </p>
                    <p>
                      期日まで：
                      {diffDate(task.limit)}
                    </p>
                  </div>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};
