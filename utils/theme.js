import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
            secondary: '#496eb5',
        },
        secondary: {
            main: '#f4752e',
            secondary: '#19355f'
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#ffffff',
        },
    },
});

export default theme;