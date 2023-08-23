
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: theme.palette.grey[100],
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        padding: theme.spacing(4),
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.spacing(2),
        boxShadow: theme.shadows[6],
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    submitButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
}));

export default useStyles;