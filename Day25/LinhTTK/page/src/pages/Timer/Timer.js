import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Narbar';
import action from '../../services/action';
import TimerHeader from '../../components/TimerHeader';
import { Container } from '@material-ui/core';
import ListTask from '../../components/ListTask';
import { useStyles } from '../Timer/Style';

export default function Timer() {
	const classes = useStyles();
	const [task, setTask] = useState([]);
	const [tags, setTags] = useState([]);
	const [render, setRender] = useState(1);
	useEffect(() => {
		async function getTask() {
			const res = await action.getTasks();
			setTask(res.data);
		}
		getTask();
	}, [render]);
	useEffect(() => {
		async function getTag() {
			const res = await action.getTags();
			const arr = res.data.map((e) => e.name);
			setTags(arr);
		}
		getTag();
	}, []);
	const onUpdate = (data) => {
		setRender(render + data);
	};
	return (
		<>
			<NavBar />
			<main className={classes.content}>
				<TimerHeader update={onUpdate} tags={tags} />
				<Container maxWidth='md'>
					<ListTask task={task} update={onUpdate} tags={tags} />
				</Container>
			</main>
		</>
	);
}
