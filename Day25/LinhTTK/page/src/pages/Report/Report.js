import React, { useState, useEffect } from 'react';
import NarBar from '../../components/Narbar';
import ReportHeader from '../../components/ReportHeader';
import action from '../../services/action';
import { useStyles } from '../Report/Style';

export default function Report() {
	const classes = useStyles();
	const [setTask] = useState([]);
	useEffect(() => {
		async function getTask() {
			const res = await action.getTasks();
			setTask(res.data);
		}
		getTask();
	});
	return (
		<>
			<NarBar />
			<main className={classes.content}>
				<ReportHeader />
			</main>
		</>
	);
}
