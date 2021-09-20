import { makeStyles } from '@material-ui/styles';
export const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100vh',
	},
	form: {
		width: '500px',
		height: '200px',
		margin: '0 auto',
		border: '3px solid #282c34',
	},
	button: {
		float: 'right',
		marginTop: '10px',
	},
}));
