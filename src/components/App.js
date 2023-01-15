import { Layout } from "./Layout/Layout";
import { AppBar } from "./AppBar/AppBar";
import { TaskForm } from "./TaskForm/TaskForm";
import { TaskList } from "./TaskList/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTask } from "../redux/api";
import { getTasksInfo } from "../redux/selectors";

export const App = () => {
  const {error, loading} = useSelector(getTasksInfo)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllTask())
  },[])
  return (
    <Layout>
      <AppBar />
      <TaskForm />
      {error || ''}
      {loading ? 'Loading...' : ''}
      <TaskList />
    </Layout>
  );
};
